const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import PrimaryInbox from './PrimaryInbox'
import Tabs from './Tabs'

export default class MailViewComponent extends React.Component {
    render () {
        return (
            <div className="mail-component">
                    <Tabs />
                    <div class="tab-content">
                        <div id="primary" data-tab-content class="active">
                            <PrimaryInbox />
                        </div>
                        <div id="urgent" data-tab-content>
                            <h1>Urgent</h1>
                        </div>
                        <div id="key-set-A" data-tab-content>
                            <h1>Key Set A</h1>
                        </div>
                        <div id="key-set-B" data-tab-content>
                            <h1>Key Set B</h1>
                        </div>
                    </div>
            </div>
            )
    }
}