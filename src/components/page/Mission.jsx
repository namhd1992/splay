import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import List, { ListItem, ListItemText } from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
// import CheckinIcon from 'material-ui-icons/CheckCircle'
// import LikeIcon from 'material-ui-icons/ThumbUp'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { withStyles } from "material-ui/styles/index"
import Notification from '../../components/Notification'
import LoginRequired from '../../components/LoginRequired'
import PopupMission from '../PopupMission'
import '../../styles/mission.css'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#2b323d",
	},
};


function intervalTrigger(arr, key){
	var count = 0;
	var arrColor=['#b92e2e','#00c9b7'];
	return setInterval(function() {
		if (count >= arr.length) count = 0;
		var rand = arr[count];
		var color=arrColor[count];
		document.getElementById(key).src = rand;
		document.getElementById("img"+key).style.backgroundColor=color
		count=count+1;
	}, 1000); 
}
class MissionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title_popup:"",
			openPopupMission:false
		};
	}


	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}
	
	showDetail=(detail, title_dialog)=>{
		this.props.showDetail(detail,title_dialog);
	}

	openPopupMission =(obj)=>{
		this.setState({openPopupMission:true, dataMission:obj});
	}
	closePopupMission =()=>{
		this.setState({openPopupMission:false});
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	reward=(id)=>{
		this.props.reward(id);
	}
	
	doMission=(action, id, value, scoinGameId,condition)=>{
		if(condition===false){
			this.props.showDetail("Rất tiếc bạn không đủ điều kiện nhận thưởng.", "");
		}else{
			this.props.doMission(action, id, value, scoinGameId);
		}
	}
	
	loadMoreAction=()=>{
		this.props.loadMoreAction();
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
		return "img"+key;
	}


	render() {
		const {data,totalRecords, waiting,dialogDetailOpen,dialogContent,loadedRecords
		, message,openSnack,dialogLoginOpen,snackVariant,server,title_dialog}=this.props;
		const { theme } = this.props;
		const { classes } = this.props;
		const { secondary } = theme.palette;

		return (<div>
			<Grid container style={{ width: "100%", margin: "0px" }}>
				<Grid item xs={12} md={8} >
					<Grid container>
						<Grid item xs={12} >
							<List className="mission-list-root" >
								{data.map((obj, key) => (
									<ListItem className="mission-item" key={key} style={{ backgroundColor: "#232b36", borderRadius: "5px", marginBottom: "8px" }}>
										<div id={this.setId(key)} className="avatar">
											<img className="img_avatar" src={this.getSrcImage(obj,key)}
												id={key}
												onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />
										</div>
										{/* <Avatar style={{ backgroundColor: secondary.main }}>
											{(obj.actionName === "1") ? (
												<img style={{ width: "24px", height: "24px" }} src="../lucky_icon.png" alt="just alt"
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (
													<div></div>)}
											{(obj.actionName === "2") ? (<CheckinIcon onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "3") ? (<img style={{ width: "24px", height: "24px" }} src="../auction_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "8" || obj.actionName === "9" || obj.actionName === "4" || obj.actionName === "5" || obj.actionName === "10") ? (<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "6") ? (<LikeIcon onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
										</Avatar> */}
										{(obj.award === "Thịt") ? (
										<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
											primary={(<div className="mission_title">{obj.missionName}</div>)}
											secondary={(
												<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
													src="../thit.png" /> <span style={{ color: "#ff6126" }}>{obj.valueAward}</span> </span>)} />) : (<div></div>)}
										{(obj.award === "giftcode") ? (
										<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
											primary={(<div className="mission_title">{obj.missionName}</div>)}
											secondary={(
												<span className="global-thit" style={{ color: "#fe8731" }}><span style={{ color: "#ff6126" }}>Giftcode</span> </span>)} />) : (<div></div>)}
										{(obj.award === "XO") ? (
										<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
											primary={(<div className="mission_title">{obj.missionName}</div>)}
											secondary={(
												<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
													src="../XO.png" /> <span style={{ color: "#ff6126" }}>{obj.valueAward}</span> </span>)} />) : (<div></div>)}
										<div className="mission_action">
											<button
													className="buttonCircle"
													onClick={() => this.openPopupMission(obj)}>?</button>
											{(obj.finish && !obj.received && obj.awardAvailable !==0 && obj.missionStatus ==="active") ? (<div>
												<button onClick={() => this.reward(obj.missionId)} className="buttonFull" variant="raised">Nhận</button>
											</div>) : (<div></div>)}
											{(!obj.finish && !obj.received && obj.missionStatus ==="active") ? (<div>
												<button className="buttonGhost" onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameId,obj.condition)}>Thực Hiện</button>
											</div>) : (<div></div>)}
											{(obj.finish && obj.received && obj.missionStatus ==="active") ? (
												<Button style={{ color: "#888787", textTransform:"none" }} disabled>
													Đã Nhận
												</Button>
												// <button className="received" disabled>Đã nhận</button>
											) : (<div></div>)}
											{(obj.finish && !obj.received && obj.awardAvailable ===0 && obj.missionStatus ==="active") ? (
												<Button style={{ color: "#888787", textTransform:"none" }} disabled>
													Đã Hết
												</Button>
												// <button className="received" disabled>Đã hết</button>
											) : (<div></div>)}
											{(obj.missionStatus ==="inactive") ? (
												<Button style={{ color: "#888787", textTransform:"none" }} disabled>
													Hết Hạn
												</Button>
												// <button className="received" disabled>Hết hạn</button>
											) : (<div></div>)}
										</div>
									</ListItem>
								))}
							</List>
						</Grid>
						{(waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}>
						{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
						</Grid>) : (totalRecords > loadedRecords) ? (
							<Grid item xs={12} style={{ textAlign: "center", color: secondary.main }}>
								<a onClick={this.loadMoreAction}>Xem thêm</a>
							</Grid>
						) : (<div></div>)}
					</Grid>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} md={4}>
						<RightArea></RightArea>
					</Grid>
				</Hidden>
			</Grid>
			<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
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
			<PopupMission
				handleClosePopupMission={this.closePopupMission}
				openPopupMission={this.state.openPopupMission}
				dataMission={this.state.dataMission}
				reward={this.reward}
				doMission={this.doMission}
			/>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>
		)
	}
}
MissionComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(MissionComponent)))
