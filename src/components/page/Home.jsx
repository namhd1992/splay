import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Carousel from '../../components/Carousel'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import ReactResizeDetector from 'react-resize-detector'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import Modal from 'material-ui/Modal';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Ultilities from '../../Ultilities/global'
import HeadMenu from '../../components/HeadMenu'
import moment from 'moment'
import Hidden from 'material-ui/Hidden'
import Rating from '../../components/Rating'
import Divider from 'material-ui/Divider'
import PopupMission from '../PopupMission'
import '../../styles/home.css'
import '../../styles/imageServerError.css'

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
});

function intervalTrigger(arr, key){
	var count = 0;
	var arrColor=['#b92e2e','#00c9b7'];
	return setInterval(function() {
		if (count >= arr.length) count = 0;
		var rand = arr[count];
		var color=arrColor[count];
		document.getElementById("home"+key).src = rand;
		document.getElementById("imgHome"+key).style.backgroundColor=color
		count=count+1;
	}, 1000); 
}

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
	
	
	doMission=(action, id, value, scoinGameId,condition)=>{
		if(condition===false){
			this.props.showDetail("Rất tiếc bạn không đủ điều kiện nhận thưởng.", "");
		}else{
			this.props.doMission(action, id, value, scoinGameId);
		}
	}

	showDetail=(detail, title)=>{
		this.props.showDetail(detail, title);
	}

	reward=(id)=>{
		this.props.reward(id);
	}

	openPopupMission=(obj)=>{
		this.props.handleOpenPopupMission(obj);
	}
	add3Dots=(string, limit)=>{
		var dots = "...";
		if(string.length > limit)
		{
			string = string.substring(0,limit) + dots;
		}

		return string;
	}
	getSrcImage(obj, key){
		var arr=["../hot_1.png" ,"../lucky_icon.png", "../check_icon.png", "../auction_icon.png", "../giftcode_icon.png", "../check_level_icon.png", "../like_icon.png", "../share_icon.png"];
		var src="";
		if(obj.highLights === true){
			
			if(obj.actionName === "1"){
				var list=[arr[0],arr[1]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "2"){
				var list=[arr[0],arr[2]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "3"){
				var list=[arr[0],arr[3]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "6"){
				var list=[arr[0],arr[6]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "7"){
				var list=[arr[0],arr[7]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "8"){
				var list=[arr[0],arr[5]];
				intervalTrigger(list, key);
			}else if(obj.actionName === "4" || obj.actionName === "5" || obj.actionName === "9" || obj.actionName === "10"){
				var list=[arr[0],arr[4]];
				intervalTrigger(list, key);
			}
			
		}else{
			if(obj.actionName === "1"){
				src=arr[1];
			}else if(obj.actionName === "2"){
				src=arr[2];
			}else if(obj.actionName === "3"){
				src=arr[3];
			}else if(obj.actionName === "6"){
				src=arr[6];
			}else if(obj.actionName === "7"){
				src=arr[7];
			}else if(obj.actionName === "8"){
				src=arr[5];
			}else if(obj.actionName === "4" || obj.actionName === "5" || obj.actionName === "9" || obj.actionName === "10"){
				src=arr[4];
			}
			return src;
		}
		
	}
	setId(key){
		return "imgHome"+key;
	}
	setIdImg(key){
		return "home"+key;
	}
		

	render() {
		const {classes, dataMission} = this.props;
		var data;
		if(dataMission!==undefined){
			data=dataMission.sort((a, b) => (a.fromDate > b.fromDate ? -1 : 1));
		}
		return (
			<div className="mission_home_container">
				{data.slice(0, 8).map((obj, key) => (
					// <div className={(obj.highLights === true) ? "mission": ""}>
						<div className="mission_home_content">
							<Grid key={key}> 
								<ListItem key={key} className={classes.giftcodeItem}>
									{/* <div className={(obj.highLights === true) ? "highLights": ""}> */}
										<div id={this.setId(key)} className="avatar">
											{/* {(obj.actionName === "1") ? ( */}
												<img className="img_avatar" src={this.getSrcImage(obj,key)}
													id={this.setIdImg(key)}
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />
													{/* ) : (<div></div>)} */}
											{/* {(obj.actionName === "2") ? (
												<img  className="img_avatar" src="../check_icon.png"
													alt="just alt"
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (
													<div></div>)}
											{(obj.actionName === "3") ? (
												<img className="img_avatar" src="../auction_icon.png"
													alt="just alt"
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "4" || obj.actionName === "5" || obj.actionName === "9" || obj.actionName === "10") ? (
												<img className="img_avatar" src="../giftcode_icon.png"
													alt="just alt"
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "6") ? (
												<LikeIcon onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)} */}
										</div>
									{/* </div> */}
									{(obj.award === "Thịt") ? (
									<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
										primary={(<div className="mission_home_title">{obj.missionName}</div>)}
										secondary={(
											<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
												src="../thit.png" /> <span className="valueBonus">{obj.valueAward}</span>{(obj.awardAvailable !== null) ? ( <span className="numberBonus">Còn lại hôm nay: {obj.awardAvailable}</span>) : (<div></div>)} </span>)} />) : (<div></div>)}
									{(obj.award === "giftcode") ? (
									<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
										primary={(<div className="mission_home_title">{obj.missionName}</div>)}
										secondary={(
											<span className="global-thit" style={{ color: "#fe8731" }}><span className="valueBonus">Giftcode</span>{(obj.awardAvailable !== null) ? ( <span className="numberBonus">Còn lại hôm nay: {obj.awardAvailable}</span>) : (<div></div>)} </span>)} />) : (<div></div>)}
									{(obj.award === "XO") ? (
									<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
										primary={(<div className="mission_home_title">{obj.missionName}</div>)}
										secondary={(
											<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
												src="../XO.png" /> <span className="valueBonus">{obj.valueAward}</span>{(obj.awardAvailable !== null) ? ( <span className="numberBonus">Còn lại hôm nay: {obj.awardAvailable}</span>) : (<div></div>)} </span>)} />) : (<div></div>)}
								
									<div className="mission_home_action">
										<button
												className="buttonCircle"
												onClick={() => this.openPopupMission(obj)}>?</button>
										{(obj.finish && !obj.received && obj.missionStatus ==="active" && obj.awardAvailable !==0) ? (
										<button onClick={() => this.reward(obj.missionId)}
											className="buttonFull"
												>Nhận</button>) : (<div></div>)}
										{(!obj.finish && !obj.received && obj.missionStatus ==="active" && obj.awardAvailable !==0) ? (
											<button
												className="buttonGhost"
												onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameId,obj.condition)}>Thực Hiện</button>
										) : (<div></div>)}
										{(obj.finish && obj.received && obj.missionStatus ==="active") ? (
											<Button style={{ color: "#888787",textTransform:"none" }} disabled>
												Đã Nhận
											</Button>
											// <button className="received" disabled>Đã nhận</button>
										) : (<div></div>)}
										{(obj.awardAvailable ===0 && obj.missionStatus ==="active") ? (
											<Button style={{ color: "#888787",textTransform:"none" }} disabled>
												Đã Hết
											</Button>
											// <button className="received" disabled>Đã hết</button>
										) : (<div></div>)}
										{(obj.missionStatus ==="inactive") ? (
											<Button style={{ color: "#888787",textTransform:"none" }} disabled>
												Hết Hạn
											</Button>
											// <button className="received" disabled>Hết hạn</button>
										) : (<div></div>)}
									</div>
								</ListItem>
							</Grid>
						</div>
					// </div>
				))}
			</div>
			
		);
	}
  }


class HomeComponent extends React.Component {

	constructor(){
		super();
		this.state = {
			openPopupMission:false,
			compact:false,
			speed:10,
			add:true,
			close:'block',
			open:true,
		};
	}

	componentWillMount(){
		if (document.body.offsetWidth < 768) {
			this.setState({ compact: true });
		} else {
			this.setState({ compact: false });
		}
	}
	componentDidMount(){
		document.addEventListener('click',function(e){
			if(e.target && e.target.id== 'eventRun'){
				var win = window.open("http://171.244.14.215:2999/", '_blank');
				win.focus();
			}
		 })
	}

	onResize=()=>{
		if (document.body.offsetWidth < 768) {
			this.setState({ compact: true });
		} else {
			this.setState({ compact: false });
		}
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

	handleOpenPopupMission=(obj)=>{
		this.setState({openPopupMission:true, dataMission:obj});
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
	getString=()=> {
		var output = document.getElementById("event");
		var event='<img style="inline-size:9%; margin-bottom:-3px" src="./lg-topgame.png" /><span style="color:#c3736f">Săn Xu đua Top kiếm QÙA KHỦNG chỉ có tại TOPGame! </span><span id="eventRun" style="color:#93bbe8; cursor:pointer"> Chơi ngay</span>';
		// for (let i = 0; i < obj.length; i++) {
		// 	bonus+='<span>Chúc mừng <span style="color:#00bf98">'+ obj[i].userName+'</span>'+' vừa giành được '+ '<span style="color:#ff9d42">'+ obj[i].itemName+'</span>'+' từ sự kiện ' +'<span style="color:#00bf98">'+ obj[i].eventName+'.'+'</span></span>&nbsp;&nbsp;&nbsp;&nbsp;'
		// }
		if(output!==null && this.state.add){
			this.setState({add:false})
			output.insertAdjacentHTML('beforeend',event)
		}
	}

	closeMarquee=()=>{
		this.setState({close:'none'})
	}
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	openGame=()=> {
        var win = window.open("http://171.244.14.215:2999/", '_blank');
		win.focus();
		this.setState({ open: false });
    }
	render() {
		const {data,articleData,dataMission,logged,dialogDetailOpen,dialogContent,server,title_dialog}=this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		var newGames = [];
		var sizeImgGame="";
		var fontsize="";
		if (data.carousel !== undefined) {
			this.getString();
			data.splayGame.map((obj, key) => {
				if (Ultilities.object_exist(obj.tagsList, "name", "NEW")) {
					newGames.push(obj);
				}
			})
			if(this.state.compact){
				newGames = newGames.slice(0, 5);
				sizeImgGame="40px";
				fontsize="12px";
			}else{
				newGames = newGames.slice(0, 6);
				sizeImgGame="64px";
				fontsize="15px";
			}
			
		}
		
		return (data.carousel !== undefined) ? (

				<div className={classes.homeRoot + " home-root"}>
					<Grid container style={{width: "100%", margin: "0px",overflow: "hidden",}} spacing={8}>
						<Grid item xs={12}>
							<div style={{display:this.state.close, background:'#f4dede', height:'40px', marginLeft:'3px', borderRadius:'5px', border:'1px solid #d98c8c'}}>
								<div className="marquee_home">
									<marquee id="event" scrollamount={this.state.speed} direction="left">
									</marquee>
								</div>
								<div>
									<img className="closeMarquee" alt="just alt" src="../close.png" onClick={this.closeMarquee}/>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} md={8}>
							<Grid container style={{width: "100%", margin: "0px", overflow: "hidden",}} spacing={8}>
								<Grid item xs={12}>
									<Carousel data={data.carousel[1]}></Carousel>
									<HeadMenu></HeadMenu>
								</Grid>
								<Grid item xs={12} >
									<div style={{border:"1px solid #f23b32", borderRadius:"5px", cursor: "pointer", padding:'5px'}}>
										<Link to={"./chongame"} >
											<div style={{height:"40px"}}>
												{/* <div style={{width:"40%", float:"left"}}>
													<img className="imgLogoGame" src="../lg-topgame.png"/>
												</div> */}
												<div style={{lineHeight:"40px", textAlign:'center'}}>
													<p style={{display:"inline"}}><span style={{color:"#f23b32"}}>[ĐẶC BIỆT]</span><span  style={{color:"#ffffff"}}> Đổi Xu/ Nạp game từ ví Xu</span></p>
												</div>
											</div>
										</Link>
									</div>
								</Grid>
								<Grid container className={classes.homeBlock} spacing={8}>
									<Hidden smDown>
										<Grid item xs={12}>
											<Link to={"./article_detail/129"}>
												<img src="/../1.gif" style={{ width: "100%", borderRadius: "5px" }} />
											</Link>
										</Grid>
									</Hidden>
									<Hidden mdUp>
										<Grid item xs={12}>
											<Link to={"./article_detail/129"}>
												<img src="/../2.gif" style={{ width: "100%", borderRadius: "5px" }} />
											</Link>
										</Grid>
									</Hidden>
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
							
							<Grid container className={classes.homeBlock} spacing={8} justify="center">
								<TitleContainer
									classes={classes}
									title="Game Mới"
									link="/game"
								/>
								{newGames.map((obj, key) => {
									if (Ultilities.object_exist(obj.tagsList, "name", "NEW")) {
										return (
											<Grid key={key} item xs={2} sm={2} md={2} style={{ padding: "0px" }}>
												<Link to={"/gamedetail/" + obj.id} className={classes.homeBlockLink}>
													<div className={classes.gameItem}>
														<div><img width={sizeImgGame} height={sizeImgGame} alt="game icon"
															src={obj.defaultImage} /></div>
														<div className={classes.gameName} style={{ margin: "auto" }} width= {sizeImgGame}>{obj.name}</div>
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
													width: "50px",
													height: "50px",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													position: "relative",
													overflow: "hidden"
												}}>
												</div>
												<ListItemText style={{ textAlign: "left" }} primary={(<span><b><span style={{ color: secondary.main, fontSize:"14px" }}>{obj.name}</span></b>{(obj.subTitle !== "" && obj.subTitle !== null) ? (<span style={{
													"borderRadius": "5px",
													"background": (obj.subTitle === "NEW") ? "#24b9a9" : "#fe8731",
													"color": "white",
													"padding": "0px 5px",
													"fontSize":"14px",
													"marginLeft": "5px",
												}}>{obj.subTitle}</span>) : (<span></span>)}</span>)}
													secondary={(<span fontSize={fontsize}>{"Hơn " + obj.downloadTurns + " lượt tải"}<br />
													<div style={{marginTop:"5px"}}>
														<Rating point={obj.pointReview}></Rating>
														<span style={{
																marginLeft:"10px",
																fontSize:"9px",
																border: "1px solid #23c9b6",
																padding:"1px 2px",
																borderRadius: "20px"}}>
																<label style={{color:"#23c9b6"}}>{this.getTheLoai(obj)}</label>
														</span>
														</div>
													</span>)} />
														<button className="buttonGhost">Chơi</button>
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
																width: "50px",
																height: "50px",
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
															<button color="primary" className="buttonGhost">
																Chi tiết
															</button>
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
											<button className="buttonFull">Nhận ngay</button></Link>
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
													{(obj.articleType == "event") ? (<div className="articleEvent">Sự kiện</div>) : (<div className="articleNew">Tin tức</div>)}
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
										<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>{title_dialog}</span></DialogTitle>
										<DialogContent>
											<div style={{ color: "#fff" }}>
												{dialogContent}
											</div>
										</DialogContent>
										<DialogActions>
											<div>
												<Button onClick={this.handleCloseDialogDetail} style={{ color: "#fe8731", borderRadius:"20px" }}>
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
											<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>{title_dialog}</span></DialogTitle>
											<DialogContent>
												<div style={{ color: "#fff" }}>
													{dialogContent}
												</div>
											</DialogContent>
											<DialogActions>
												<div>
													<Button onClick={this.handleCloseDialogDetail} style={{ color: "#fe8731", borderRadius:"20px" }}>
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
										<Link to={"./article_detail/129"} ><button className="buttonFull">Nhận ngay</button></Link>
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
															<button color="primary" className="buttonGhost">
																Chi tiết
															</button>
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
					<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
					<PopupMission
						handleClosePopupMission={this.handleClosePopupMission}
						openPopupMission={this.state.openPopupMission}
						dataMission={this.state.dataMission}
						reward={this.props.reward}
						doMission={this.props.doMission}
					/>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
						onClose={this.handleClose}
						>
						<div className="popupGame" style={{ backgroundImage: "url(./popup.jpg)"}}>
							<img style={{float:'right', zIndex:"1", cursor:"pointer"}} src="./close.png" alt="close popup" onClick={this.handleClose} />
							<div style={{width:"100%", height:"100%", cursor:"pointer"}} onClick={this.openGame}>
							</div>
						</div>
					</Modal>
				</div >
			) :
				(<Grid item xs={12} style={{ marginTop: "8px" }}>
					<div className="global-loadmore">
					{(server !== true) ? (												
						<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
						src="../baotri.png" />)}
					</div>
					<PopupMission
						handleClosePopupMission={this.handleClosePopupMission}
						openPopupMission={this.state.openPopupMission}
						dataMission={this.state.dataMission}
						reward={this.props.reward}
						doMission={this.props.doMission}
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
