import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import {
	getData as getHistoryData,
	getMoreData as getMoreHistoryData
} from '../../modules/history'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import { Avatar } from 'material-ui'
import { withTheme } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import List, { ListItem, ListItemText } from 'material-ui/List'
import SwipeableViews from 'react-swipeable-views'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'

function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ padding: "8px", overflow: "hidden" }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

class Phone_card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			expand: [],
			limit: 12,
			offset: 0,
			value: 0,
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("MÃ THẺ");
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			_this.props.getData(user.access_token, user.scoinAccessToken);
			this.props.getHistoryData(user.access_token, this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreHistoryData(user.access_token, this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	handleExpandItem = (id) => {
		if (this.state.expand.indexOf(id) !== -1) {
			this.state.expand.splice(this.state.expand.indexOf(id), 1);
		} else {
			this.state.expand.push(id);
		}
		this.forceUpdate();
	}

	render() {
		var _this = this;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		return (<div>
			{(this.props.data.length !== 0) ? (
				<div style={{maxWidth:"768px",margin:"auto"}}>
					<Grid container justify="center">
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar src={"../default_ava.png"} ></Avatar>
								<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{this.props.data.fullName}</div>
							</ListItem>
						</Grid>
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
								<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(this.props.data.splayPoint) ? this.props.data.splayPoint.toLocaleString() : "0"}</div>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<AppBar position="static" style={{ background: "transparent", boxShadow: "none" }}>
								<Tabs
									value={this.state.value}
									onChange={this.handleChange}
									indicatorColor="secondary"
									textColor="secondary"
									justify="center"
								>
									<Tab label="Nhập mã" />
									<Tab label="Lịch sử" />
								</Tabs>
							</AppBar>
							<SwipeableViews
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={this.state.value}
								onChangeIndex={this.handleChangeIndex}
							>
								<TabContainer dir={theme.direction} style={{ padding: "0px" }}>
									<Grid container className="help-root" justify="left" style={{ backgroundColor: "#232b36", margin: "0px", width: "100%", borderRadius:"5px" }}>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<TextField style={{ minWidth: "100%" }} label="Nhà mạng" />
										</Grid>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<TextField style={{ minWidth: "100%" }} label="Mệnh giá" />
										</Grid>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<TextField style={{ minWidth: "100%" }} label="Mã thẻ" />
										</Grid>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<TextField style={{ minWidth: "100%" }} label="Serial" />
										</Grid>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<TextField style={{ minWidth: "100%" }} label="Ngày hết hạn" />
										</Grid>
										<Grid item xs={12} style={{ textAlign: "center", padding: "8px" }}>
											<Button
												variant="raised" style={{
													borderRadius: "20px",
													background: "linear-gradient(90deg,#22cab5,#3fe28f)",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minWidth: "auto",
													minHeight: "auto",
													maxWidth: "320px",
													margin: "auto"
												}}>Nhập</Button>
										</Grid>
									</Grid>
								</TabContainer>
								<TabContainer dir={theme.direction}>
									<Grid container className="help-root" justify="center" style={{ margin: "0px", width: "100%" }} spacing={0}>
										<Grid item xs={12} >
											<List style={{padding:"0px"}}>
												{this.props.dataHistory.map((obj, key) => (
													<div key={key}>
														<ListItem button onClick={() => this.handleExpandItem(obj.id)}
															style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "0px 0px 5px 0px", width: "auto" }}>
															<ListItemText primary={(<span>Mobifone</span>)} secondary="100 000" />
															<ListItemText primary={(<span style={{ fontSize: "0.8em" }}>{obj.status}</span>)} style={{ textAlign: "right" }} />
															{(_this.state.expand.indexOf(obj.id) !== -1) ? <ExpandLess /> : <ExpandMore />}
														</ListItem>
														<Collapse in={(_this.state.expand.indexOf(obj.id) !== -1)} timeout="auto" unmountOnExit>
															<List component="div" disablePadding style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px 10px", width: "auto" }}>
																<ListItem>
																	<ListItemText primary={"Mã: " + "1234 1233 5462 5642"} secondary={"Serial: " + "2154sf4sdaf54"} />
																</ListItem>
															</List>
														</Collapse>
													</div>
												))}
												{(this.props.waitingHistory) ? (<div className="global-loading"><CircularProgress
													size={50}
												/></div>) : (this.props.totalRecords > this.state.loadedRecords) ? (
													<ListItem className="global-loadmore" style={{ textAlign: "center", background: "#232b36", borderRadius: "5px", margin: "5px", width: "auto" }}>
														<a onClick={this.loadMoreAction} style={{ color: secondary.main, margin: "auto" }}>Xem thêm</a>
													</ListItem>
												) : (<div></div>)}
											</List>
										</Grid>
									</Grid>
								</TabContainer>
							</SwipeableViews>
						</Grid>
					</Grid>
				</div>
			) : (<div className="global-loading">
				<CircularProgress size={50} />
			</div>)}
			<Dialog
				fullScreen={false}
				open={this.state.dialogLoginOpen}
				onClose={this.handleCloseDialogLogin}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title"><span style={{ color: "#24b9a9" }}>Đăng nhập</span></DialogTitle>
				<DialogContent style={{ color: "#fff" }}>
					Tính năng yêu cầu đăng nhập
          </DialogContent>
				<DialogActions>
					<div>
						<Link to="../">
							<Button onClick={this.handleCloseDialogLogin} style={{ color: "#fe8731" }}>
								Đóng
                </Button>
						</Link>
					</div>
					<div>
						<Button onClick={this.loginAction}
							style={{
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minWidth: "auto",
								minHeight: "auto",
							}}
						>
							Đăng nhập
              </Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>)
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	dataHistory: state.history.data,
	waitingHistory: state.history.waiting,
	totalRecords: state.history.totalRecords,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeTitle,
	getHistoryData,
	getMoreHistoryData
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTheme()(Phone_card))