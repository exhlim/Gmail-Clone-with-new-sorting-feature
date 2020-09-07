const React = require('react')
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default class UrgentEmails extends React.Component {
    render () {
        return (
                <div>
                    <a className="email" href="/asd">
                        <CheckBoxOutlineBlankRoundedIcon className="email-icons"/>
                        <StarBorderIcon className="email-icons"/>
                        <div className="sender-line">{this.props.sender}</div>
                        <div className="subject-line"><span className="subject-bold">{this.props.subject}</span><span className="snippet-line">{this.props.snippet}</span></div>
                        <div className="date-line">{this.props.date}</div>
                    </a>
                </div>
            )
    }
}