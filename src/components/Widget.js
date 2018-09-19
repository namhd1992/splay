import React from 'react'
import Notifications from 'material-ui-icons/Notifications'

class Widget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			notifSetting: 1
		};
	}

	componentDidMount = () => {
		// var _this = this;
		// const messaging = window.firebase.messaging();
		// messaging.onMessage(function(payload) {
		// 	console.log('Message received. ', payload);
		// });
	}

	handleClick = () => {
		
	}

	render() {
		return (
			(this.state.notifSetting === 1) ? (<span onClick={this.handleClick} className='widget-root' style={{ backgroundColor: "#FF5722", position: "fixed", bottom: "65px", left: "0px", borderRadius: "0px 5px 5px 0px", zIndex: "1999", padding: "5px" }}>
				<Notifications style={{ color: "white", fontSize: "1em" }}></Notifications>
			</span>) : (<span></span>)
		);
	}
}

export default Widget;