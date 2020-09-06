var React = require("react");

export default class Mail extends React.Component {
  render() {
    return (
        <div className="mailparent">
            <div className="mailheader"></div>

            <div className="mailparent2">
                <div className="mailcomponent">
                </div>
                <div id="footer">
                    <div>Manage your storage</div>
                    <div>Terms . Privacy - Program Policies</div>
                    <div>Last account activity: 0 minutes ago</div>
                </div>
            </div>
        </div>
    )
  }
};