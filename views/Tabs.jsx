const React = require('react')
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';

export default class Tabs extends React.Component {
    render () {
        let tabs = ["Key Set 1","Key Set 2","Key Set 3"]
        if(this.props.object) {
            this.props.object.forEach((tab,index)=> {
                tabs[index] = tab.tabname
            })
        }
        return (
                <ul class="tabs">
                    <li data-tab-target="#primary" className="active tab"><InboxTwoToneIcon className="tab-icons"/>Primary</li>
                    <li data-tab-target="#urgent" className="tab" ><PriorityHighRoundedIcon className="tab-icons" />Urgent</li>
                    <li data-tab-target="#key-set-A" className="tab"><img src="./public/filter.svg" className="tab-icons" />{tabs[0]}</li>
                    <li data-tab-target="#key-set-B" className="tab"><img src="./public/filter.svg" className="tab-icons" />{tabs[1]}</li>
                    <li data-tab-target="#key-set-C" className="tab"><img src="./public/filter.svg" className="tab-icons" />{tabs[2]}</li>
                </ul>
            )
    }
}