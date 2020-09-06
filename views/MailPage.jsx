const React = require('react')
import { createMuiTheme } from '@material-ui/core/styles';
import Mail from './Mail'
export default class MailPage extends React.Component {
    render () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/home.css"/>
                    <link rel="icon" href="./gmail.svg"/>
                    <title>Gmail</title>
                    <script src="mail.js" defer></script>
                </head>
                <body>
                    <Mail />
                </body>
            </html>
            )
    }
}