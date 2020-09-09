const React = require('react')

export default class Logout extends React.Component {
    render () {
        return (
                <form action="/logout" className="logout">
                    <input type ="submit" value="Log out" className="logout-button"/>
                </form>
            )
    }
}