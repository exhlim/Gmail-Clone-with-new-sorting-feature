const React = require('react');

export default class LoginPage extends React.Component {
    render () {
        return (
            <div>
                <form method="POST" action="/login">
                    Username: <input type="text" name="username" placeholder="Username"/>
                    Password: <input type="password" name="password" placeholder="Password"/>
                    <input type="submit" value="Login" />
                </form>
                <form action="/register">
                    <button >Register</button>
                </form>
            </div>
            )
    }
}