import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import { Divider } from 'material-ui'
import LogoutIcon from 'material-ui-icons/PowerSettingsNew'
import CheckinIcon from 'material-ui-icons/CheckCircle'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import MissionIcon from 'material-ui-icons/ContentPaste'
import Button from 'material-ui/Button'
import CloseIcon from 'material-ui-icons/KeyboardArrowRight'
import HelpIcon from 'material-ui-icons/Help'
import Account from './Account'
import Ultilities from '../Ultilities/global'
import Hidden from 'material-ui/Hidden'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Badge from 'material-ui/Badge'
import {
	getData
} from '../modules/profile'

import {
	setStatusServer
} from '../modules/server'

import {
	changeTitle
} from '../modules/global'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import { withTheme } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import '../styles/menuAppbar.css'

const styles = {
	root: {
		flexGrow: 1,
		transition: "1s",
	},
	flex: {
		flex: 1,
	},
	menuButton: {},
	logo: {
		height: "48px",
		paddingTop: "2px"
	},
	logoCompact: {
		height: "24px",
	},
	toolbar: {
		minHeight: "0px",
		margin: "auto",
		width: "100%",
		boxSizing: "border-box",
		display: "block"
	},
	paper: {
		background: "#2b323d"
	},
	appbar: {
		width: "100%",
		backgroundColor: "#151c24",
		// background: "linear-gradient(to right, rgb(43, 50, 61) 0%, rgba(43, 50, 61, 0.8) 30%, rgba(43, 50, 61, 0) 100%);",
		boxShadow: "none"
	},
	appbarScrolling: {
		width: "100%",
		backgroundColor: "#151c24",
		// background: "linear-gradient(to right, rgb(43, 50, 61) 0%, rgba(43, 50, 61, 0.8) 30%, rgba(43, 50, 61, 0) 100%);",
		boxShadow: "none"
	},
	link: {
		textDecoration: "none"
	}
};

class MenuAppBar extends React.Component {

