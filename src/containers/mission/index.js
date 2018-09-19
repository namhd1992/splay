import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData,
	finishData
} from '../../modules/mission'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { CircularProgress } from 'material-ui/Progress'
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
import Hidden from 'material-ui/Hidden'
import Notification from '../../components/Notification'
import RightArea from '../../components/RightArea'
import LoginRequired from '../../components/LoginRequired'

const styles = {
	paper: {
		background: "#2b323d"
	},
};

class Mission extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogDetailOpen: false,
			dialogContent: "",
			loadedRecords: 0,
			message: "",
			openSnack: false,
			dialogLoginOpen: false,
			snackVariant: "info",
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			this.props.getData(this.state.limit, this.state.offset, user.access_token).then(function () {
				_this.props.changeTitle("NHIỆM VỤ");
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, user.access_token);
		this.setState({
			loadedRecords: _this.state.limit + newOffset,
			offset: newOffset
		});
	}

	doMission = (action, id, value, objectGame) => {
		switch (parseInt(action.substring(action.length - 1), 10)) {
			case 1:
				window.location.href = '/lucky';
				break;
			case 2:
				window.location.href = '/checkin';
				break;
			case 3:
				window.location.href = '/auctiondetail/' + id;
				break;
			case 4:
				window.location.href = '/giftcodedetail/' + id;
				break;
			case 5:
				window.location.href = '/gamedetail/' + objectGame.id;
				break;
			case 8:
				window.location.href = '/gamedetail/' + objectGame.id;
				break;
			default:
				window.location.assign(value);
				break;
		}
	}

	reward = (id) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.finishData(id, user.scoinAccessToken, user.access_token).then(function (response) {
			_this.props.getData(_this.state.limit, _this.state.offset, user.access_token);
		}).catch(function (err) {
			console.log(err);
		});
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	showDetail = (detail) => {
		this.setState({ dialogDetailOpen: true, dialogContent: detail });
	}

	handleCloseDialogDetail = () => {
		this.setState({ dialogDetailOpen: false });
	};

	render() {
		const { fullScreen } = this.props;
		const { theme } = this.props;
		const { classes } = this.props;
		const { secondary } = theme.palette;
		return (
			<div>
				<Grid container style={{ width: "100%", margin: "0px" }}>
					<Grid item xs={12} md={8} >
						<Grid container>
							<Grid item xs={12} >
								<List className="mission-list-root" >
									{this.props.data.map((obj, key) => (
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
							{(this.props.waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}><CircularProgress
								size={50} style={{ color: secondary.main }}
							/></Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
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
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				<Dialog
					fullScreen={false}
					open={this.state.dialogDetailOpen}
					onClose={this.handleCloseDialogDetail}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }}>Chi tiết nhiệm vụ</span></DialogTitle>
					<DialogContent>
						<div style={{ color: "#fff" }}>
							{this.state.dialogContent}
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
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.mission.data,
	dataFinish: state.mission.dataFinish,
	totalRecords: state.mission.totalRecords,
	waiting: state.mission.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	finishData,
	getMoreData,
	changeTitle
}, dispatch)


Mission.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withStyles(styles, { withTheme: true })(Mission)))