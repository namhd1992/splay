import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData, updateProfile
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import axios from 'axios'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import Notification from '../../components/Notification'
import { withTheme } from 'material-ui/styles'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

const styles = theme => ({
	root: {
		marginTop: "16px",
		marginBottom: "8px",
		borderRadius: "5px",
		backgroundColor: "#232b36",
		color: "#fff",
	},
	gridItem: {
		backgroundColor: "#fff",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px"
	},
	gridLink: {
		textDecoration: "none"
	}
});

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogUpdateOpen: false,
			phone: "",
			email: "",
			fullname: "",
			avatar: "",
			openSnack: false,
			message: "",
			snackVariant: "info",
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
			_this.props.changeTitle("Hồ sơ cá nhân");
			_this.setState({
				phone: _this.props.data.phoneNumber,
				fullname: _this.props.data.fullName,
				email: _this.props.data.email,
			});
		});
	}

	responseFacebook = (response) => {
		var url = "https://graph.facebook.com/v2.12/171101406584460_624717134556216/sharedposts?fields=privacy&access_token=" + response.accessToken;
		axios.get(url).then(function (res) {
			console.log(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleUpdateProfile = () => {
		// const { theme } = this.props;
		// const { success } = theme.palette;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var data = { "phoneNumber": this.state.phone, "email": this.state.email, "fullname": this.state.fullname };
		if (this.state.avatar !== "") {
			data.avatar = this.state.avatar
		}
		this.props.updateProfile(user.access_token, data).then(function () {
			_this.setState({
				openSnack: true,
				message: _this.props.dataUpdateProfile.data.onlyMessage,
				snackVariant: "success"
			});
		}).then(function () {
			_this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
				_this.setState({
					phone: _this.props.data.phoneNumber,
					fullname: _this.props.data.fullName,
					email: _this.props.data.email,
					dialogUpdateOpen: false
				});
				localStorage.setItem("user_info", JSON.stringify(_this.props.data));
			});
		});
	}

	handleCloseDialogUpdate = () => {
		this.setState({ dialogUpdateOpen: false });
	}

	showUpdate = () => {
		// open update profile popup
		// this.setState({ dialogUpdateOpen: true });
		window.open("https://scoin.vn/thong-tin-ca-nhan", '_blank');
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	handleOpenDialog = () => {
		this.setState({ dialogOpen: true });
	};

	handleChangeFile = (FileList) => {
		this.setState({ avatar: FileList[0] });
	}

	render() {
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		const { fullScreen } = this.props;
		let phoneNumber= this.props.data.phoneNumber;
		let str_phone = "";
		if (phoneNumber !== undefined && phoneNumber !== "") {
			var trailingCharsIntactCount = 3;
			str_phone = new Array(this.props.data.phoneNumber.length - (trailingCharsIntactCount - 1)).join('*') +
				this.props.data.phoneNumber.substr(this.props.data.phoneNumber.length - trailingCharsIntactCount, trailingCharsIntactCount);
		}
		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container spacing={8}>
							<Grid item xs={12} style={{ textAlign: "center" }}><h2>Hồ sơ cá nhân</h2></Grid>
							<Grid item xs={12} sm={6}>
								{(this.props.data.urlAvatar !== undefined && this.props.data.urlAvatar !== null) ? (<div style={{
									width: "60%",
									height: "100%",
									minHeight: "180px",
									margin: "auto",
									backgroundImage: "url(../default_ava.png)",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: "contain"
								}}></div>) : (<div style={{
									width: "60%",
									height: "100%",
									margin: "auto",
									minHeight: "180px",
									backgroundImage: "url(../default_ava.png)",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: "contain"
								}}></div>)}
							</Grid>
							<Grid item xs={12} sm={6}>
								<List className="inbox-list-root">
									<ListItem>
										<ListItemText primary={(<span style={{ fontWeight: "500" }}>Họ tên <span style={{ color: secondary.main }}>*********</span></span>)} />
									</ListItem>
									<ListItem>
										<ListItemText primary={(<span style={{ fontWeight: "500" }}>Email <span style={{ color: secondary.main }}>{this.props.data.email}</span></span>)} />
									</ListItem>
									<ListItem>
										<ListItemText primary={(<span style={{ fontWeight: "500" }}>Số điện thoại <span style={{ color: secondary.main }}>{str_phone}</span></span>)} />
									</ListItem>
									<ListItem>
										<ListItemText primary={(<span style={{ fontWeight: "500" }}>VIP <span style={{ color: secondary.main }}>{this.props.data.vipLevel}</span></span>)} />
									</ListItem>
									<ListItem>
										<ListItemText primary={(<span style={{ fontWeight: "500" }}>Thịt <span className="global-thit" style={{ color: "#f8b03c" }}>{(this.props.profileData.splayPoint) ? this.props.profileData.splayPoint.toLocaleString() : "0"} <img alt="just alt"
											src="../thit.png" /></span></span>)} />
									</ListItem>
									<ListItem>
										<a style={{ textDecoration: "none", width: "100%" }} href="https://scoin.vn/thong-tin-ca-nhan"
											rel="noopener noreferrer" target="_blank">
											<Button
												color="secondary"
												onClick={this.showUpdate}
												variant="raised" style={{
													borderRadius: "20px",
													background: "linear-gradient(90deg,#22cab5,#3fe28f)",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minWidth: "auto",
													minHeight: "auto"
												}}>Cập nhật hồ sơ</Button>
										</a>
									</ListItem>
								</List>
							</Grid>
							{(this.props.waiting) ? (<div className="global-loading"><CircularProgress
								size={50}
							/></div>) : (
									<div></div>
								)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.dialogUpdateOpen}
					onClose={this.handleCloseDialogUpdate}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">Cập nhật profile</DialogTitle>
					<DialogContent>
						<List className="inbox-list-root">
							<ListItem>
								<input
									type="file"
									onChange={(e) => this.handleChangeFile(e.target.files)}
								/>
							</ListItem>
							<ListItem>
								<TextField
									id="fullname"
									label="Họ tên"
									defaultValue={(this.props.data.fullName) ? this.props.data.fullName : ""}
									onChange={this.handleChange('fullname')}
									margin="normal"
								/>
							</ListItem>
							<ListItem>
								<TextField
									id="email"
									label="Email"
									defaultValue={(this.props.data.email) ? this.props.data.email : ""}
									onChange={this.handleChange('email')}
									margin="normal"
								/>
							</ListItem>
							<ListItem>
								<TextField
									id="phone"
									label="Số điện thoại"
									defaultValue={(this.props.data.phoneNumber) ? this.props.data.phoneNumber : ""}
									onChange={this.handleChange('phone')}
									margin="normal"
								/>
							</ListItem>
							<ListItem>
								<ListItemText primary="Vip" secondary={this.props.data.vipLevel} />
							</ListItem>
							<ListItem>
								<ListItemText primary="Thịt" secondary={(
									<span className="global-thit">{this.props.profileData.splayPoint.toLocaleString()} <img alt="just alt"
										src="../thit.png" /></span>)} />
							</ListItem>
						</List>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseDialogUpdate} color="primary">
								Đóng
              </Button>
						</div>
						<div>
							<Button onClick={this.handleUpdateProfile} style={{
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minWidth: "auto",
								minHeight: "auto"
							}} >
								Lưu
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	dataUpdateProfile: state.profile.dataUpdate,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	updateProfile,
	changeTitle
}, dispatch)

Profile.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withTheme()(withStyles(styles)(Profile))))