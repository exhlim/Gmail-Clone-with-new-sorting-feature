const React = require('react');

export default class LoginPage extends React.Component {
    render () {
        return (
            <form method="GET" action="/login">
                New Username: <input type="text" name="username" placeholder="Username"/>
                New Password: <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="Register"/>
            </form>
            )
    };
}