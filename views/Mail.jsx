const React = require('react')
import Bars from './Bars'
import SearchBar from './SearchBar'
import Sidebar from './SideBar'
import MailMainComponent from './MailMainComponent'
export default class Mail extends React.Component {
    render () {
        return (
            <html>
                <head>
                </head>
                <body>
                    <div className="header">
                        <Bars />
                        <SearchBar />
                    </div>
                    <div className="main">
                        <Sidebar />
                        <MailMainComponent />
                    </div>
                </body>
            </html>
            )
    }
}