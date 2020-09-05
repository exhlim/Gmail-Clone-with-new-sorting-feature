const React = require('react');

export default class ReisteringPage extends React.Component {
    render () {
        return (
            <html>
                <header>
                </header>
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