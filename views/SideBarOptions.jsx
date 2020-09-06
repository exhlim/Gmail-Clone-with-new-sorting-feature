var React = require("react");

export default class SideBarOptions extends React.Component {
  render() {
    return (
        <div>
            <div className="sidebaroptions">
                <div className="sidebaricons"><this.props.Icon /></div>
                <div className="sidebartext">{this.props.label}</div>
                <div className="unread">{this.props.unread}</div>
            </div>
        </div>
    )
  }
};