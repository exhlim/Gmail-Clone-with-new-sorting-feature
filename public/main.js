  var CLIENT_ID = '857178357227-ulu4dopqg6pro1qt959dopb3q2ihblb4.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyDKzmynm6h6lVW2m4NgLqB8tBUo0l_OZDM';

  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
  var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');

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
      signoutButton.style.display = 'block';
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
        'maxResults': 1400
    })
    .then(function(response) {
         var messagesIdArray = [];
            response.result.messages.forEach(message => {
                messagesIdArray.push(message.id)
            })
            return messagesIdArray
    }).then(function(response2) {
        gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': response2[4]
        }).then(function(response3) {
            console.log(response3)
            let date = getDate("1599314426000")
            console.log(response3.result.payload.parts[1].body)
            let decode = response3.result.payload.parts[1].body.data
            // EMAIL response3.result.payload.headers.forEach(object=> {
            //         if(object.name == 'From') {
            //             console.log(object.value)
            //         }
            //     })
            // CHECK BOX
            // STAR

            // TEXT response3.result.payload.headers.forEach(object=> {
                    // if(object.name == 'Subject') {
                    //     console.log(Object.values(object))
                    // }
            //     if(object.name == 'From') {
            //         console.log(object.value)
            //     }
            // })

            // SUBJECT

            /// SNIPPET response3.result.snippet
            createLinkButton();
        })
    }).catch(function(err) {
        response.send(err);
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