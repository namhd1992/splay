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

const styles = {
	paper: {
		background: "#2b323d"
	},
};



class MissionComponent extends React.Component {

	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}
	
	showDetail=(detail)=>{
		this.props.showDetail(detail);
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	reward=(id)=>{
		this.props.reward(id);
	}
	
	doMission=(action, id, value, objectGame)=>{
		this.props.doMission(action, id, value, objectGame);
	}
	
	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}


	render() {
		const {data,totalRecords, waiting,dialogDetailOpen,dialogContent,loadedRecords
		, message,openSnack,dialogLoginOpen,snackVariant}=this.props;
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
										<Avatar style={{ backgroundColor: secondary.main }}>
											{(obj.actionName === "1") ? (
												<img style={{ width: "24px", height: "24px" }} src="../lucky_icon.png" alt="just alt"
													onClick={() => this.showDetail(obj.description)} />) : (
													<div></div>)}
											{(obj.actionName === "2") ? (<CheckinIcon onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
											{(obj.actionName === "3") ? (<img style={{ width: "24px", height: "24px" }} src="../auction_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
											{(obj.actionName === "4") ? (<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
											{(obj.actionName === "5") ? (<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
											{(obj.actionName === "8") ? (<img style={{ width: "24px", height: "24px" }} src="../giftcode_icon.png" alt="just alt"
												onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
											{(obj.actionName === "6") ? (<LikeIcon onClick={() => this.showDetail(obj.description)} />) : (<div></div>)}
										</Avatar>
										<ListItemText primary={(<span style={{ color: "#fff" }}>{obj.missionName}</span>)}
											secondary={(<span className="global-thit"><img alt="just alt" src="../thit.png" /> <span style={{ color: "#ff6126" }}>{obj.valueAward}</span> </span>)} />
										{(obj.finish && !obj.received) ? (<div>
											<Button onClick={() => this.reward(obj.missionId)} style={{
												borderRadius: "20px",
												background: "linear-gradient(90deg,#22cab5,#3fe28f)",
												color: "#fff",
												padding: "10px",
												fontSize: "0.8em",
												whiteSpace: "nowrap",
												minWidth: "auto",
												minHeight: "auto"
											}} variant="raised">Nhận</Button>
										</div>) : (<div></div>)}
										{(!obj.finish && !obj.received) ? (<div>
											<Button style={{
												borderRadius: "20px",
												background: "transparent",
												color: "#23c9b6",
												border: "solid 1px #23c9b6",
												padding: "10px",
												fontSize: "0.8em",
												whiteSpace: "nowrap",
												minWidth: "auto",
												minHeight: "auto"
											}} onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameObject)}>Thực
				  hiện</Button>
										</div>) : (<div></div>)}
										{(obj.finish && obj.received) ? (<div>
											<Button className="mission-button disabledbtn" color="primary" disabled>Đã nhận</Button>
										</div>) : (<div></div>)}
									</ListItem>
								))}
							</List>
						</Grid>
						{(waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}><CircularProgress
							size={50} style={{ color: secondary.main }}
						/></Grid>) : (totalRecords > loadedRecords) ? (
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
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>
		)
	}
}
MissionComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(MissionComponent)))