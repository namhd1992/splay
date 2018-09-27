import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/auction'
import {
	getData as getShopItemGiftcodeData,
	getMoreData as getMoreShopItemGiftcodeData
} from '../../modules/shopItemGiftcode'
import {
	getData as getShopItemData,
	getMoreData as getMoreShopItemData
} from '../../modules/shopItem'
import {
	getData as getAllData,
	getMoreData as getMoreAllData
} from '../../modules/itemAndAuction'
import {
	getData as getProfileData
} from '../../modules/profile'
import {
	getData as getGameData,
} from '../../modules/game'
import { getData as getArticleData } from '../../modules/article'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import { Avatar } from 'material-ui'
import { ListItem, ListItemText } from 'material-ui/List'
import { withTheme } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import LoginRequired from '../../components/LoginRequired'
import Notification from '../../components/Notification'
import PropTypes from 'prop-types'
import Hidden from 'material-ui/Hidden'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import moment from 'moment'
import Divider from 'material-ui/Divider'
import Rating from '../../components/Rating'
import Button from 'material-ui/Button'
import RightArea from '../../components/RightArea'

const styles = theme => ({
	root: {
		margin: "8px 0px",
		borderRadius: "5px",
		width: "100%"
	},
	gridItem: {
		display: "flex",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px",
		backgroundColor: "#232b36",
		justifyContent: "space-between"
	},
	gridLink: {
		textDecoration: "none",
	}
});

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: "0px", paddingTop: "10px" }}>
			{props.children}
		</Typography>
	);
}

