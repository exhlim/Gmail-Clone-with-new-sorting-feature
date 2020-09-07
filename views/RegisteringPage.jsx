const React = require('react');

export default class ReisteringPage extends React.Component {
    render () {
        return (
            <html>
                <head>
                <title>Gmail</title>
                <link rel="icon" href="./public/gmail.svg"/>
                </head>
                <body>
                    <form method="POST" action="/register">
                        New Username: <input type="text" name="username" placeholder="Username"/>
                        New Password: <input type="password" name="password" placeholder="Password"/>
                        <input type="submit" value="Register"/>
                    </form>
                </body>
            </html>
            )
    };
}