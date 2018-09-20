import React from 'react'
import { bindActionCreators } from 'redux'
// import classNames from 'classnames'
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
import Grid from 'material-ui/Grid'
// import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Fingerprint2 from 'fingerprintjs2'
// import Snackbar, { SnackbarContent } from 'material-ui/Snackbar'
import { CircularProgress } from 'material-ui/Progress'
// import Dialog, {
// 	DialogActions,
// 	DialogContent,
// 	DialogTitle,
// 	withMobileDialog,
// } from 'material-ui/Dialog'
import LoginRequired from '../../components/LoginRequired'
import Notification from '../../components/Notification'
// import { Link } from 'react-router-dom'
import CloseIcon from 'material-ui-icons/Close'
import CheckIcon from 'material-ui-icons/Check'
import Avatar from 'material-ui/Avatar'
import green from 'material-ui/colors/green'
import {
	FacebookShareButton,
} from 'react-share'
import { withTheme } from 'material-ui/styles'
import copy from 'copy-to-clipboard'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

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


	handleChange = (event, value) => {
		this.setState({ value });
	};

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
		const { theme } = this.props;
		const { error, success } = theme.palette;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		var canTake = true;
		this.props.data[0].giftcodeEvent.giftcodeCondition.forEach(element => {
			if (element.name === "Share link facebook" && !this.state.shared) {
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

	handleResponse = (data) => {
		console.log(data);
	}

	handleError = (error) => {
		console.log(error);
	}

	linkClicked = () => {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			setTimeout(() => {
				this.props.share(this.props.match.params.id, user.access_token).then(function () {

				});
				this.setState({ shared: true });
			}, 10000);
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	copyText = (text) => {
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		copy(text);
		this.setState({ openSnack: true, message: "Đã sao chép " + text, snackVariant: "info" });
	}
	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}
	render() {
		var user = JSON.parse(localStorage.getItem("user"));
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		const { value } = this.state;
		var _this = this;
		return (this.props.data.length === 1) ? (
			<div>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "0px" }}>
							<Grid item xs={12}>
								<ListItem style={{ padding: "5px" }}>
									<img alt="game icon" style={{ width: "72px" }} src={this.props.data[0].defaultImage} />
									<Hidden xsDown>
										<ListItemText style={{ textAlign: "left", padding: "20px" }} secondary={(
											<span style={{ color: "#ccc" }}>Còn lại {(this.props.data[0].giftcodeEvent.numberGiftcode - this.props.data[0].giftcodeEvent.numberGiftcodeLost)}<span
												onClick={this.openRatingDialog}></span></span>)} primary={(
													<span style={{ color: "#fff" }}><b>{this.props.data[0].title}</b></span>)} />
									</Hidden>
									<Hidden smUp>
										<ListItemText style={{ textAlign: "right", padding: "0px" }} secondary={(
											<span style={{ color: "#ccc" }}>Còn lại {(this.props.data[0].giftcodeEvent.numberGiftcode - this.props.data[0].giftcodeEvent.numberGiftcodeLost)}<span
												onClick={this.openRatingDialog}></span></span>)} primary={(
													<span style={{ color: "#fff" }}><b>{this.props.data[0].title}</b></span>)} />
									</Hidden>
									<Hidden xsDown>
										<div>
											{(this.props.data[0].giftcodeEvent.giftcodeLost) ? (
												<Button variant="raised" style={{
													borderRadius: "20px",
													background: "linear-gradient(90deg,#22cab5,#3fe28f)",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minWidth: "auto",
													minHeight: "auto"
												}}
													onClick={() => this.copyText(this.props.data[0].giftcodeEvent.giftcodeLost)}>{this.props.data[0].giftcodeEvent.giftcodeLost}</Button>) : (
													<Button style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}
														onClick={() => this.takeGiftcode(this.props.data[0].giftcodeEvent.id)}>Nhận</Button>)}
										</div>
									</Hidden>
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<Hidden smUp>
									{(this.props.data[0].giftcodeEvent.giftcodeLost) ? (
										<Button style={{
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minWidth: "auto",
											minHeight: "auto",
											width: "100%"
										}}
											onClick={() => this.copyText(this.props.data[0].giftcodeEvent.giftcodeLost)}>{this.props.data[0].giftcodeEvent.giftcodeLost}</Button>) : (
											<Button style={{
												borderRadius: "20px",
												background: "linear-gradient(90deg,#22cab5,#3fe28f)",
												color: "#fff",
												padding: "10px",
												fontSize: "0.8em",
												whiteSpace: "nowrap",
												minWidth: "auto",
												minHeight: "auto",
												width: "100%",
												marginBottom: "8px"
											}}
												onClick={() => this.takeGiftcode(this.props.data[0].giftcodeEvent.id)}>Nhận</Button>)}
								</Hidden>
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Giá</span>
							</Grid>
							<Grid item xs={12} style={{ padding: "15px" }}>
								{(this.props.data[0].giftcodeEvent.price > 0) ? (<span className="global-thit"><span style={{ color: "#fe8731" }} >{this.props.data[0].giftcodeEvent.price + " thịt"}</span> <img alt="just alt"
									src="../thit.png" /></span>) : (<div style={{ color: "#fe8731" }}>Miễn phí</div>)}
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Điều kiện</span>
							</Grid>
							<Grid item xs={12}>
								{value === 0 && <div>
									<List className="giftcode-list-root">
										{this.props.data[0].giftcodeEvent.giftcodeCondition.map((obj, key) => {
											if (obj.name !== "Check UDID") {
												if (obj.name === "Login Splay") {
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(this.state.logged) ? (<Avatar
															style={{ backgroundColor: green[700], width: "30px", height: "30px" }}><CheckIcon></CheckIcon></Avatar>) : (
																<Avatar style={{ width: "30px", height: "30px" }}><CloseIcon></CloseIcon></Avatar>)}
														<ListItemText primary={(<span style={{ color: "#fff" }}>Đăng nhập Splay</span>)} >
														</ListItemText>
														{/* <ListItemText primary={(user !== null) ? 
															"" : (<Button variant="raised" 
																style={{
																	borderRadius: "20px",
																	background:"#232b36",
																	float:"right",
																	color: "#00948d",
																	border: "1px solid #00948d",
																	padding: "10px",
																	fontSize: "0.7em",
																	whiteSpace: "nowrap",
																	minWidth: "auto",
																	minHeight: "auto"
																}}
																onClick={() => _this.loginAction}>THỰC HIỆN
															</Button>)}></ListItemText> */}
														<div className="giftcode-check"></div>
													</ListItem>
												}
												if (obj.name === "Share link facebook") {
													var isShared = false;
													if (obj.shareFacebook || _this.state.shared) {
														isShared = true;
													}
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(isShared) ? (<Avatar
															style={{ backgroundColor: green[700], width: "30px", height: "30px" }}><CheckIcon></CheckIcon></Avatar>) : (
																<Avatar style={{ width: "30px", height: "30px" }}><CloseIcon></CloseIcon></Avatar>)}
														<span style={{ color: "#1f95e7", marginLeft:"15px" }}>Chia sẻ Link trên Facebook</span>
														<ListItemText primary={(user !== null) ? (<FacebookShareButton
															url={_this.props.data[0].giftcodeEvent.urlShareFB}>
															<Button variant="raised" 
																style={{
																	borderRadius: "20px",
																	background:"#232b36",
																	float:"right",
																	color: "#00948d",
																	border: "1px solid #00948d",
																	padding: "10px",
																	fontSize: "0.7em",
																	whiteSpace: "nowrap",
																	minWidth: "auto",
																	minHeight: "auto"
																}}
																onClick={() => _this.linkClicked}>THỰC HIỆN
															</Button></FacebookShareButton>) : (<Button variant="raised" 
																style={{
																	borderRadius: "20px",
																	background:"#232b36",
																	float:"right",
																	color: "#00948d",
																	border: "1px solid #00948d",
																	padding: "10px",
																	fontSize: "0.7em",
																	whiteSpace: "nowrap",
																	minWidth: "auto",
																	minHeight: "auto"
																}}
																onClick={() => _this.linkClicked}>THỰC HIỆN
															</Button>)}></ListItemText>
														<div className="giftcode-check"></div>
													</ListItem>
												}
												if (obj.name === "Login Game") {
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(obj.loginGame) ? (<Avatar
															style={{ backgroundColor: green[700], width: "30px", height: "30px" }}><CheckIcon></CheckIcon></Avatar>) : (
																<Avatar style={{ width: "30px", height: "30px" }}><CloseIcon></CloseIcon></Avatar>)}
														<span style={{ color: "#1f95e7", marginLeft:"15px" }}>Đăng nhập vào game</span>
														<ListItemText primary={(
															<Button variant="raised" 
															style={{
																borderRadius: "20px",
																background:"#232b36",
																float:"right",
																color: "#00948d",
																border: "1px solid #00948d",
																padding: "10px",
																fontSize: "0.7em",
																whiteSpace: "nowrap",
																minWidth: "auto",
																minHeight: "auto"
															}}
															href={_this.props.data[0].giftcodeEvent.scoinGameObject.website}>THỰC HIỆN
														</Button>
														)}></ListItemText>
														<div className="giftcode-check"></div>
													</ListItem>
												}
											}
											return <div key={key}></div>
										})}
									</List>
								</div>}
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Mô tả</span>
							</Grid>
							<Grid className="giftcode-take" item xs={12}>
								<div style={{ padding: "10px", color: "#fff" }}
									dangerouslySetInnerHTML={{ __html: this.props.data[0].content }}>
								</div>
							</Grid>
						</Grid>
						<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
						<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		) : (<div className="global-loading" style={{ backgroundColor: "#232b36", marginTop: "8px" }}>
			<CircularProgress size={50} />
			<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

const mapStateToProps = state => ({
	data: state.giftcode.data,
	dataTake: state.giftcode.dataTake,
	waiting: state.giftcode.waiting
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