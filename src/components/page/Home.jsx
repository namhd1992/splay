import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Carousel from '../../components/Carousel'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import CheckinIcon from 'material-ui-icons/CheckCircle'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import LikeIcon from 'material-ui-icons/ThumbUp'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Ultilities from '../../Ultilities/global'
import HeadMenu from '../../components/HeadMenu'
import moment from 'moment'
import Hidden from 'material-ui/Hidden'
import Rating from '../../components/Rating'
import Divider from 'material-ui/Divider'
import PopupMission from '../PopupMission'
import '../../styles/mission.css'

const styles = theme => ({
	gridItem: {
		display: "flex",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px",
		backgroundColor: "#232b36",
		justifyContent: "space-between"
	},
	chipRoot: {
		backgroundColor: "#c3c3c3",
		margin: "0px 5px",
		color: "white",
		padding: "0px"
	},
	gameHead: {
		fontWeight: "400",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		color: "#fff",
		textAlign: "center",
		padding: "5px"
	},
	homeBlock: {
		backgroundColor: "transparent",
		width: "100%",
		padding: "0",
		margin: "8px 0px 0px 0px",
		overflow: "hidden",
		borderTop: ".75rem solid #232b36",
	},
	missionBtn: {
		padding: "5px",
		fontSize: "0.8em",
		minWidth: "auto",
		minHeight: "auto"
	},
	missionBtnLabel: {
		whiteSpace: "nowrap",
		color: "white",
	},
	missionBtnLabelGhost: {
		whiteSpace: "nowrap",
	},
	homeHead: {
		borderRadius: "5px",
		padding: "5px",
		overflow: "hidden",
		color: "#fff",
		display: "flex"
	},
	homeTitle: {
		fontSize: "1.2em",
		fontWeight: "400",
		textAlign: "center",
		width: "80%",
		color: "#24b9a9"
	},
	homeLink: {
		textDecoration: "none",
		textAlign: "right",
		width: "10%"
	},
	gameItem: {
		padding: "0px 0px 8px 0px",
		textAlign: "center",
		borderRadius: "5px"
	},
	gameImage: {
		width: "64px"
	},
	gameName: {
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
		color: "#fff",
		fontSize: "0.8em"
	},
	gameHotItem: {
		backgroundColor: "#141e2b",
		overflow: "hidden",
		borderRadius: "5px"
	},
	homeRoot: {},
	giftcodeItem: {
		overflow: "hidden",
		padding: "5px 0px"
	},
	homeBlockLink: {
		color: "gray"
	},
	paper: {
		background: "#2b323d"
	},
	buttonFull:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#22cab5,#3fe28f)",
		minWidth:"88px",
		color: "#fff",
		padding: "8px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
	},
	buttonGhost:{
		borderRadius: "20px",
		background:"#232b36",
		minWidth:"88px",
		color: "#00948d",
		border: "1px solid #00948d",
		padding: "8px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
	},
	buttonCircle:{
		background:"#232b36",
		color: "#12cdd4",
		border: "1px solid #12cdd4",
		padding: "8px 14px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto",
		marginRight:"10px",
		borderRadius: "50%",
		float:"left"
	},
	articleNew:{
		border: "solid 1px #23968c",
		display: "inline-block",
		padding: "5px",
		margin: "2px",
		borderRadius: "5px",
		fontSize: "0.6em",
		color: "#23968c",
		whiteSpace: "nowrap"
	},
	articleEvent:{
		border: "solid 1px #fe8731",
		display: "inline-block",
		padding: "5px",
		margin: "2px",
		borderRadius: "5px",
		fontSize: "0.6em",
		color: "#fe8731",
		whiteSpace: "nowrap"
	}
});


class TitleContainer extends React.Component {

