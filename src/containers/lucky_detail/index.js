import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Ultilities from '../../Ultilities/global'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import ReactCardFlip from 'react-card-flip'
import ReactResizeDetector from 'react-resize-detector'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles/index'
import Notification from '../../components/Notification'
import LoginRequired from '../../components/LoginRequired'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

const styles = {
	paper: {
		background: "#2b323d"
	},
};

class Lucky_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			flippedArr: [],
			collapse: false,
			cardArr: [],
			dialogOpen: false,
			highLightCard: null,
			canPlay: true,
			openSnack: false,
			message: "",
			snackVariant: "info",
			dialogLoginOpen: false,
			dialogItemOpen: false,
			fontSize: "1em",
			dialogMoreTurnOpen: false
		};
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getDetailData(user.access_token, this.props.match.params.id).then(function () {
				_this.props.changeTitle(_this.props.dataDetail.luckyspin.name);
				var new_arr = [];
				_this.props.dataDetail.itemOfSpin.forEach(function (item, key) {
					new_arr.push({ id: item.item.id, status: true });
				});
				_this.setState({ cardArr: _this.props.dataDetail.itemOfSpin, flippedArr: new_arr });
			});
			this.props.getData(user.access_token, user.scoinAccessToken);
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	onResize = () => {
		if (window.innerWidth <= 480) {
			this.setState({ cardHeight: 114, cardWidth: 76, fontSize: "0.6em" });
		}
		if (window.innerWidth > 480 && window.innerWidth <= 768) {
			this.setState({ cardHeight: 180, cardWidth: 120, fontSize: "1em" });
		}
		if (window.innerWidth > 768) {
			this.setState({ cardHeight: 180, cardWidth: 120, fontSize: "1em" });
		}
	}

	openCard = (id) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var new_arr = [];
		var new_arr_after = [];
		this.state.flippedArr.forEach(function (item, key) {
			if (item.id === id) {
				new_arr.push({ id: item.id, status: false });
			} else {
				new_arr.push({ id: item.id, status: true });
			}
			new_arr_after.push({ id: item.id, status: false });
		});
		_this.setState({ flippedArr: new_arr });
		setTimeout(function () {
			_this.setState({ flippedArr: new_arr_after, highLightCard: id, canPlay: true });
		}, 1000);
		this.props.getDetailData(user.access_token, this.props.match.params.id)
	}

	random = () => {
		this.setState({ cardArr: Ultilities.shuffle(this.state.cardArr) });
	}

	highLight = (card_id) => {
		this.setState({ highLightCard: card_id });
	}

	unHighLight = () => {
		this.setState({ highLightCard: null });
	}

	swap = (id1, id2) => {
		var newCardArr = this.state.cardArr;
		var key1 = 0;
		var key2 = 0;
		this.state.cardArr.forEach(function (item, key) {
			if (item.item.id === id1) key1 = key;
			if (item.item.id === id2) key2 = key;
		});
		newCardArr[key1] = newCardArr.splice(key2, 1, newCardArr[key1])[0];
		this.setState({ cardArr: newCardArr });
	}

	flipCard = (key) => {
		var newFlippedArr = this.state.flippedArr;
		newFlippedArr[key] = false;
		this.setState({ flippedArr: newFlippedArr });
	}

	collapse = () => {
		this.setState({ collapse: true });
	}

	expand = () => {
		this.setState({ collapse: false });
	}

	start = () => {
		if (this.props.dataDetail.userSpinInfo.turnsBuy + this.props.dataDetail.userSpinInfo.turnsFree <= 0) {
			this.setState({ dialogMoreTurnOpen: true });
		} else {
			if (this.state.canPlay) {
				var _this = this;
				var new_arr_after = [];
				this.state.flippedArr.forEach(function (item, key) {
					new_arr_after.push({ id: item.id, status: true });
				});
				_this.setState({ flippedArr: new_arr_after });
				this.collapse();
				this.random();
				this.unHighLight();
				setTimeout(function () {
					_this.expand();
				}, 1000);
			}
		}
	}

	pick = (key) => {
		const { theme } = this.props;
		const { error, success } = theme.palette;
		if (this.state.canPlay) {
			var _this = this;
			this.setState({ canPlay: false });
			var user = JSON.parse(localStorage.getItem("user"));
			this.props.pickCard(user.access_token, user.scoinAccessToken, this.props.match.params.id).then(function () {
				if (_this.props.dataPick === null) {
					_this.setState({ openSnack: true, message: "Bạn đã hết lượt quay", snackVariant: "error" });
				} else {
					_this.swap(key, _this.props.dataPick.item.id);
					_this.openCard(_this.props.dataPick.item.id);
					_this.setState({ openSnack: true, message: "Thành công, vào hộp thư để xem vật phẩm trúng thưởng", snackVariant: "success" });
				}
				_this.props.getDetailData(user.access_token, _this.props.match.params.id);
				_this.props.getData(user.access_token, user.scoinAccessToken);
			});
		}
	}

	buyTurn = (turn) => {
		const { theme } = this.props;
		const { error, success } = theme.palette;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.buyTurn(user.access_token, user.scoinAccessToken, this.props.match.params.id, turn).then(function () {
			if (_this.props.dataTurn.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
			} else {
				_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
			}
			_this.props.getDetailData(user.access_token, _this.props.match.params.id);
			_this.props.getData(user.access_token, user.scoinAccessToken);
		});
	}

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	handleCloseMoreTurnDialog = () => {
		this.setState({ dialogMoreTurnOpen: false });
	};

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};

	showBuyTurn = () => {
		this.setState({ dialogOpen: true });
	}
	showItem = () => {
		this.setState({ dialogItemOpen: true });
	}
	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const { fullScreen } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		var splayPoint=this.props.dataProfile.splayPoint;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}
		var _this = this;
		return (this.state.cardArr.length > 0) ? (
			<div className="lucky-detail-root" style={{ marginTop: "8px" }}>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container className="lucky-detail-root" spacing={8}>
							<Grid item xs={12}>
								<div className="lucky-wrap"
									style={{ margin: "auto", width: (this.state.cardWidth * 4) + "px", height: (this.state.cardHeight * 3) + "px", position: "relative" }}>
									{this.state.cardArr.map((obj, key) => {
										var top = "0px";
										var left = "0px";
										if (!_this.state.collapse) {
											left = (key % 4) * this.state.cardWidth + "px";
											top = (Math.floor(key / 4)) * this.state.cardHeight + "px"
										}
										return (<div key={key} className="lucky-card lucky-card-collapse"
											style={{
												transition: "0.5s",
												WebkitTransition: "0.5s",
												width: this.state.cardWidth,
												height: this.state.cardHeight + "px",
												left: left,
												top: top
											}}>
											<ReactCardFlip style={{ height: '100%' }} isFlipped={_this.state.flippedArr.find(x => x.id === obj.item.id).status}>
												<div key="front" style={{
													opacity: (this.state.highLightCard === null || this.state.highLightCard === obj.item.id) ? "1" : "0.5",
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardfront1.png)",
													width: "100%",
													height: this.state.cardHeight + "px",
													textAlign: "center"
												}}>
													<div style={{ paddingTop: this.state.cardHeight * 0.3 + "px" }}><img alt="just alt" style={{ width: (this.state.cardWidth * 0.5) + "px" }}
														src={obj.item.urlImage} /></div>
													<div style={{ fontSize: this.state.fontSize }}>{obj.item.name}</div>
												</div>
												<div key="back" onClick={() => this.pick(obj.item.id)} style={{
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardback1.png)",
													width: "100%",
													height: this.state.cardHeight + "px",
													textAlign: "center"
												}}>
												</div>
											</ReactCardFlip>
										</div>)
									}
									)}
								</div>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button
									style={{
										borderRadius: "20px",
										background: "linear-gradient(90deg,#22cab5,#3fe28f)",
										color: "#fff",
										padding: "10px",
										fontSize: "0.8em",
										whiteSpace: "nowrap",
										minWidth: "auto",
										minHeight: "auto"
									}}
									onClick={this.start}>Chơi
              ({this.props.dataDetail.userSpinInfo.turnsBuy + this.props.dataDetail.userSpinInfo.turnsFree})</Button>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button variant="raised" style={{
									borderRadius: "20px",
									background: "linear-gradient(90deg,#ff5f27,#ff9019)",
									color: "#fff",
									padding: "10px",
									fontSize: "0.8em",
									whiteSpace: "nowrap",
									minWidth: "auto",
									minHeight: "auto"
								}} onClick={this.showItem}>Phần thưởng</Button>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button style={{
									borderRadius: "20px",
									background: "linear-gradient(90deg,#ff5f27,#ff9019)",
									color: "#fff",
									padding: "10px",
									fontSize: "0.8em",
									whiteSpace: "nowrap",
									minWidth: "auto",
									minHeight: "auto"
								}} onClick={this.showBuyTurn}>Mua Lượt</Button>
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>

				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
				<Dialog
					fullScreen={false}
					open={this.state.dialogMoreTurnOpen}
					onClose={this.handleCloseMoreTurnDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Bạn đã hết lượt quay</span></DialogTitle>
					<DialogContent>
						<div style={{ color: "#fff" }}>
							Mua thêm lượt quay để tiếp tục
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.showBuyTurn} style={{
								borderRadius: "20px",
								background: "linear-gradient(90deg,#ff5f27,#ff9019)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minWidth: "auto",
								minHeight: "auto"
							}}>
								Mua lượt
              </Button>
							<Button onClick={this.handleCloseMoreTurnDialog} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.dialogOpen}
					onClose={this.handleCloseDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Mua lượt</span></DialogTitle>
					<DialogContent>
						<List className="lucky-detail-root">
							{this.props.dataDetail.settings.map((obj, key) => (
								<ListItem key={key}>
									<ListItemText primary={obj.intValue + " Lượt"} secondary={(
										<span className="global-thit"><span style={{ color: "#fe8731" }} >{obj.intValue * this.props.dataDetail.luckyspin.pricePerSpin + " thịt"}</span> <img alt="just alt"
											src="../thit.png" /></span>)} />
									<div className="lucky-button">
										<Button style={{
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minWidth: "auto",
											minHeight: "auto"
										}} onClick={() => this.buyTurn(obj.intValue)}>Mua</Button>
									</div>
								</ListItem>
							))}
						</List>
					</DialogContent>
					<DialogActions>
						<div><span className="global-thit"><span style={{ color: "#fe8731" }} >{splayPoint + " thịt"}</span> <img alt="just alt" src="../thit.png" /></span></div>
						<div>
							<Button onClick={this.handleCloseDialog} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
				<Dialog
					open={this.state.dialogItemOpen}
					onClose={this.handleCloseDialogItem}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Phần thưởng</span></DialogTitle>
					<DialogContent>
						<List className="lucky-detail-root">
							{this.props.dataDetail.itemOfSpin.map((obj, key) => (
								<ListItem key={key} style={{ minWidth: "120px" }}>
									<div>
										<img alt="just alt" className="lucky-item-img" src={obj.item.urlImage} />
									</div>
									<ListItemText primary={obj.item.name} />
								</ListItem>
							))}
						</List>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseDialogItem} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
		) : (<div className="global-loading">
			<CircularProgress
				size={50}
			/>
			<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	dataPick: state.lucky.dataPick,
	waiting: state.lucky.waiting,
	dataProfile: state.profile.data,
	dataTurn: state.lucky.dataTurn
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	pickCard,
	buyTurn,
	getData,
	changeTitle,
}, dispatch)

Lucky_detail.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withStyles(styles, { withTheme: true })(Lucky_detail)))