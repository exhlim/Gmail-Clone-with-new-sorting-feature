const React = require('react')
import Bars from './Bars'
import SearchBar from './SearchBar'
import Sidebar from './SideBar'
import IndMainComponent from './IndMainComponent'
export default class IndMail extends React.Component {
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
                        <Sidebar object={this.props.object.emails}/>
                        <IndMainComponent object2={this.props.object}/>
                    </div>
                </body>
            </html>
            )
    }
}