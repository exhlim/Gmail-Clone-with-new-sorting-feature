  var CLIENT_ID = '857178357227-ulu4dopqg6pro1qt959dopb3q2ihblb4.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyDKzmynm6h6lVW2m4NgLqB8tBUo0l_OZDM';

  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
  var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');
  var body = [];
 // var axios =  require('axios')


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