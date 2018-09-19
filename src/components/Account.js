import React from 'react'
import Avatar from 'material-ui/Avatar'
import Badge from 'material-ui/Badge'
import {
	getData
} from '../modules/profile'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = {
	root: {
		position: "absolute",
		top: "14px",

	},
	badge: {
		fontSize: "0.5em",
		width: "20px",
		height: "20px",
	},
};

class Account extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userInfo: null
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		_this.props.getData(user.access_token, user.scoinAccessToken);
	}

	render() {
		var notif = 0;
		if (this.props.data !== null && this.props.data.fullName !== undefined) {
			notif = this.props.data.numberInboxUnread + this.props.data.numberMissionUnFinish;
			if (!this.props.data.checkinToday) {
				notif++;
			}
		}
		return (this.props.data !== null && this.props.data.fullName !== undefined) ? (
			<div>
				<Badge style={{ display: (this.props.compact) ? "none" : "block" }} classes={{ root: this.props.classes.root, badge: this.props.classes.badge }} badgeContent={notif} color="error">
					<span></span>
				</Badge>
				{(this.props.data.urlAvatar !== undefined && this.props.data.urlAvatar !== null) ? (<Avatar style={(this.props.compact) ? { display: "none" } : { display: "block" }} src={"../default_ava.png"} ></Avatar>) : (<Avatar style={(this.props.compact) ? { display: "none" } : { display: "block" }} src="../default_ava.png" ></Avatar>)}
				{(this.props.compact) ? (<span style={{ color: "#fff" }}>{this.props.data.fullName}</span>) : (<span></span>)}
			</div>
		) : (<div></div>);
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData
}, dispatch)

Account.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Account))
