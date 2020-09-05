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
      listLabels()
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

  function listLabels() {
    gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'maxResults': 2
    })
    .then(function(response) {
         var messagesIdArray = [];
            response.result.messages.forEach(message => {
                messagesIdArray.push(message.id)
            })
            return messagesIdArray
    }).then(function(response2) {
        console.log(response2)
        gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': response2[0]
        }).then(function(response3) {
            appendPre(response3.result.snippet)
        })
    })
  }
    function printEmails(idArray) {
        let string = idArray[1].toString();
    gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'id': string
    })
    .then(function(response) {
        console.log(response)
    });
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