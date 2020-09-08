  var CLIENT_ID = '857178357227-ulu4dopqg6pro1qt959dopb3q2ihblb4.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyDKzmynm6h6lVW2m4NgLqB8tBUo0l_OZDM';

  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
  var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');
  var body = [];
 // var axios =  require('axios')

  // var paramsObj={
  //   "From":[],
  //   "Subject": [],
  //   "Delivered-To":[],

  // }


  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
  }).then(function () {

      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);


      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
  }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
  });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'none';
      storeData()
      // Store all my data i need inside my query
  } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
  }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}


// <----------------------------------------------------------------------------------------------------------> //
// <---------------------------------------------Storing of Emails--------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
function storeData() {
    gapi.client.gmail.users.messages.list({
        'userId': 'me',
        "labelIds": [
        "INBOX"
        ],
        'maxResults': 7
    })
    .then(function(response) {
        // mapping messagesID array
        var messagesIdArray = response.result.messages.map(message => {
            return message.id
        })
        // Collecting all the promises from each .get call
        let promises = messagesIdArray.map((messageId,index) => {
            return (gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': messagesIdArray[index]
            }))
        })
        // promise.all waits until all the promises have been resolved before it runs the .then
        // values is an array of the responses
        Promise.all(promises).then((values)=> {
            console.log(values)
            values.forEach((email,index) => {
                var date, rawDates, snippet, subject, sender, receiver, content
                email.result.payload.headers.forEach(object=> {
                    if(object.name == 'From') {
                        sender = object.value.split("<")[0]
                    }
                    if(object.name == "Subject") {
                        subject = object.value
                    }
                    if(object.name == "Delivered-To") {
                        receiver = object.value
                    }
                })
                date = getDate(email.result.internalDate);
                rawDates = email.result.internalDate;
                snippet = email.result.snippet;
                mailid = email.result.id
                if(email.result.payload.parts === undefined) {
                    content = atob(email.result.payload.body.data.replace(/-/g, '+').replace(/_/g, '/') );
                } else if(email.result.payload.parts[1] === undefined){
                    content = atob( email.result.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/') );
                } else {
                    content = atob( email.result.payload.parts[1].body.data.replace(/-/g, '+').replace(/_/g, '/') );
                }
                // content = decodeBase64(email.result.payload.parts[0].body.data);
                body.push({
                    mailid: mailid,
                    sender: sender,
                    subject: subject,
                    snippet: snippet,
                    content: content,
                    date: date,
                    rawDate: rawDates,
                    receiver: receiver
                })
            })
            axios.post('/insert-data', {body}).then(response5=>{
                createLinkButton();
                console.log("INSIDE AXIOS .THEN")
            })
        })
    })
}
function createLinkButton() {
    let pre = document.getElementById('content')
    let form = document.createElement('form')
    let button = document.createElement('button')
    button.innerText = "Continue";
    form.appendChild(button)
    pre.appendChild(form)
    document.querySelector('form').action = "/mail"
}

function getDate(ms) {
    ms = parseInt(ms)
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let now = Date.now()
    if((now - ms)/3600000 > 24) {
        ms = new Date(ms)
        let day = ms.getDate();
        let month = ms.getMonth();
        return monthName[month] + " " + day;
    } else {
        let date = new Date(ms);
        let day = date.getHours()
        let minutes = date.getMinutes()
        if(minutes - 9 <= 0){
            return day > 12 ? `${day - 12}:0${minutes} PM` : `${day}:0${minutes} AM`
        }
        return day > 12 ? `${day - 12}:${minutes} PM` : `${day}:${minutes} AM`
    }
}
decodeBase64 = function(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
        for(x=0;x<L;x++){
            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
        }
        return r;
    };

function utf8Decode(utf8String) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
            return String.fromCharCode(cc); }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
        function(c) {  // (note parentheses for precedence)
            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
            return String.fromCharCode(cc); }
    );
    return unicodeString;
}




  // function listLabels() {
  //   gapi.client.gmail.users.labels.list({
  //     'userId': 'me'
  //   }).then(function(response) {
  //     var labels = response.result.labels;
  //     appendPre('Labels:');

  //     if (labels && labels.length > 0) {
  //       for (i = 0; i < labels.length; i++) {
  //         var label = labels[i];
  //         appendPre(label.name)
  //       }
  //     } else {
  //       appendPre('No Labels found.');
  //     }
  //   });
  // }
                  // if(response3.result.payload.parts === undefined) {
                //     content = decodeBase64(response3.result.payload.body.data);
                // } else {
                // }


            //     for(let i = 0; i < messagesIdArray.length; i++) {
            // gapi.client.gmail.users.messages.get({
            //     'userId': 'me',
            //     'id': messagesIdArray[i]
            // })

            // if(index == messagesIdArray.length - 1) {
            //         console.log(index + "INSIDE conditional")
                    // axios.post('/insert-data', {body}).then(response5=>{
                    //     createLinkButton();
                    //     console.log("INSIDE AXIOS .THEN")
                    // })
            //     }






//             await messagesIdArray.forEach(async function (messageId,index) {
//             await wait(5000);
//             gapi.client.gmail.users.messages.get({
//                 'userId': 'me',
//                 'id': messagesIdArray[index]
//             }).then(function(response3) {
//                 var date, rawDates, snippet, subject, sender, receiver, content
//                 response3.result.payload.headers.forEach(object=> {
//                     if(object.name == 'From') {
//                         sender = object.value.split("<")[0]
//                     }
//                     if(object.name == "Subject") {
//                         subject = object.value
//                     }
//                     if(object.name == "Delivered-To") {
//                         receiver = object.value
//                     }
//                 })
//                 date = getDate(response3.result.internalDate);
//                 rawDates = response3.result.internalDate;
//                 snippet = response3.result.snippet;
//                 mailid = response3.result.id
//                 content = decodeBase64(response3.result.payload.parts[1].body.data);
//                 body.push({
//                     mailid: mailid,
//                     sender: sender,
//                     subject: subject,
//                     snippet: snippet,
//                     content: content,
//                     date: date,
//                     rawDate: rawDates,
//                     receiver: receiver
//                 })
//                 console.log(index)
//             })
//         })
//         console.log(body[0])
//         axios.post('/insert-data', {body}).then(response5=>{
//             createLinkButton();
//             console.log("INSIDE AXIOS .THEN")
//         })
//     })
// }