const React = require('react')
import { createMuiTheme } from '@material-ui/core/styles';
import Header from './Header'
export default class MailPage extends React.Component {
    render () {
        return (
            <html>
                <head>
                    <link rel="stylesheet" type="text/css" href="/home.css"/>
                    <link rel="icon" href="./gmail.svg"/>
                    <title>Gmail</title>
                </head>
                <body>
                    <Header />
                </body>
            </html>
            )
    }
}