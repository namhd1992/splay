import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import CheckinIcon from 'material-ui-icons/CheckCircle'
import LikeIcon from 'material-ui-icons/ThumbUp'
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
import '../../styles/mission.css'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#2b323d",
	},
};



class MissionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title_popup:""
		};
	}


	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}
	
	showDetail=(detail, title_dialog)=>{
		this.props.showDetail(detail,title_dialog);
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	reward=(id)=>{
		this.props.reward(id);
	}
	
	doMission=(action, id, value, scoinGameId)=>{
		this.props.doMission(action, id, value, scoinGameId);
	}
	
	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}


	render() {
		const {data,totalRecords, waiting,dialogDetailOpen,dialogContent,loadedRecords
		, message,openSnack,dialogLoginOpen,snackVariant,server,title_dialog}=this.props;
		const { theme } = this.props;
		const { classes } = this.props;
		const { secondary } = theme.palette;
		// if(status !==undefined){
		// 	if(status ==="03"){
		// 		console.log("AAAAAAAAAAAAA")
		// 		this.showDetail(message_server);
		// 	}
			
		// }

		return (<div>
			<Grid container style={{ width: "100%", margin: "0px" }}>
				<Grid item xs={12} md={8} >
					<Grid container>
						<Grid item xs={12} >
							<List className="mission-list-root" >
								{data.map((obj, key) => (
									<ListItem className="mission-item" key={key} style={{ backgroundColor: "#232b36", borderRadius: "5px", marginBottom: "8px" }}>
										<Avatar style={{ backgroundColor: secondary.main }}>
											{(obj.actionName === "1") ? (
												<img style={{ width: "24px", height: "24px" }} src="../lucky_icon.png" alt="just alt"
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (
													<div></div>)}
											{(obj.actionName === "2") ? (<CheckinIcon onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "3") ? (<img style={{ width: "24px", height: "24px" }} src="../auction_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "8" || obj.actionName === "9" || obj.actionName === "4" || obj.actionName === "5") ? (<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
											{(obj.actionName === "6") ? (<LikeIcon onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />) : (<div></div>)}
										</Avatar>
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

										{(obj.finish && !obj.received && obj.awardAvailable !==0 && obj.missionStatus ==="active") ? (<div>
											<button onClick={() => this.reward(obj.missionId)} className="buttonFull" variant="raised">Nhận</button>
										</div>) : (<div></div>)}
										{(!obj.finish && !obj.received && obj.missionStatus ==="active") ? (<div>
											<button className="buttonGhost" onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameId)}>Thực Hiện</button>
										</div>) : (<div></div>)}
										{(obj.finish && obj.received && obj.missionStatus ==="active") ? (
											<Button style={{ color: "#fff", textTransform:"none" }} disabled>
												Đã Nhận
											</Button>
											// <button className="received" disabled>Đã nhận</button>
										) : (<div></div>)}
										{(obj.finish && !obj.received && obj.awardAvailable ===0 && obj.missionStatus ==="active") ? (
											<Button style={{ color: "#fff", textTransform:"none" }} disabled>
												Đã Hết
											</Button>
											// <button className="received" disabled>Đã hết</button>
										) : (<div></div>)}
										{(obj.missionStatus ==="inactive") ? (
											<Button style={{ color: "#fff", textTransform:"none" }} disabled>
												Hết Hạn
											</Button>
											// <button className="received" disabled>Hết hạn</button>
										) : (<div></div>)}
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
						<Button onClick={this.handleCloseDialogDetail} style={{ color: "#fe8731" }}>
							Đóng
		  </Button>
					</div>
				</DialogActions>
			</Dialog>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>
		)
	}
}
MissionComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(MissionComponent)))
