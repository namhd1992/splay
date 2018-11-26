import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
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
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import '../../styles/imageServerError.css'




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


class PhoneCardComponent extends React.Component {


	handleExpandItem=(id)=>{
		this.props.handleExpandItem(id);
	}
	
	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}
	
	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}
	
	loginAction=()=>{
		this.props.loginAction();
	}
	
	handleChange=(event, value)=>{
		this.props.handleChange(event, value);
	}
	
	handleChangeIndex=(index)=>{
		this.props.handleChangeIndex(index);
	}

	render() {
		const {data,dataHistory,waitingHistory,totalRecords,expand,value,dialogLoginOpen,loadedRecords,server}=this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		return (<div>
			{(data.length !== 0) ? (
				<div style={{maxWidth:"768px",margin:"auto"}}>
					<Grid container justify="center">
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar src={"../default_ava.png"} ></Avatar>
								<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{data.fullName}</div>
							</ListItem>
						</Grid>
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
								<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(data.splayPoint) ? data.splayPoint.toLocaleString() : "0"}</div>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<AppBar position="static" style={{ background: "transparent", boxShadow: "none" }}>
								<Tabs
									value={value}
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
								index={value}
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
												{dataHistory.map((obj, key) => (
													<div key={key}>
														<ListItem button onClick={() => this.handleExpandItem(obj.id)}
															style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "0px 0px 5px 0px", width: "auto" }}>
															<ListItemText primary={(<span>Mobifone</span>)} secondary="100 000" />
															<ListItemText primary={(<span style={{ fontSize: "0.8em" }}>{obj.status}</span>)} style={{ textAlign: "right" }} />
															{(expand.indexOf(obj.id) !== -1) ? <ExpandLess /> : <ExpandMore />}
														</ListItem>
														<Collapse in={(expand.indexOf(obj.id) !== -1)} timeout="auto" unmountOnExit>
															<List component="div" disablePadding style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px 10px", width: "auto" }}>
																<ListItem>
																	<ListItemText primary={"Mã: " + "1234 1233 5462 5642"} secondary={"Serial: " + "2154sf4sdaf54"} />
																</ListItem>
															</List>
														</Collapse>
													</div>
												))}
												{(waitingHistory) ? (<div className="global-loading">
												{(server !== true) ? (												
													<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
													src="../baotri.png" />)}
												</div>) : (totalRecords > loadedRecords) ? (
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
				{(server !== true) ? (												
					<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
					src="../baotri.png" />)}
			</div>)}
			<Dialog
				fullScreen={false}
				open={dialogLoginOpen}
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
							<Button onClick={this.handleCloseDialogLogin} style={{ color: "#fe8731", borderRadius:"20px" }}>
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

export default connect()(withTheme()(PhoneCardComponent))
