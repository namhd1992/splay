import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import {
	getDataId,
	takeGiftcode,
	share
} from '../../modules/giftcode'
import {
	changeTitle
} from '../../modules/global'
import PropTypes from 'prop-types'

import Fingerprint2 from 'fingerprintjs2'
import { withTheme } from 'material-ui/styles'
import copy from 'copy-to-clipboard'
import GiftCodeDetailComponent from '../../components/page/GiftCodeDetail'


const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 3,
	},
});

class Giftcode_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			value: 0,
			openSnack: false,
			message: "",
			snackVariant: "info",
			dialogLoginOpen: false,
			shared: false,
			logged: false,
			fingerprint: ""
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		new Fingerprint2().get(function (result, components) {
			_this.setState({ fingerprint: result });
		})
		if (user != null) {
			this.props.getDataId(this.props.match.params.id, user.access_token).then(function () {
				_this.props.changeTitle(_this.props.data[0].title);
			});
		} else {
			this.props.getDataId(this.props.match.params.id).then(function () {
				_this.props.changeTitle(_this.props.data[0].title);
			});
		}
		this.setState({ shared: false });
		if (user !== null) {
			this.setState({ logged: true });
		} else {
			this.setState({ logged: false });
		}
	}

	takeGiftcode = (id) => {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		var canTake = true;
		this.props.data[0].giftcodeEvent.giftcodeCondition.forEach(element => {
			if (element.name === "Share link facebook" && !element.shareFacebook && !this.state.shared) {
				this.setState({
					openSnack: true,
					message: "Chia sẻ Link trên Facebook để nhận giftcode",
					snackVariant: "error"
				});
				canTake = false;
			} else if (element.name === "Login Splay" && !this.state.logged) {
				this.setState({ openSnack: true, message: "Đăng nhập Splay để nhận giftcode", snackVariant: "error" });
				canTake = false;
			}
		});
		if (user !== null) {
			if (canTake) {
				this.props.takeGiftcode(id, user.access_token, user.scoinAccessToken, _this.state.fingerprint).then(function () {
					_this.setState({ openSnack: true, message: _this.props.dataTake.data.onlyMessage });
					if (_this.props.dataTake.data.statusCode === "T") {
						_this.setState({ snackVariant: "success" });
						_this.props.getDataId(_this.props.match.params.id, user.access_token);
					} else {
						_this.setState({ snackVariant: "error" });
					}
				});
			}
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	linkClicked = () => {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			setTimeout(() => {
				this.props.share(this.props.match.params.id, user.access_token).then(function () {

				});
				this.setState({ shared: true });
			}, 100);
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	copyText = (text) => {
		copy(text);
		this.setState({ openSnack: true, message: "Đã sao chép " + text, snackVariant: "info" });
	}
	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}
	render() {
		
		return (
			<div>
				<GiftCodeDetailComponent
					data={this.props.data}
					server={this.props.server}
					loginAction={this.loginAction}
					copyText={this.copyText}
					linkClicked={this.linkClicked}
					handleCloseSnack={this.handleCloseSnack}
					takeGiftcode={this.takeGiftcode}
					value={this.state.value}
					openSnack={this.state.openSnack}
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					dialogLoginOpen={this.state.dialogLoginOpen}
					shared={this.state.shared}
					logged={this.state.logged}
					fingerprint={this.state.fingerprint}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.giftcode.data,
	dataTake: state.giftcode.dataTake,
	waiting: state.giftcode.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataId,
	takeGiftcode,
	changeTitle,
	share
}, dispatch)

Giftcode_detail.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(Giftcode_detail)))