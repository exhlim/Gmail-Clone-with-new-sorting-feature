const React = require('react')
import SideBarOptions from './SideBarOptions'

import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

export default class Sidebar extends React.Component {
    render () {
        return (
                <div className="sidebar">
                    <button className='composeComponent'>
                        <img src="./public/plus.svg" className="plus"/>
                        <p id="compose">Compose</p>
                    </button>
                    <a href="/mail" className="sidebarInbox"><SideBarOptions Icon={InboxTwoToneIcon} label="Inbox" unread={this.props.object.length || this.props.object.emails.length}/></a>
                    <SideBarOptions Icon={StarTwoToneIcon} label="Starred" unread=""/>
                    <SideBarOptions Icon={SendTwoToneIcon} label="Sent" unread=""/>
                    <SideBarOptions Icon={EditTwoToneIcon} label="Drafts" unread=""/>
                    <div className="sidebaroptions">
                        <div className="crux-icon"><img src="./public/filter.svg" /></div>
                        <div className="sidebartext">Define Crux</div>
                    </div>
                    <form method='POST' action="/addcrux?_method=put">
                        <textarea type="text" name="tabName" className="crux-form" placeholder="Name of new Tab" />
                        <textarea type="text" name="keywords" className="crux-form crux-form2" placeholder="What should be the crux of your sorted emails? Use Crux to sort your emails for you! Insert specific keywords to filter out your emails base on those keywords that you have defined. Be specific with your keywords! (Enter a new line when adding a new Keyword)                                      Example:                                                Debugging                                                                                                                              Bobby                                                                                                             New-york                                                                                      Project ice"/>
                        <input type="submit" value="Create New Crux" className="crux-submit-button"/>
                    </form>
                </div>
            )
    }
}