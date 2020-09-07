const React = require('react')

export default class Bars extends React.Component {
    render () {
        return (
            <div class="leftcolumn">
                <div class="dropDown">
                    <div class="lines"></div>
                    <div class="lines"></div>
                    <div class="lines"></div>
                </div>
                <img src="./public/gmail.svg" className="logo"/>
                <a className="brand" href="/mail">Gmail</a>
            </div>
            )
    }
}