	state = {
		auth: false,
		top: false,
		left: false,
		bottom: false,
		right: false,
		user: null,
	}

	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		// window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		// window.location.replace(
		// 	`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
		window.location.replace(
			`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	componentDidMount() {
		var {dispatch}=this.props;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (this.props.pathname === "/game") {
			this.props.changeTitle("Danh Sách Game");
		}
		if (this.props.pathname === "/auction") {
			this.props.changeTitle("Shop");
		}
		if (this.props.pathname === "/giftcode") {
			this.props.changeTitle("Giftcode");
		}
		if (this.props.pathname === "/lucky") {
			this.props.changeTitle("May Mắn");
		}
		if (localStorage.getItem("user") != null) {
			var now = moment(new Date()); //todays date
			var end = moment(user.expired); // another date
			var duration = moment.duration(end.diff(now));
			var millisecond = Math.floor(duration.asMilliseconds()) + 86400000;
			if (millisecond > 0) {
				_this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
					if (_this.props.data === null) {
						_this.logoutAction();
					}
				});
				this.setState({
					auth: true,
					user: JSON.parse(localStorage.getItem("user")),
				});
			} else {
				this.logoutAction();
			}
		} else {
			this.setState({ auth: false });
			var code = Ultilities.parse_query_string("code", window.location.href);
			var fb_mess = Ultilities.parse_query_string("fbmessid", window.location.href);
			var currentPath=localStorage.getItem("currentPath");
			if (code != null) {
				if (fb_mess === null) {
					var url = Ultilities.base_url() + "/anonymous/loginScoin";
					var redirect = `http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}`;
					var params = {
						"code": code,
						"redirect_uri": redirect
					};
					axios.post(url, params).then(function (response) {
						
						var user_save = response.data.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						window.location.replace(`${window.location.protocol}//${window.location.host}${currentPath}`);
						// _this.props.getData(user_save.access_token, user_save.scoinAccessToken).then(function () {
						// 	window.location.replace(`${window.location.protocol}//${window.location.host}`);
						// });
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				} else {
					var url = Ultilities.base_url() + "/anonymous/loginScoin";
					var redirect = `http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/loginwidget`;
					var params = {
						"code": code,
						"redirect_uri": redirect
					};
					axios.post(url, params).then(function (response) {
						var user_save = response.data.data;
						user_save.expired = new Date();
						localStorage.setItem("user", JSON.stringify(user_save));
						_this.setState({ user: response.data.data });
						_this.props.getData(user_save.access_token, user_save.scoinAccessToken).then(function () {
							var newurl = "https://splay.vn:3003/userinfo";
							axios.post(newurl, { account: _this.props.data.accountNumber, messid: fb_mess }).then(function (response1) {
								console.log(response1);
								// window.location.replace(`${window.location.protocol}//${window.location.host}/loginwidget1`);
							});
						});
					}).catch(function (error) {
						_this.props.setStatusServer();
						localStorage.removeItem("user");
						localStorage.removeItem("userInfo");
						_this.setState({ auth: false });
					})
				}
			}
		}
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open,
		});
	};

	render() {
		const { classes } = this.props;
		// const {theme} = this.props;
		// const {primary} = theme.palette;
		const { auth } = this.state;
		var sideList = null;
		if (this.state.user != null && this.props.data != null) {
			sideList = (
				<div className="side-list-wrap">
					<List>
						<ListItem button>
							<ListItemIcon>
								<CloseIcon style={{ color: "#23c9b6" }} />
							</ListItemIcon>
						</ListItem>
						<Link className={classes.link} to='/profile'>
							<ListItem button>
								<ListItemIcon>
									<AccountCircle style={{ color: "#23c9b6" }} />
								</ListItemIcon>
								<ListItemText primary={this.props.data.fullName} />
							</ListItem>
						</Link>
						<Link className={classes.link} to='/inbox'>
							<ListItem button>
								<ListItemIcon>
									{(this.props.data.numberInboxUnread === 0) ? (
										<DraftsIcon style={{ color: "#23c9b6" }} />
									) : (
											<Badge badgeContent={this.props.data.numberInboxUnread} color="error">
												<DraftsIcon style={{ color: "#23c9b6" }} />
											</Badge>
										)}
								</ListItemIcon>
								<ListItemText primary="Hộp thư" />
							</ListItem>
						</Link>
						<Divider></Divider>
						<Link className={classes.link} to='/mission'>
							<ListItem button>
								<ListItemIcon>
									{(this.props.data.numberMissionUnFinish === 0) ? (
										<MissionIcon style={{ color: "#23c9b6" }} />
									) : (
											<Badge badgeContent={this.props.data.numberMissionUnFinish} color="error">
												<MissionIcon style={{ color: "#23c9b6" }} />
											</Badge>
										)}
								</ListItemIcon>
								<ListItemText primary="Nhiệm vụ" />
							</ListItem>
						</Link>
						<Link className={classes.link} to='/checkin'>
							<ListItem button>
								<ListItemIcon>
									{(this.props.data.checkinToday) ? (
										<CheckinIcon style={{ color: "#23c9b6" }} />
									) : (
											<Badge badgeContent={"!"} color="error">
												<CheckinIcon style={{ color: "#23c9b6" }} />
											</Badge>
										)}
								</ListItemIcon>
								<ListItemText primary="Điểm danh" />
							</ListItem>
						</Link>
						{/* <Link className={classes.link} to='/phonecard'>
							<ListItem button>
								<ListItemIcon>
									<CardIcon style={{ color: "#23c9b6" }} />
								</ListItemIcon>
								<ListItemText primary="Nhập thẻ" />
							</ListItem>
						</Link> */}
						<Divider></Divider>
						<Link className={classes.link} to='/help'>
							<ListItem button>
								<ListItemIcon>
									<HelpIcon style={{ color: "#23c9b6" }} />
								</ListItemIcon>
								<ListItemText primary="Giới thiệu" />
							</ListItem>
						</Link>
						{/*<Link className={classes.link} to='/vip'>*/}
						{/*<ListItem button>*/}
						{/*<ListItemIcon>*/}
						{/*<HelpIcon/>*/}
						{/*</ListItemIcon>*/}
						{/*<ListItemText primary="Quyền VIP"/>*/}
						{/*</ListItem>*/}
						{/*</Link>*/}
						<Divider></Divider>
						<ListItem button onClick={this.logoutAction}>
							<ListItemIcon>
								<LogoutIcon style={{ color: "#23c9b6" }} />
							</ListItemIcon>
							<ListItemText primary="Đăng xuất" />
						</ListItem>
					</List>
				</div>
			);
		}
		return (
			<div className={classes.root}>
				<AppBar className={(this.props.scrolling) ? classes.appbarScrolling : classes.appbar} >
					<Toolbar className={classes.toolbar} style={{ maxWidth: "1280px", padding: "0px 8px" }}>
					<Hidden smDown>
							{(this.props.pathname !== "/") ? (<div style={{ float: "left", padding: (this.props.compact && this.props.scrolling) ? "4px 0px 0px 0px" : "14px 0px 14px 0px" }}>
								<Avatar onClick={() => {
									this.props.history.goBack()
								}} style={{ backgroundColor: "transparent", width: "24px", height: "24px" }}>
									<KeyboardArrowLeft style={{ color: "#fff" }}></KeyboardArrowLeft>
								</Avatar>
							</div>
							) : (<div></div>)}
							<div style={{ float: "left", marginTop: (this.props.compact && this.props.scrolling) ? "4px" : "4px" }}>
								<Link className={classes.link} to='/'>
									<img alt="logo splay" className={(this.props.compact && this.props.scrolling) ? classes.logoCompact : classes.logo} src="../logo_demo.png" />
								</Link>
							</div>
							</Hidden>
						
						{(!auth) ? (
							<div style={{ display: "flex", float: "right", marginTop: (this.props.compact && this.props.scrolling) ? "0px" : "10px" }}>
								<Button style={{ color: "#f8b03c", padding: "5px", fontWeight: "bold", minHeight: "auto", fontSize: "0.8em" }}>
									<a href="https://scoin.vn/nap-game" target="_blank" style={{ textDecoration: "none", color: "#f8b03c", marginRight: "5px" }}><img
										style={{ verticalAlign: "bottom", height: "20px", marginRight: "2px" }} src="/../scoin.png" />Nạp</a>
								</Button>
								<Button style={{ color: "#fff", padding: "0px" }} className='login-button' onClick={this.loginAction}>
									Đăng nhập
                  </Button>
							</div>
						) : (
								<div style={{ display: (this.props.compact && this.props.scrolling) ? "none" : "flex", margin:"12px 3px 0px 0px", float:"right"}} >
									<a href="https://scoin.vn/nap-game" target="_blank" style={{ textDecoration: "none", color: "#f8b03c", marginRight: "20px", padding: "5px" }}>
										<div className="valueCoin">
											<img className="imgScoin" src="/../scoin.png" />
											<span>{this.props.data.scoinBalance ? this.props.data.scoinBalance.toLocaleString(): "0"}</span>
											<img style={{float:"right", border:"1px solid", borderRadius:"50%", marginTop:"2px"}} src="../addScoin.png"
												alt="just alt"/>
										</div>
									</a>
									<a target="_blank" style={{ textDecoration: "none", color: "#515151", marginRight: "20px", padding: "5px" }}>
										<div className="valueCoin">
											<img className="imgXu" src="/../Xu.png" />
											<span>{this.props.data.balanceXU ? this.props.data.balanceXU.toLocaleString(): "0"}</span>
											<img style={{float:"right", border:"1px solid", borderRadius:"50%", marginTop:"2px"}} src="../addXu.png"
												alt="just alt"/>
										</div>
									</a>
									<div onClick={this.toggleDrawer('right', true)} style={{ marginTop: (this.props.compact && this.props.scrolling) ? "4px" : "0px" }}>
										<Account 
											compact={this.props.compact && this.props.scrolling}
											dataProfile={this.props.data}
										/>
									</div>
								</div>
							)}
					</Toolbar>
				</AppBar>
				<Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)} classes={{ paper: classes.paper }}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('right', false)}
						onKeyDown={this.toggleDrawer('right', false)}
					>
						{sideList}
					</div>
				</Drawer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	title: state.global.title,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeTitle,
	setStatusServer
}, dispatch)

MenuAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(MenuAppBar))));