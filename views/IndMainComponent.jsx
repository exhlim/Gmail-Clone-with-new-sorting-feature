var React = require("react");
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import MailHeader from './MailHeader'
import IndViewComponent from './IndViewComponent'
import Footer from './Footer.jsx'

export default class IndMainComponent extends React.Component {
  render() {
    return (
        <div className="mail-parent">
            <MailHeader />
            <div className="mail-parent2">
                <IndViewComponent object3={this.props.object2}/>
            <Footer />
        </div>
    </div>
    )
  }
};