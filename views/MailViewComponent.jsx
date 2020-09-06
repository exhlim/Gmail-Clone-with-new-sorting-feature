const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
export default class MailViewComponent extends React.Component {
    render () {
        return (
            <div className="mail-component">
                    <ul class="tabs">
                        <li data-tab-target="#primary" class="active tab"><InboxTwoToneIcon className="tab-icons"/> Primary</li>
                        <li data-tab-target="#key-set-A" class="tab"><img src="./filter.svg" className="tab-icons" />Key Set 1</li>
                        <li data-tab-target="#key-set-B" class="tab"><img src="./filter.svg" className="tab-icons" />Key Set 2</li>
                    </ul>
                    <div class="tab-content">
                        <div id="primary" data-tab-content class="active">
                            <h1>Primary</h1>
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