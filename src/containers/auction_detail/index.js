import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getDataId,
	auction,
	getHistoryData,
	getMoreHistoryData,
} from '../../modules/auction'
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
import LoginRequired from '../../components/LoginRequired'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { CircularProgress } from 'material-ui/Progress'
import { Link } from 'react-router-dom'
import moment from 'moment'
import io from 'socket.io-client';
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from "material-ui/styles/index"
import Slider from 'react-slick'
import RightArea from '../../components/RightArea'
import Notification from '../../components/Notification'
import Hidden from 'material-ui/Hidden'


const styles = {
	paper: {
		background: "#2b323d"
	},
};

function SampleNextArrow(props) {
	const { style, onClick } = props;
	return (
		<div
			className="slick-arrow slick-next"
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

class Auction_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogOpen: false,
			price: 0,
			phone: "",
			message: "",
			snackVariant: "info",
			openSnack: false,
			dialogLoginOpen: false,
			value: 0,
			socket: null,
			loadedRecords: 0,
			itemImage: ""
		};
	}
	componentWillUnmount() {
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.state.socket.disconnect();
		}
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getHistoryData(this.props.match.params.id, this.state.limit, this.state.offset).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
		if (user !== null) {
			this.props.getDataId(this.props.match.params.id).then(function () {
				_this.props.changeTitle("Đấu giá "+_this.props.data[0].name);
				const socket = io('https://socket.simba-app.com');
				_this.setState({ socket: socket });
				_this.state.socket.on('connect', function () {
					_this.state.socket.on("LANE_AUCTION", function (data) {
						if (parseInt(_this.props.data[0].id, 10) === data.auctionEventId) {
							_this.props.getDataId(_this.props.match.params.id);
							_this.setState({
								openSnack: true,
								message: "Vừa có người đấu giá sản phẩm này!",
								snackVariant: "info"
							});
						}
					});
				});
				if (_this.props.data[0].listImage !== "" && _this.props.data[0].listImage !== null) {
					_this.setState({ itemImage: _this.props.data[0].listImage.split(",")[0] });
				} else {
					_this.setState({ itemImage: _this.props.data[0].defaultImage });
				}
			});
			// this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
			// 	_this.setState({ phone: _this.props.dataProfile.phoneNumber });
			// });
			_this.setState({ phone: _this.props.dataProfile.phoneNumber });
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
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

	handleOnAuction = (id, price) => {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		this.props.auction(user.access_token, user.scoinAccessToken, id, price).then(function (response, a) {
			_this.setState({ openSnack: true, message: _this.props.dataAuction.data.onlyMessage });
			if (_this.props.dataAuction.data.statusCode === "T") {
				_this.setState({ snackVariant: "success" });
			} else {
				_this.setState({ snackVariant: "error" });
			}
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

	changeImage = (image) => {
		this.setState({ itemImage: image });
	}

	render() {
		var dataHistory=this.props.dataHistory;
		var lengthHistory=0;
		if(dataHistory){
			lengthHistory=this.props.dataHistory.length;
		}
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		const { value } = this.state;
		var now = moment(new Date()); //todays date
		var time_text = "";
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			centerMode: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		if (this.props.data[0] !== undefined) {
			var end = moment(new Date(this.props.data[0].toDate)); // another date
			var start = moment(new Date(this.props.data[0].fromDate)); // another date
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
				<Grid container spacing={8} >
					<Grid item xs={12} md={8}>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36" }}>
							<Grid className="auction-icon" item xs={12} sm={6} >
								<div style={{
									width: "100%",
									padding: "8px",
									boxSizing: "border-box"
								}}>
									<div
										style={{
											width: "100%",
											paddingBottom: "100%",
											backgroundImage: "url(" + this.state.itemImage + ")",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "center"
										}}
									></div>
								</div>
								{(this.props.data[0].listImage !== null && this.props.data[0].listImage !== "") ? (
									<div style={{ width: "80%", margin: "auto" }}>
										<Slider dotsClass={"slick-dots carousel-dot"} {...settings} >
											{this.props.data[0].listImage.split(",").map((obj, key) => (<div onClick={() => this.changeImage(obj)} style={{ width: "25%", padding: "2px", boxSizing: "border-box" }}><div style={{ width: "100%", paddingBottom: "100%", backgroundImage: "url(" + obj + ")", backgroundSize: "cover" }} ></div></div>))}
										</Slider>
									</div>
								) : (
										<div></div>
									)}
							</Grid>
							<Grid item xs={12} sm={6}>
								<List className="auction-root" style={{ backgroundColor: "#232b36" }}>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Giá khởi điểm <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {this.props.data[0].amountStart.toLocaleString()} </span></span>)} ></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Bước giá <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {this.props.data[0].priceStep.toLocaleString()} </span></span>)}></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Giá hiện tại <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> <span>{this.props.data[0].topPrice.toLocaleString()}</span> </span></span>)} ></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>{this.props.data[0].countUserAuction} người đã tham gia</span>)}
										></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Còn lại {time_text}</span>)}></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										{(duration>0) ? (
												<Button color="primary" variant="raised" style={{
													margin: "10px auto",
													width: "100%",
													borderRadius: "20px",
													background: "linear-gradient(90deg,#22cab5,#3fe28f)",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minHeight: "auto"
												}}
													onClick={this.handleOpenDialog}>Đấu giá</Button>
											):(<div></div>)}
									</ListItem>
								</List>
							</Grid>
						</Grid>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36", padding: "8px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Mô tả</span>
							</Grid>
							<Grid item xs={12}>
								{value === 0 && <div>
									<div style={{ color: "#fff", padding: "8px" }}>
										{this.props.data[0].description}
									</div>
								</div>}
							</Grid>
						</Grid>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36", padding: "8px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Lịch sử</span>
							</Grid>
							{(lengthHistory <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có lịch sử</Grid>) : (<span></span>)}
							<Grid item xs={12}>
								{dataHistory !== undefined && <div style={{ padding: "0px" }}>
									<List className="auction-history-list-root">
										{dataHistory.map((obj, key) => (
											<ListItem key={key} style={{ padding: "8px" }}>
												<ListItemText primary={(<span style={{ color: "#fff" }}>{obj.userPaid}</span>)}
													secondary={(<span style={{ color: "#fff" }}>{moment(obj.createOn).format("hh:mm DD/MM/YYYY")}</span>)} />
												<ListItemText style={{ textAlign: "right" }}
													primary={<span className="global-thit" style={{ color: "#fe8731" }}><img
														alt="just alt" src="../thit.png" /> {obj.currentPrice.toLocaleString()} </span>} />
											</ListItem>
										))}
									</List>
									{(this.props.waiting) ? (<div className="global-loading">{(this.props.server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<span>Hệ thống đang bảo trì, nâng cấp. xin vui lòng quay lại sau!</span>)}
									/></div>) : (this.props.totalHistoryRecords > this.state.loadedRecords) ? (
										<Grid item xs={12} className="global-loadmore">
											<a onClick={this.loadMoreAction} style={{ color: secondary.main }}>Xem thêm</a>
										</Grid>
									) : (<div></div>)}
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
				>{(durationstart > 0) ? (
					<div>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }} >Chưa đến thời điểm đấu giá</span></DialogTitle>
					<DialogActions>
						<div className="popup-button">
							<Button onClick={this.handleCloseDialog} style={{ color: "#fe8731", borderRadius:"20px"}}>
								Đóng
              				</Button>
						</div>
					</DialogActions>
					</div>): (
						<div>
							<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }} >Đấu giá</span></DialogTitle>
					<DialogContent>
						<List className="auction-root" style={{ backgroundColor: "#232b36" }}>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Giá khởi điểm <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {this.props.data[0].amountStart.toLocaleString()} </span></span>)} ></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Bước giá <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {this.props.data[0].priceStep.toLocaleString()} </span></span>)} ></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Giá hiện tại <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> <span>{this.props.data[0].topPrice.toLocaleString()}</span> </span></span>)}></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>{this.props.data[0].countUserAuction} người đã tham gia</span>)}
								></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Còn lại {time_text}</span>)}></ListItemText>
							</ListItem>
						</List>
						<div className="auction-phone-wrap" style={{ display: "table", padding: "5px" }}>
							<div style={{ padding: "5px" }}>
								<TextField
									id="number"
									label="Số điện thoại"
									onChange={this.handleChange('phone')}
									defaultValue={this.props.dataProfile.phoneNumber}
									type="password"
									className="priceInput"
									InputLabelProps={{
										shrink: true,
									}}
									margin="normal"
								/>
							</div>
							<div style={{ padding: "5px", display: "table-cell", verticalAlign: "bottom" }}>
								<Button className="auction-button-phone" onClick={this.handleUpdateProfile} style={{ color: "#24b9a9", border: "solid 1px #24b9a9" }}>Cập nhật</Button>
							</div>
						</div>
						<div className="auction-phone-wrap" style={{ color: "#ccc" }}>Cập nhật số điện thoại để tham gia đấu giá</div>
						<div className="auction-phone-wrap">
							<TextField
								id="number"
								label="Giá"
								defaultValue="1"
								onChange={this.handleChange('price')}
								type="number"
								className="priceInput"
								InputLabelProps={{
									shrink: true,
								}}
								margin="normal"
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<div className="popup-button">
							<Button onClick={this.handleCloseDialog} style={{ color: "#fe8731", borderRadius:"20px" }}>
								Đóng
              				</Button>
							  {(duration>0) ? (												
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
									onClick={() => this.handleOnAuction(this.props.data[0].id, this.state.price)}
									color="primary" autoFocus>
									Đấu giá
								</Button>):(<Button style={{padding:"8px", color:"#fff"}} disabled>Đấu giá</Button>)}
						</div>
					</DialogActions>
				
						</div>
					)}
					</Dialog>
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading" style={{ marginTop: "8px" }}>{(this.props.server !== true) ? (												
			<CircularProgress style={{ color: "#fff" }} size={50} />):(<span>Hệ thống đang bảo trì, nâng cấp. xin vui lòng quay lại sau!</span>)}
			<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

const mapStateToProps = state => ({
	data: state.auction.data,
	dataProfile: state.profile.data,
	dataUpdateProfile: state.profile.dataUpdate,
	dataAuction: state.auction.dataAuction,
	dataHistory: state.auction.dataHistory,
	waiting: state.auction.waiting,
	totalHistoryRecords: state.auction.totalHistoryRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataId,
	getData,
	getHistoryData,
	getMoreHistoryData,
	updateProfile,
	auction,
	changeTitle,
}, dispatch)

Auction_detail.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withStyles(styles, { withTheme: true })(Auction_detail)))