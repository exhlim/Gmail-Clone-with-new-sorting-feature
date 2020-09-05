const React = require('react')
export default class EmailInputPage extends React.Component {
    render () {
        return (
            <html>
                <header>
                    <meta name="google-signin-client_id" content="857178357227-ulu4dopqg6pro1qt959dopb3q2ihblb4.apps.googleusercontent.com" />
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                    <script type="text/javascript" src="/main.js"></script>
                </header>
                <body>
                    <form method="POST" action="/linking">
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </form>
                </body>
            </html>
            )
    }
}


            //             <html>
            //   <head>
            //     <title>Gmail API Quickstart</title>
            //     <meta charset="utf-8" />
            //   </head>
            //   <body>
            //     <p>Gmail API Quickstart</p>
            //     <button id="authorize_button" style={{display: ''}}>Authorize</button>
            //     <button id="signout_button" style={{display: ''}}>Sign Out</button>

            //      <pre id="content" style={{whiteSpace: 'preWrap'}}></pre>
            //     <script src="/main.js"></script>
            //     </body>
            // </html>