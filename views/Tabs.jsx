const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';

export default class Tabs extends React.Component {
    render () {
        return (
                <ul class="tabs">
                    <li data-tab-target="#primary" class="active tab"><InboxTwoToneIcon className="tab-icons"/> Primary</li>
                    <li data-tab-target="#urgent" class="tab" ><PriorityHighRoundedIcon className="tab-icons" />Urgent</li>
                    <li data-tab-target="#key-set-A" class="tab"><img src="./filter.svg" className="tab-icons" />Key Set 1</li>
                    <li data-tab-target="#key-set-B" class="tab"><img src="./filter.svg" className="tab-icons" />Key Set 2</li>
                </ul>
            )
    }
}