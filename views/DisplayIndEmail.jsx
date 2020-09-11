const React = require('react')
const marked = require('marked')
const utf8 = require('utf8');
export default class DisplayIndEmail extends React.Component {
    render () {
        let display = this.props.object;
        display = marked(display)
        return (
                <body dangerouslySetInnerHTML={{__html: display}} ></body>
            )
    }
}