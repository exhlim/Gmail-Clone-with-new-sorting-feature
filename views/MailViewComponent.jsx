const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import PrimaryInbox from './PrimaryInbox'
import Tabs from './Tabs'
import UrgentEmails from './UrgentEmails'

export default class MailViewComponent extends React.Component {
    render () {
        var emails = this.props.object3.emails;
        let urgentEmails = [];
        let keySetA = [];
        let keySetB = [];
        let keySetC = [];
        let regexArray = [];
        function filterUrgent() {
                emails.forEach(email=> {
                    if(email.content.match(/urgent|urgently/gi)){
                        urgentEmails.push(email)
                    }
                })
            }
        filterUrgent(emails)
        // If there is the presence of the keywordDATA object, my regex will change
        if(this.props.object3.keywordData !== undefined) {
            this.props.object3.keywordData.forEach((crux,index)=> {
                let keywordCheck = crux.keywords.split('!!!!')
                let checkedArray = keywordCheck.filter(word=> word.length > 1);
                let compliedRegexp= checkedArray.join('|')
                // let keywordsArray = crux.keywords.replace(/!!!!/gi, "|")
                regexArray.push(compliedRegexp);
            })
            function filterKeySetA() {
                let regex;
                if(regexArray[0]){
                    regex = new RegExp(regexArray[0] , 'gi')
                    emails.forEach(email => {
                    if(email.content.match(regex)){
                        keySetA.push(email)
                    }
                })
                }

            }
            function filterKeySetB() {
                let regex2;
                if(regexArray[1]) {
                    regex2 = new RegExp(regexArray[1], 'gi');
                    emails.forEach(email => {
                    if(email.content.match(regex2)){
                        keySetB.push(email)
                    }
                })
                }

            }
            function filterKeySetC() {
                let regex3;
                if(regexArray[2]) {
                    regex3 = new RegExp(regexArray[2], 'gi');
                    emails.forEach(email => {
                        if(email.content.match(regex3)){
                            keySetC.push(email)
                        }
                    })
                }

            }
        filterKeySetA(emails)
        filterKeySetB(emails)
        filterKeySetC(emails)
        }
        return (
            <div className="mail-component">
                    <Tabs object={this.props.object3.keywordData}/>
                    <div class="tab-content">
                        <div id="primary" data-tab-content class="active">
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
                        <div id="key-set-C" data-tab-content>
                            {keySetC.map(email => (
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