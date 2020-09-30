const React = require('react')
import SideBarOptions from './SideBarOptions'
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import LoginPage from './LoginPage'
export default class Sidebar extends React.Component {
    render () {
        let count = 0;
        if(this.props.object !== undefined) {
            if(this.props.object.length !== undefined) {
                count = this.props.object.length
            } else if(this.props.object.emails.length !== undefined) {
            count = this.props.object.emails.length
            }
        } else {
            count = ""
        }
        return (
                <div className="sidebar">
                    <button className='composeComponent'>
                        <img src="./public/plus.svg" className="plus"/>
                        <p id="compose">Compose</p>
                    </button>
                    <a href="/mail" className="sidebarInbox"><SideBarOptions Icon={InboxTwoToneIcon} label="Inbox" unread={count}/></a>
                    <SideBarOptions Icon={StarTwoToneIcon} label="Starred" unread=""/>
                    <SideBarOptions Icon={SendTwoToneIcon} label="Sent" unread=""/>
                    <SideBarOptions Icon={EditTwoToneIcon} label="Drafts" unread=""/>
                    <div className="sidebaroptions">
                        <div className="crux-icon"><img src="./public/filter.svg" /></div>
                        <div className="sidebartext">Define Crux</div>
                    </div>
                    <form method='POST' action="/addcrux?_method=put">
                        <textarea type="text" name="tabName" className="crux-form" placeholder="Name of new Tab" />
                        <textarea type="text" name="keywords" className="crux-form crux-form2" placeholder="(Enter a new line when adding a new Keyword)                                      Example:                                                Debugging                                                                                                                              Bobby                                                                                                             New-york                                                                                      Project ice"/>
                        <input type="submit" value="Create New Crux" className="crux-submit-button"/>
                    </form>
                </div>
            )
    }
}