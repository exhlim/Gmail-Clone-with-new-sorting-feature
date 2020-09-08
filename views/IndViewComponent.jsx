const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import PrimaryInbox from './PrimaryInbox'
import Tabs from './Tabs'
import UrgentEmails from './UrgentEmails'
import DisplayIndEmail from './DisplayIndEmail'

export default class IndViewComponent extends React.Component {
    render () {
        let emails = this.props.object3.emails;
        let urgentEmails = [];
        let keySetA = [];
        let keySetB = [];
        function filterUrgent() {
            emails.forEach(email=> {
                if(email.content.match(/urgent|urgently/gi)){
                    urgentEmails.push(email)
                }
            })
        }
        function filterKeySetA() {
            emails.forEach(email => {
                if(email.content.match(/project monster|monster/gi)){
                    keySetA.push(email)
                }
            })
        }
        function filterKeySetB() {
            emails.forEach(email => {
                if(email.content.match(/fitch/gi)){
                    keySetB.push(email)
                }
            })
        }
        filterUrgent(emails)
        filterKeySetA(emails)
        filterKeySetB(emails)
        return (
            <div className="mail-component">
                    <Tabs />
                    <div className="tab-content">
                        <div id="current" data-tab-content className="active email-display">
                                <DisplayIndEmail object={this.props.object3.indemail[0].content}/>
                        </div>
                        <div id="primary" data-tab-content>
                        {emails.map(email => (
                            <PrimaryInbox
                                sender={email.sender}
                                subject={email.subject}
                                snippet={email.snippet}
                                mailid={email.mailid}
                                date={email.date}
                            />
                        ))}
                        </div>
                        <div id="urgent" data-tab-content>
                            {urgentEmails.map(email => (
                            <PrimaryInbox
                                sender={email.sender}
                                subject={email.subject}
                                snippet={email.snippet}
                                mailid={email.mailid}
                                date={email.date}
                            />
                        ))}
                        </div>
                        <div id="key-set-A" data-tab-content>
                             {keySetA.map(email => (
                            <PrimaryInbox
                                sender={email.sender}
                                subject={email.subject}
                                snippet={email.snippet}
                                mailid={email.mailid}
                                date={email.date}
                            />
                        ))}
                        </div>
                        <div id="key-set-B" data-tab-content>
                            {keySetB.map(email => (
                            <PrimaryInbox
                                sender={email.sender}
                                subject={email.subject}
                                snippet={email.snippet}
                                mailid={email.mailid}
                                date={email.date}
                            />
                        ))}
                        </div>

                    </div>
            </div>
            )
    }
}