	render() {
		const { title ,classes, link} = this.props;
		return (
			<div style={{width:"100%"}}>
				<Grid item xs={12}>
					<div className={classes.homeHead}>
						<Hidden mdUp>
							<div className={classes.homeLink}></div>
							<div className={classes.homeTitle}><span style={{ color: "#23c9b6", fontWeight: "bold" }}>-</span>{title}<span
								style={{ color: "#23c9b6", fontWeight: "bold" }}>-</span></div>
						</Hidden>
						<Hidden smDown>
							<div className={classes.homeTitle} style={{ textAlign: "left", width: "90%" }}>{title}</div>
						</Hidden>
						<div className={classes.homeLink}><Link to={link}><KeyboardArrowRight
							style={{ color: "#555" }}></KeyboardArrowRight></Link></div>
					</div>
				</Grid>
			</div>
			
		);
	}
  }

  class MissionContainer extends React.Component {

	doMission=(action, id, value, objectGame)=>{
		this.props.doMission(action, id, value, objectGame);
	}

	showDetail=(detail)=>{
		this.props.showDetail(detail);
	}

	reward=(id)=>{
		this.props.reward(id);
	}

	openPopupMission=()=>{
		this.props.handleOpenPopupMission();
	}
	add3Dots=(string, limit)=>{
		var dots = "...";
		if(string.length > limit)
		{
			string = string.substring(0,limit) + dots;
		}

		return string;
	}
		

	render() {
		const {classes, dataMission} = this.props;
		return (
			<div style={{width:"100%"}}>
				{dataMission.slice(0, 8).map((obj, key) => (
					<div className={(obj.actionName === "1") ? "mission": "none"}>
						<div style={{background:"#212933", width:"99%"}}>
							<Grid key={key}> 
								<ListItem key={key} className={classes.giftcodeItem}>
									<Avatar style={{ backgroundColor: "#00c9b7", border: "1px solid #00c9b7" }}>
										{(obj.actionName === "1") ? (
											<img style={{ width: "24px", height: "24px" }} src="../lucky_icon.png"
												alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
										{(obj.actionName === "2") ? (
											<CheckinIcon onClick={() => this.showDetail(obj.description)} />) : (
												<div></div>)}
										{(obj.actionName === "3") ? (
											<img style={{ width: "24px", height: "24px" }} src="../auction_icon.png"
												alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
										{(obj.actionName === "4") ? (
											<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png"
												alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
										{(obj.actionName === "5") ? (
											<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png"
												alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
										{(obj.actionName === "6") ? (
											<LikeIcon onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
									</Avatar>
									<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
										primary={(<div className="mission-title" style={{
											fontWeight: "400",
											color: "#fff",
											whiteSpace: "nowrap",
											overflow: "hidden",
											
										}}>{this.add3Dots(obj.missionName,25)}</div>)}
										secondary={(
											<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
												src="../thit.png" /> {obj.valueAward} </span>)} />
									<div style={{flex:"auto", width:"25%"}}>
										<Button
												className={classes.buttonCircle}
												onClick={() => this.openPopupMission()}>?</Button>
										{(obj.finish && !obj.received) ? (
										<Button onClick={() => this.reward(obj.missionId)}
											className={classes.buttonFull}
												>Nhận</Button>) : (<div></div>)}
										{(!obj.finish && !obj.received) ? (
											<Button
												className={classes.buttonGhost}
												onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameObject)}>Thực hiện</Button>
										) : (<div></div>)}
										{(obj.finish && obj.received) ? (
											<Button className="mission-button disabledbtn"
												classes={{ root: classes.missionBtn, label: classes.missionBtnLabelGhost }}
												style={{ borderRadius: "20px", color: "#fff", padding: "8px", minWidth:"88px" }}
												disabled>Đã nhận</Button>
										) : (<div></div>)}
									</div>
								</ListItem>
							</Grid>
						</div>
					</div>
				))}
			</div>
			
		);
	}
  }


class HomeComponent extends React.Component {

	constructor(){
		super();
		this.state = {
			openPopupMission:false
		};
	}

	handlePointerMove=()=>{
		this.props.handlePointerMove();
	}
	
	handlePointerUp=(url)=>{
		this.props.handlePointerUp(url);
	}
	
	handlePointerDown=()=>{
		this.props.handlePointerDown();
	}
	
	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}

	handleOpenPopupMission=()=>{
		this.setState({openPopupMission:true});
	}
	handleClosePopupMission=()=>{
		this.setState({openPopupMission:false});
	}
	
	loginAction=()=>{
		this.props.loginAction();
	}

	getTheLoai=(obj)=>{
		var tagsList=obj.tagsList;
		var theloai="";
		if (tagsList !== undefined) {
			for(var i=0; i<tagsList.length;i++){
				if (tagsList[i].typeName === "theloai") {
					theloai=tagsList[i].name;
					break;
				}
			};
		}
		return theloai;
	}
	getStatusAuction=(obj)=>{
		var status="";
		var color="";
		var distance=6 * 3600 * 1000;
		var now = moment(new Date());
		var start=obj.fromDate;
		var end=obj.toDate;
		var duration=end-now;
		if (duration > distance && start < now) {
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
		const {data,articleData,dataMission,logged,dialogDetailOpen,dialogContent}=this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		var newGames = [];
		if (data.carousel !== undefined) {
			data.splayGame.map((obj, key) => {
				if (Ultilities.object_exist(obj.tagsList, "name", "NEW")) {
					newGames.push(obj);
				}
			})
			newGames = newGames.slice(0, 6);
		}
		
		return (data.carousel !== undefined) ? (
				<div className={classes.homeRoot + " home-root"}>
					<Grid container style={{width: "100%", margin: "0px",overflow: "hidden",}} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{width: "100%", margin: "0px", overflow: "hidden",}} spacing={8}>
								<Grid item xs={12}>
									<Carousel data={data.carousel[1]}></Carousel>
									<HeadMenu></HeadMenu>
								</Grid>
								<TitleContainer
									classes={classes}
									title="Game Hot"
									link="/game"
								/>
								<Grid item xs={12}>
									<div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
										<div style={{ display: "flex" }}>
											{data.splayGame.map((obj, key) => {
												if (Ultilities.object_exist(obj.tagsList, "name", "HOT")) {
													return (
														<div
															key={key}
															style={{ padding: "0px", marginRight: "10px", cursor: "pointer", position: "relative", width: "250px", paddingTop: "3px", paddingBottom: "3px" }}>
															<a href={"/gamedetail/" + obj.id} target="_blank">
																{(obj.numberGiftcodeOfGame > 0) ? (<div style={{ position: "absolute", width: "32px", height: "50px", top: "0px", right: "10px", backgroundImage: "url(/../giftcodetag.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}></div>) : (<div></div>)}
																<div className={classes.gameHotItem}>
																	<Grid container spacing={8} style={{ margin: "0px", width: "100%" }}>
																		<Grid item xs={12} style={{ padding: "0px" }}>
																			<div style={{
																				backgroundImage: "url(" + obj.bigImage + ")",
																				backgroundSize: "cover",
																				backgroundPostition: "center middle",
																				paddingBottom: "40%",
																				height: "0",
																				width: "250px",
																			}}></div>
																		</Grid>
																		<Grid item xs={12} className={classes.gameHead}
																			style={{ padding: "1px" }}>{obj.name}</Grid>
																		<Grid item xs={12} style={{
																			overflow: "hidden",
																			whiteSpace: "nowrap",
																			color: "gray",
																			padding: "1px",
																			boxSizing: "border-box",
																			textAlign: "center"
																		}}>
																			{obj.tagsList.map((objtag, keytag) => {
																				var textColor = '#000';
																				var bgColor = objtag.backgroundColor;
																				if (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) {
																					textColor = "#151c24";
																				} else {
																					textColor = "#fff";
																				}
																				if (objtag.typeName === "theloai") {
																					return (
																						<div key={keytag} style={{
																							border: "1px solid " + bgColor,
																							display: "inline-block",
																							padding: "2px",
																							margin: "5px",
																							borderRadius: "20px",
																							fontSize: "0.6em",
																							color: bgColor
																						}}>{objtag.name}</div>)
																				}
																				return null;
																			}
																			)}
																		</Grid>
																	</Grid>
																</div>
															</a>
														</div>)
												}
												return null;
											})}
										</div>
									</div>
								</Grid>
							</Grid>
							<Grid container className={classes.homeBlock} spacing={8}>
								<Hidden smDown>
									<Grid item xs={12}>
										<Link to={"./article_detail/129"} >
											<img src="/../1.gif" style={{ width: "100%", borderRadius: "5px" }} />
										</Link>
									</Grid>
								</Hidden>
								<Hidden mdUp>
									<Grid item xs={12}>
										<Link to={"./article_detail/129"} >
											<img src="/../2.gif" style={{ width: "100%", borderRadius: "5px" }} />
										</Link>
									</Grid>
								</Hidden>
							</Grid>
							<Grid container className={classes.homeBlock} spacing={8} justify="center">
								<TitleContainer
									classes={classes}
									title="Game Mới"
									link="/game"
								/>
								{newGames.map((obj, key) => {
									if (Ultilities.object_exist(obj.tagsList, "name", "NEW")) {
										return (
											<Grid key={key} item xs={3} sm={2} md={2} style={{ padding: "0px" }}>
												<Link to={"/gamedetail/" + obj.id} className={classes.homeBlockLink}>
													<div className={classes.gameItem}>
														<div><img className={classes.gameImage} alt="game icon"
															src={obj.defaultImage} /></div>
														<div className={classes.gameName} style={{ width: "64px", margin: "auto" }}>{obj.name}</div>
													</div>
												</Link>
											</Grid>)
									}
									return null;
								}
								)}
							</Grid>
							<Grid container style={{ margin: "0px", width: "100%" }} spacing={8}>
								<TitleContainer
									classes={classes}
									title="Games"
									link="/game"
								/>
								{data.splayGame.slice(0, 8).map((obj, key) => (
									<Grid key={key} item xs={12}>
										<Link to={"/gamedetail/" + obj.id} style={{ textDecoration: "none" }}>
											<ListItem style={{ padding: "8px 0px" }}>
												<div style={{
													backgroundImage: "url(" + obj.defaultImage + ")",
													backgroundSize: "contain",
													width: "64px",
													height: "64px",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													position: "relative",
													overflow: "hidden"
												}}>
												</div>
												<ListItemText style={{ textAlign: "left" }} primary={(<span><b><span style={{ color: secondary.main }}>{obj.name}</span></b>{(obj.subTitle !== "" && obj.subTitle !== null) ? (<span style={{
													"borderRadius": "5px",
													"background": (obj.subTitle === "NEW") ? "#24b9a9" : "#fe8731",
													"color": "white",
													"padding": "0px 5px",
													"marginLeft": "5px",
												}}>{obj.subTitle}</span>) : (<span></span>)}</span>)}
													secondary={(<span>{"Hơn " + obj.downloadTurns + " lượt tải"}<br />
													<div style={{marginTop:"5px"}}>
														<Rating point={obj.pointReview}></Rating>
														<span style={{
																marginLeft:"20px",
																fontSize:"11px",
																border: "1px solid #23c9b6",
																padding:"1px 2px",
																borderRadius: "20px"}}>
																<label style={{color:"#23c9b6"}}>{this.getTheLoai(obj)}</label>
														</span>
														</div>
													</span>)} />
												<Button className={classes.buttonGhost}>Chơi</Button>
											</ListItem>
										</Link>
										<Divider />
									</Grid>
								))}
								<Grid item xs={12}>
									<div style={{ textAlign: "center" }}>
										<Link to="/game">
											<Button
												style={{
													borderRadius: "20px",
													background: "transparent",
													color: "#fff",
													padding: "8px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minWidth: "auto",
													minHeight: "auto"
												}}>Xem thêm</Button>
										</Link>
									</div>
								</Grid>
							</Grid>
							<Hidden mdUp>
								<Grid container className={classes.homeBlock} spacing={8}>
									<TitleContainer
										classes={classes}
										title="Giftcode"
										link="/giftcode"
									/>
									{data.splayGiftcodeWeb.map((obj, key) => {
										return (obj.giftcodeEvent.showing === 2 || obj.giftcodeEvent.showing === 3) ? (
											<Grid key={key} item xs={12}>
												<Link to={"/giftcodedetail/" + obj.giftcodeEvent.id}>
													<ListItem key={key} className={classes.giftcodeItem}>
														<div className="giftcode-item-image">
															<div style={{
																backgroundImage: "url(" + obj.defaultImage + ")",
																backgroundSize: "contain",
																width: "64px",
																height: "64px",
																backgroundPosition: "center",
																backgroundRepeat: "no-repeat"
															}}></div>
														</div>
														<ListItemText disableTypography={true}
															primary={(<div style={{
																fontWeight: "400",
																color: "#fff",
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis"
															}}>{obj.title}</div>)}
															secondary={(
																<span style={{ color: "#666", fontSize: "0.8em" }}
																	className="giftcode-item-left">{"Số lượng " + obj.giftcodeEvent.numberGiftcode}</span>)} />
														<div>
															<Button color="primary" className={classes.buttonGhost}>
																Chi tiết
															</Button>
														</div>
													</ListItem>
												</Link>
											</Grid>
										) : (<div key={key}></div>)
									})}
								</Grid>
								<Grid container style={{ margin: "16px 0px", width: "100%" }} spacing={16}>
									<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", borderRadius: "15px", padding: "15px", border: "solid 1px #333", color: "#fff" }}>
										<span style={{ marginTop: "5px" }}>Thiếu <span className="global-thit" style={{ color: "#fe8731" }}> <img alt="just alt" src="../thit.png" /> Thịt </span> để tham gia hoạt động?	</span><Link to={"./article_detail/129"} >
											<Button className={classes.buttonFull}>Nhận ngay</Button></Link>
									</Grid>
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8} justify="center">
									<Grid item xs={12}>
										<div className={classes.homeHead}>
											<div className={classes.homeLink}></div>
											<div className={classes.homeTitle}><span style={{ color: "#23c9b6", fontWeight: "bold" }}>-</span> Tin tức <span
												style={{ color: "#23c9b6", fontWeight: "bold" }}>-</span></div>
											<div className={classes.homeLink}><Link to="/article"><KeyboardArrowRight
												style={{ color: "#555" }}></KeyboardArrowRight></Link></div>
										</div>
									</Grid>
									<Grid item xs={12}>
										{articleData.map((obj, key) => {
											return (
												<ListItem key={key} style={{ padding: "10px 0px" }}>
													{(obj.articleType == "event") ? (<div className={classes.articleEvent}>Sự kiện</div>) : (<div className={classes.articleNew}>Tin tức</div>)}
													<ListItemText style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontSize: "0.8em" }} disableTypography={true} primary={(<span><Link style={{ color: "#fff" }} to={"/article_detail/" + obj.id} className={classes.homeBlockLink}>
														{(obj.splayGameName !== "" && obj.splayGameName !== null) ? "[" + obj.splayGameName + "]" : ""} {obj.title}
													</Link></span>)} ></ListItemText>
													<span style={{ color: "#555", fontSize: "0.8em" }}>
														{moment(new Date(obj.createOn)).format("DD.MM")}
													</span>
												</ListItem>)
										}
										)}
									</Grid>
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8}>
									<TitleContainer
										classes={classes}
										title="Đấu Giá"
										link="/auction"
									/>
									<Grid item xs={12} style={{ overflow: "hidden" }}>
										<div style={{ borderRadius: "5px" }}>
											<Grid container spacing={8} >
												{data.auction.slice(0, 4).map((obj, key) => (
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
											</Grid>
										</div>
									</Grid>
								</Grid>
								{(logged) ? (<Grid container className={classes.homeBlock} spacing={8}>
									<TitleContainer
										classes={classes}
										title="Nhiệm Vụ"
										link="/mission"
									/>
									<MissionContainer
										dataMission={dataMission}
										classes={classes}
										showDetail={this.props.showDetail}
										reward={this.props.reward}
										doMission={this.props.doMission}
										handleOpenPopupMission={this.handleOpenPopupMission}
									/>
	
									<Dialog
										fullScreen={false}
										open={dialogDetailOpen}
										onClose={this.handleCloseDialogDetail}
										aria-labelledby="responsive-dialog-title"
										classes={{ paper: classes.paper }}
									>
										<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>Chi tiết nhiệm vụ</span></DialogTitle>
										<DialogContent>
											<div style={{ color: "#fff" }}>
												{dialogContent}
											</div>
										</DialogContent>
										<DialogActions>
											<div>
												<Button onClick={this.handleCloseDialogDetail} style={{ color: "#fe8731" }}>
													Đóng
					  							</Button>
											</div>
										</DialogActions>
									</Dialog>
								</Grid>) : (<div></div>)}
							</Hidden>
						</Grid>
						<Hidden smDown>
							<Grid item xs={4}>
								{(logged) ? (
									<Grid container spacing={8}>
										<TitleContainer
											classes={classes}
											title="Nhiệm Vụ"
											link="/mission"
										/>
										<MissionContainer
											dataMission={dataMission}
											classes={classes}
											showDetail={this.props.showDetail}
											reward={this.props.reward}
											doMission={this.props.doMission}
											handleOpenPopupMission={this.handleOpenPopupMission}
										/>
										<Dialog
											fullScreen={false}
											open={dialogDetailOpen}
											onClose={this.handleCloseDialogDetail}
											aria-labelledby="responsive-dialog-title"
											classes={{ paper: classes.paper }}
										>
											<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>Chi tiết nhiệm vụ</span></DialogTitle>
											<DialogContent>
												<div style={{ color: "#fff" }}>
													{dialogContent}
												</div>
											</DialogContent>
											<DialogActions>
												<div>
													<Button onClick={this.handleCloseDialogDetail} style={{ color: "#fe8731" }}>
														Đóng
													</Button>
												</div>
											</DialogActions>
										</Dialog>
									</Grid>
								) : (
										<Grid container style={{ margin: "16px 0px", width: "100%" }} spacing={16}>
											<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", borderRadius: "15px", padding: "15px", border: "solid 1px #333", color: "#fff" }}>
												<span style={{ marginTop: "5px" }}>
													Đăng nhập để nhận nhiệm vụ
												</span>
												<Button
													style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#fe8731,#ff984e)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto",
														padding: "8px"
													}}
													onClick={this.loginAction}
												>Đăng nhập</Button>
											</Grid>
										</Grid>
									)}
	
								<Grid container style={{ margin: "16px 0px", width: "100%" }} spacing={16}>
									<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", borderRadius: "15px", padding: "15px", border: "solid 1px #333", color: "#fff" }}>
										<span style={{ marginTop: "5px" }}>Thiếu
											<span className="global-thit" style={{ color: "#fe8731" }}>
												<img alt="just alt" src="../thit.png" /> Thịt
											</span> để tham gia hoạt động?
										</span>
										<Link to={"./article_detail/129"} ><Button className={classes.buttonFull}>Nhận ngay</Button></Link>
									</Grid>
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8}>
									<TitleContainer
										classes={classes}
										title="Giftcode"
										link="/giftcode"
									/>
									{data.splayGiftcodeWeb.map((obj, key) => {
										return (obj.giftcodeEvent.showing === 2 || obj.giftcodeEvent.showing === 3) ? (
											<Grid key={key} item xs={12}>
												<Link to={"/giftcodedetail/" + obj.giftcodeEvent.id}>
													<ListItem key={key} className={classes.giftcodeItem}>
														<div className="giftcode-item-image">
															<div style={{
																backgroundImage: "url(" + obj.defaultImage + ")",
																backgroundSize: "contain",
																width: "64px",
																height: "64px",
																backgroundPosition: "center",
																backgroundRepeat: "no-repeat"
															}}></div>
														</div>
														<ListItemText disableTypography={true}
															primary={(<div style={{
																fontWeight: "400",
																color: "#fff",
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis"
															}}>{obj.title}</div>)}
															secondary={(
																<span style={{ color: "#666", fontSize: "0.8em" }}
																	className="giftcode-item-left">{"Số lượng " + obj.giftcodeEvent.numberGiftcode}</span>)} />
														<div>
															<Button color="primary" className={classes.buttonGhost}>
																Chi tiết
															</Button>
														</div>
													</ListItem>
												</Link>
											</Grid>
										) : (<div key={key}></div>)
									})}
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8} justify="center">
									<TitleContainer
										classes={classes}
										title="Tin Tức"
										link="/article"
									/>
									<Grid item xs={12}>
										{articleData.map((obj, key) => {
											return (
												<ListItem key={key} style={{ padding: "10px 0px" }}>
													{(obj.articleType == "event") ? (<div style={{
														border: "solid 1px #fe8731",
														display: "inline-block",
														padding: "5px",
														margin: "2px",
														borderRadius: "5px",
														fontSize: "0.6em",
														color: "#fe8731",
														whiteSpace: "nowrap"
													}}>Sự kiện</div>) : (<div style={{
														border: "solid 1px #24b9a9",
														display: "inline-block",
														padding: "5px",
														margin: "2px",
														borderRadius: "5px",
														fontSize: "0.6em",
														color: "#24b9a9",
														whiteSpace: "nowrap"
													}}>Tin tức</div>)}
													<ListItemText style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontSize: "0.8em" }} disableTypography={true} primary={(<span><Link style={{ color: "#fff" }} to={"/article_detail/" + obj.id} className={classes.homeBlockLink}>
														{(obj.splayGameName !== "" && obj.splayGameName !== null) ? "[" + obj.splayGameName + "]" : ""} {obj.title}
													</Link></span>)} ></ListItemText>
													<span style={{ color: "#555", fontSize: "0.8em" }}>
														{moment(new Date(obj.createOn)).format("DD.MM")}
													</span>
												</ListItem>)
										}
										)}
									</Grid>
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8}>
									<TitleContainer
										classes={classes}
										title="Đấu Giá"
										link="/auction"
									/>
									<Grid item xs={12} style={{ overflow: "hidden" }}>
										<div style={{ borderRadius: "5px" }}>
											<Grid container spacing={8} >
												{data.auction.slice(0, 4).map((obj, key) => (
													<Grid key={key} item xs={12} >
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
											</Grid>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</Hidden>
					</Grid>
					<PopupMission
						handleClosePopupMission={this.handleClosePopupMission}
						openPopupMission={this.state.openPopupMission}
					/>
				</div >
			) :
				(<Grid item xs={12} style={{ marginTop: "8px" }}>
					<div className="global-loadmore">
						<CircularProgress style={{ color: "#fff" }} size={50} />
					</div>
					<PopupMission
						handleClosePopupMission={this.handleClosePopupMission}
						openPopupMission={this.state.openPopupMission}
					/>
				</Grid>
		)
	}
}

HomeComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
	theme: PropTypes.object.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(HomeComponent)))