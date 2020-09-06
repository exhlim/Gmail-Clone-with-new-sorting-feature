const React = require('react')
import Bars from './Bars'
import SearchBar from './SearchBar'
import Sidebar from './SideBar'
import Mail from './Mail'
export default class MailPage extends React.Component {
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
                        <Mail />
                    </div>
                </body>
            </html>
            )
    }
}