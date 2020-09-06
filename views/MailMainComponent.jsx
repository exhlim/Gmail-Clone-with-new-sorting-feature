var React = require("react");
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import MailHeader from './MailHeader'
import MailViewComponent from './MailViewComponent'
import Footer from './Footer.jsx'

export default class MailMainComponent extends React.Component {
  render() {
    return (
        <div className="mail-parent">
            <MailHeader />
            <div className="mail-parent2">
                <MailViewComponent />
            <Footer />
        </div>
    </div>
    )
  }
};