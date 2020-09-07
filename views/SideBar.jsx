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
                    <SideBarOptions Icon={InboxTwoToneIcon} label="Inbox" unread="5"/>
                    <SideBarOptions Icon={StarTwoToneIcon} label="Starred" unread=""/>
                    <SideBarOptions Icon={SendTwoToneIcon} label="Sent" unread=""/>
                    <SideBarOptions Icon={EditTwoToneIcon} label="Drafts" unread="5"/>
                </div>
            )
    }
}