class Auction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			limitShopItem: 12,
			offsetShopItem: 0,
			limitShopItemGiftcode: 12,
			offsetShopItemGiftcode: 0,
			limitAll: 12,
			offsetAll: 0,
			auctionList: [],
			socket: null,
			loadedRecords: 0,
			loadedRecordsShopItemGiftcode: 0,
			loadedRecordsShopItem: 0,
			loadedRecordsAll: 0,
			value: 0,
			dialogLoginOpen: false,
			allGame: [],
			allArticles: [],
		};
	}

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("SHOP");
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getProfileData(user.access_token, user.scoinAccessToken);
			this.props.getData(this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
			this.props.getShopItemData(this.state.limitShopItem, this.state.offsetShopItem).then(function () {
				_this.setState({ loadedRecordsShopItem: _this.state.limitShopItem + _this.state.offsetShopItem });
			});
			this.props.getShopItemGiftcodeData(this.state.limitShopItemGiftcode, this.state.offsetShopItemGiftcode).then(function () {
				_this.setState({ loadedRecordsShopItemGiftcode: _this.state.limitShopItemGiftcode + _this.state.offsetShopItemGiftcode });
			});
			this.props.getAllData(this.state.limitAll, this.state.offsetAll).then(function () {
				_this.setState({ loadedRecordsAll: _this.state.limitAll + _this.state.offsetAll });
			});
			_this.props.getGameData(12, 0, "", "", "").then(function () {
				_this.setState({ allGame: _this.props.gameData });
			});
			_this.props.getArticleData(6, 0, undefined, undefined, undefined).then(function () {
				_this.setState({ allArticles: _this.props.articleData });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	loadMoreShopItemAction = () => {
		var _this = this;
		var newOffset = this.state.limitShopItem + this.state.offsetShopItem;
		this.props.getMoreShopItemData(this.state.limitShopItem, newOffset);
		this.setState({
			offsetShopItem: newOffset,
			loadedRecordsShopItem: _this.state.limitShopItem + newOffset
		});
	}

	loadMoreShopItemGiftcodeAction = () => {
		var _this = this;
		var newOffset = this.state.limitShopItemGiftcode + this.state.offsetShopItemGiftcode;
		this.props.getMoreShopItemGiftcodeData(this.state.limitShopItemGiftcode, newOffset);
		this.setState({
			offsetShopItemGiftcode: newOffset,
			loadedRecordsShopItemGiftcode: _this.state.limitShopItemGiftcode + newOffset
		});
	}

	loadMoreAllAction = () => {
		var _this = this;
		var newOffset = this.state.limitAll + this.state.offsetAll;
		this.props.getMoreAllData(this.state.limitAll, newOffset);
		this.setState({
			offsetAll: newOffset,
			loadedRecordsAll: _this.state.limitAll + newOffset
		});
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	getStatusAuction=(obj)=>{
		var status="";
		var color="";
		var distance=6 * 3600 * 1000;
		var now=Date.now();
		var end=obj.toDate;
		var duration=end-now;
		if (duration > distance) {
			status = "ĐANG DIỄN RA";
			color="#00e24d";
		}
		if (duration < distance) {
			status = "SẮP KẾT THÚC";
			color="#de352f";
		}
		if (duration < 0) {
			status = "HẾT HẠN";
			color="#888787";
		}
		return {status,color};
	}
	render() {
		const { classes } = this.props;
		const { fullScreen } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { value } = this.state;
		return (
			<div className={classes.root}>
				<HeadMenu></HeadMenu>
				<Grid container spacing={8} style={{ width: "100%", margin: "0px" }}>
					<Grid item xs={12} md={8}>
						<Grid container justify="center" style={{ marginBottom: "10px" }} spacing={8}>
							<Grid item xs={12} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar src={"../default_ava.png"} ></Avatar>
									<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{this.props.profileData.fullName}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(this.props.profileData.splayPoint) ? this.props.profileData.splayPoint.toLocaleString() : "0"}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../scoin.png"><img style={{ maxWidth: "100%" }} src="../scoin.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(this.props.profileData.splayPoint) ? this.props.profileData.scoinBalance.toLocaleString() : "0"}</div>
								</ListItem>
							</Grid>
							<Grid item xs={3} style={{ textAlign: "center" }}>
								<Link className={classes.link} to='/checkin'>
									<img src="../diemdanh_new.png" style={{ width: "100%", maxWidth: "128px" }} />
								</Link>
							</Grid>
							<Grid item xs={3} style={{ textAlign: "center" }}>
								<Link className={classes.link} to='/mission'>
									<img src="../nhiemvu_new.png" style={{ width: "100%", maxWidth: "128px" }} />
								</Link>
							</Grid>
							<Grid item xs={3} style={{ textAlign: "center" }}>
								<Link className={classes.link} to='/lucky'>
									<img src="../mayman_new.png" style={{ width: "100%", maxWidth: "128px" }} />
								</Link>
							</Grid>
							<Grid item xs={3} style={{ textAlign: "center" }}>
								<Link className={classes.link} to='/history'>
									<img src="../homthu_new.png" style={{ width: "100%", maxWidth: "128px" }} />
								</Link>
							</Grid>
						</Grid>
						<Grid container spacing={8} justify="center" style={{ borderTop: ".75rem solid #232b36" }}>
							<Grid item xs={12}>
								<AppBar
									style={{ background: "transparent", boxShadow: "none", color: "#fff" }}
									position="static">
									<Toolbar style={{ display: "block", minHeight: "auto", padding: "5px", margin: "0px", background: "transparent" }}>
										<Tabs indicatorColor={secondary.main} value={value} onChange={this.handleChange}>
											<Tab label="Tất cả" />
											<Tab label="Code" />
											<Tab label="Đấu giá" />
											<Tab label="In Game" />
										</Tabs>
									</Toolbar>
								</AppBar>
								{value === 0 && <TabContainer style={{
									padding: "0px"
								}}>
									{(this.props.dataAll.length <= 0 && !this.props.waitingAll) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8}>
										{this.props.dataAll.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={(obj.objectType === "auction") ? "/auctiondetail/" + obj.id : "itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#fff",
																padding: "5px"
															}}>{obj.name}</div>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#000",
																padding: "5px"
															}}><img src={(obj.objectType === "auction") ? "../thit.png" : "../scoin.png"} style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.price.toLocaleString()}</span></div>
														</div>
														<div style={{
															width: "80px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(this.props.waitingAll) ? (<Grid item xs={12}>
											<div className="global-loading"><CircularProgress
												size={50}
											/></div>
										</Grid>) : (this.props.totalRecordsAll > this.state.loadedRecordsAll) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreAllAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
								{value === 1 && <TabContainer style={{
									padding: "0px"
								}}>
									{(this.props.dataShopItemGiftcode.length <= 0 && !this.props.waitingShopItemGiftcode) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{this.props.dataShopItemGiftcode.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#fff",
																padding: "5px"
															}}>{obj.name}</div>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#000",
																padding: "5px"
															}}><img src="../scoin.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.priceScoin.toLocaleString()}</span></div>
														</div>
														<div style={{
															width: "80px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(this.props.waitingShopItemGiftcode) ? (<Grid item xs={12}>
											<div className="global-loading"><CircularProgress
												size={50}
											/></div>
										</Grid>) : (this.props.totalRecordsShopItemGiftcode > this.state.loadedRecordsShopItemGiftcode) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreShopItemGiftcodeAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
								{value === 2 && <TabContainer style={{
									padding: "0px"
								}}>
									{(this.props.data.length <= 0 && !this.props.waiting) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{this.props.data.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/auctiondetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#fff",
																padding: "5px"
															}}>{obj.name}</div>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#000",
																padding: "5px"
															}}><img src="../thit.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.topPrice.toLocaleString()}</span></div>
															<div className="auction-name" style={{
																	textAlign: "left",
																	width: "100%",
																	overflow: "hidden",
																	fontSize:"11px",
																	textOverflow: "ellipsis",
																	whiteSpace: "nowrap",
																	color: this.getStatusAuction(obj).color,
																	padding: "5px"
																}}>{this.getStatusAuction(obj).status}</div>
														</div>
														<div style={{
															width: "80px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(this.props.waiting) ? (<Grid item xs={12}>
											<div className="global-loading"><CircularProgress
												size={50}
											/></div>
										</Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
								{value === 3 && <TabContainer style={{
									padding: "0px"
								}}>
									{(this.props.dataShopItem.length <= 0 && !this.props.waitingShopItem) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{this.props.dataShopItem.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#fff",
																padding: "5px"
															}}>{obj.name}</div>
															<div className="auction-name" style={{
																textAlign: "left",
																width: "100%",
																overflow: "hidden",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																color: "#000",
																padding: "5px"
															}}><img src="../scoin.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.priceScoin.toLocaleString()}</span></div>
														</div>
														<div style={{
															width: "80px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(this.props.waitingShopItem) ? (<Grid item xs={12}>
											<div className="global-loading"><CircularProgress
												size={50}
											/></div>
										</Grid>) : (this.props.totalRecordsShopItem > this.state.loadedRecordsShopItem) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreShopItemAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	gameData: state.game.data,
	articleData: state.article.data,
	data: state.auction.data,
	waiting: state.auction.waiting,
	totalRecords: state.auction.totalRecords,
	profileData: state.profile.data,
	profileWaiting: state.profile.waiting,
	dataShopItemGiftcode: state.shopItemGiftcode.data,
	waitingShopItemGiftcode: state.shopItemGiftcode.waiting,
	totalRecordsShopItemGiftcode: state.shopItemGiftcode.totalRecords,
	dataShopItem: state.shopItem.data,
	waitingShopItem: state.shopItem.waiting,
	totalRecordsShopItem: state.shopItem.totalRecords,
	dataAll: state.itemAndAuction.data,
	waitingAll: state.itemAndAuction.waiting,
	totalRecordsAll: state.itemAndAuction.totalRecords,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getArticleData,
	getGameData,
	getData,
	getMoreData,
	getShopItemGiftcodeData,
	getMoreShopItemGiftcodeData,
	getShopItemData,
	getMoreShopItemData,
	getAllData,
	getMoreAllData,
	getProfileData,
	changeTitle
}, dispatch)

Auction.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(Auction)))