const React = require('react')

export default class Sidebar extends React.Component {
    render () {
        return (
                <div className="sidebar">
                    <button className='compose'>
                        <img src="./plus.svg" className="plus"/>
                        <p id="compose">Compose</p>
                    </button>

                </div>
            )
    }
}