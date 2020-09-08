const React = require('react')
const marked = require('marked')
const utf8 = require('utf8');
export default class DisplayIndEmail extends React.Component {
    render () {
        let display = this.props.object;
        //         message_decoded = marked(message_decoded)
        // let message_decoded = base64.urlsafe_b64decode(message_raw)
        display = marked(display)
        console.log(display)
        return (
                <body dangerouslySetInnerHTML={{__html: display}} ></body>
            )
    }
}