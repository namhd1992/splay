import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getDataId,
	buyItem
} from '../../modules/shopItem'
import {
	getData,
	updateProfile
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import Notification from '../../components/Notification'
import Typography from 'material-ui/Typography'
import moment from 'moment'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from "material-ui/styles/index"
import LoginRequired from '../../components/LoginRequired'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

const styles = {
	paper: {
		background: "#2b323d"
	},
};

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class Item_giftcode_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogOpen: false,
			price: 0,
			phone: "",
			message: "",
			openSnack: false,
			dialogLoginOpen: false,
			value: 0,
			socket: null,
			loadedRecords: 0,
			snackVariant: "info",
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	handleOpenDialog = () => {
		this.setState({ dialogOpen: true });
		this.props.getDataId(this.props.match.params.id)
	};

	componentDidMount() {
		// const { theme } = this.props;
		// const { primary } = theme.palette;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getDataId(this.props.match.params.id).then(function () {
				_this.props.changeTitle(_this.props.data[0].shopingItem.name);
			});
			// this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
			// 	_this.setState({ phone: _this.props.dataProfile.phoneNumber });
			// });
			_this.setState({ phone: _this.props.dataProfile.phoneNumber });
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreHistoryData(this.props.match.params.id, this.state.limit, newOffset).then(function () {
			_this.setState({
				offset: newOffset,
				loadedRecords: _this.state.limit + newOffset
			});
		});
	}

	handleUpdateProfile = () => {
		// const { theme } = this.props;
		// const { error, success } = theme.palette;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.updateProfile(user.access_token, { "phoneNumber": this.state.phone }).then(function () {
			_this.setState({ openSnack: true, message: _this.props.dataUpdateProfile.data.onlyMessage });
			if (_this.props.dataUpdateProfile.data.statusCode === "T") {
				_this.setState({ snackVariant: "success" });
			} else {
				_this.setState({ snackVariant: "error" });
			}
		});
	}

	handleOnBuy = (id) => {
		// const { theme } = this.props;
		// const { error, success } = theme.palette;
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		this.props.buyItem(user.access_token, user.scoinAccessToken, id).then(function (response, a) {
			_this.setState({ openSnack: true, message: _this.props.dataBuy.onlyMessage });
			if (_this.props.dataBuy.statusCode === "T") {
				_this.setState({ snackVariant: "success" });
			} else {
				_this.setState({ snackVariant: "error" });
			}
			_this.setState({ dialogOpen: false });
		});
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleChangeTab = (event, value) => {
		this.setState({ value });
	};

	setImage=(type)=>{
		if(type==="XU"){
			return <img src={"../Xu.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else if(type==="THIT"){
			return <img src={"../thit.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else if(type==="SCOIN"){
			return <img src={"../scoin.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else{
			return <img src={"../scoin.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}
	}

	render() {
		// const { fullScreen } = this.props;
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { value } = this.state;
		var now = moment(new Date()); //todays date
		var time_text = "";
		if (this.props.data[0] !== undefined) {
			var end = moment(new Date(this.props.data[0].shopingItem.toDate)); // another date
			var start = moment(new Date(this.props.data[0].shopingItem.fromDate)); // another date
			var duration = moment.duration(end.diff(now));
			var durationstart = moment.duration(start.diff(now));
			var days = Math.floor(duration.asDays());
			var hours = Math.floor(duration.asHours());
			var minutes = Math.floor(duration.asMinutes());
			if (days > 0) {
				time_text = "còn " + days + " ngày";
			} else if (hours > 0) {
				time_text = "còn " + hours + " giờ";
			} else if (minutes > 0) {
				time_text = "còn " + minutes + " phút";
			}
			if (duration < 0) {
				time_text = "Đã kết thúc";
			}
			if (durationstart > 0) {
				time_text = "Chưa bắt đầu";
			}
		}

		return (this.props.data.length === 1) ? (
			<div>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36" }}>
							<Grid className="auction-icon" item xs={12} sm={6}>
								<div style={{
									margin: "auto",
									width: "80%",
									paddingBottom: "100%",
									backgroundImage: "url(" + this.props.data[0].shopingItem.defaultImage + ")",
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center"
								}}>
								</div>
							</Grid>
							<Grid item xs={12} sm={6}>
								<List className="auction-root">
									<ListItem style={{ padding: "5px" }}>
									{(this.props.data[0].shopingItem.hasPromotion)?(
									<ListItemText primary={(<span style={{ color: "#fff" }}>Giá: {this.setImage(this.props.data[0].shopingItem.coinType)} <span style={{ color: "#fe8731" }}>{this.props.data[0].promotion.newPrice.toLocaleString()}</span>&nbsp;&nbsp;&nbsp;<span style={{ color: "#fff", textDecoration:"line-through" }}>{this.props.data[0].shopingItem.price.toLocaleString()}</span></span>)} ></ListItemText>):(<ListItemText primary={(<span style={{ color: "#fe8731" }}>Giá: {this.setImage(this.props.data[0].shopingItem.coinType)} <span style={{ color: "#fff"}}>{this.props.data[0].shopingItem.price.toLocaleString()}</span></span>)} ></ListItemText>)}
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Số lượng: {this.props.data[0].shopingItem.quantity}</span>)}></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<Button color="primary" variant="raised" style={{
											margin: "auto",
											width: "100%",
											maxWidth: "320px",
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minHeight: "auto"
										}}
											onClick={this.handleOpenDialog}>Mua</Button>
									</ListItem>
								</List>
							</Grid>
						</Grid>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36", padding: "8px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Mô tả</span>
							</Grid>
							<Grid item xs={12}>
								{value === 0 &&
									<div style={{ color: "#fff" }}>
										<div style={{ padding: "10px" }}
											dangerouslySetInnerHTML={{ __html: this.props.data[0].shopingItem.description }}>
										</div>
									</div>}
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<Dialog
					fullScreen={false}
					open={this.state.dialogOpen}
					onClose={this.handleCloseDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>Mua</span></DialogTitle>
					<DialogContent>
						<List>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Mua {this.props.data[0].shopingItem.name} với giá <span className="global-thit" style={{ color: "#fff" }}><img alt="just alt" src="/../scoin.png" /> {this.props.data[0].shopingItem.priceScoin} </span></span>)} ></ListItemText>
							</ListItem>
						</List>
					</DialogContent>
					<DialogActions>
						<div className="popup-button">
							<Button onClick={this.handleCloseDialog} style={{ color: "#888787", borderRadius:"20px" }}>
								Đóng
              </Button>
							<Button variant="raised" style={{
								margin: "auto",
								maxWidth: "320px",
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minHeight: "auto"
							}}
								onClick={() => this.handleOnBuy(this.props.data[0].shopingItem.id)}
								color="primary" autoFocus>
								Xác nhận
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading" style={{ marginTop: "8px" }}><CircularProgress
			size={50}
		/>
			<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

const mapStateToProps = state => ({
	data: state.shopItem.data,
	dataBuy: state.shopItem.dataBuy,
	dataProfile: state.profile.data,
	dataUpdateProfile: state.profile.dataUpdate,
	dataAuction: state.auction.dataAuction,
	dataHistory: state.auction.dataHistory,
	waiting: state.auction.waiting,
	totalHistoryRecords: state.auction.totalHistoryRecords
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataId,
	buyItem,
	getData,
	updateProfile,
	changeTitle,
}, dispatch)

Item_giftcode_detail.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withStyles(styles, { withTheme: true })(Item_giftcode_detail)))