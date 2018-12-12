import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import LoginRequired from '../../components/LoginRequired'
import Notification from '../../components/Notification'
import CloseIcon from 'material-ui-icons/Close'
import CheckIcon from 'material-ui-icons/Check'
import Avatar from 'material-ui/Avatar'
import { withTheme } from 'material-ui/styles'
import green from 'material-ui/colors/green'
import {
	FacebookShareButton,
} from 'react-share'
import RightArea from '../../components/RightArea'
import '../../styles/imageServerError.css'

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 3,
	},
});

class GiftCodeDetailComponent extends React.Component {


	loginAction=()=>{
		this.props.loginAction();
	}

	copyText=(text)=>{
		this.props.copyText(text);
	}

	linkClicked=()=>{
		this.props.linkClicked();
	}
					
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	
	}
	
	takeGiftcode=(id)=>{
		this.props.takeGiftcode(id);
	}

	render() {
		var user = JSON.parse(localStorage.getItem("user"));
		const {data, value, openSnack, message, snackVariant, dialogLoginOpen, shared, logged, server}=this.props;
		return (this.props.data.length === 1) ? (
			<div>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "0px" }}>
							<Grid item xs={12}>
								<ListItem style={{ padding: "5px" }}>
									<img alt="game icon" style={{ width: "72px" }} src={data[0].defaultImage} />
									<Hidden xsDown>
										<ListItemText style={{ textAlign: "left", padding: "20px" }} secondary={(
											<span style={{ color: "#ccc" }}>Còn lại {(data[0].giftcodeEvent.numberGiftcode - data[0].giftcodeEvent.numberGiftcodeLost)}<span
												onClick={this.openRatingDialog}></span></span>)} primary={(
													<span style={{ color: "#fff" }}><b>{data[0].title}</b></span>)} />
									</Hidden>
									<Hidden smUp>
										<ListItemText style={{ textAlign: "right", padding: "0px" }} secondary={(
											<span style={{ color: "#ccc" }}>Còn lại {(data[0].giftcodeEvent.numberGiftcode - data[0].giftcodeEvent.numberGiftcodeLost)}<span
												onClick={this.openRatingDialog}></span></span>)} primary={(
													<span style={{ color: "#fff" }}><b>{data[0].title}</b></span>)} />
									</Hidden>
									<Hidden xsDown>
										<div>
											{(data[0].giftcodeEvent.giftcodeLost) ? (
												<Button variant="raised" style={{
													borderRadius: "20px",
													background: "linear-gradient(90deg,#22cab5,#3fe28f)",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minWidth: "auto",
													minHeight: "auto"
												}}
													onClick={() => this.copyText(data[0].giftcodeEvent.giftcodeLost)}>{data[0].giftcodeEvent.giftcodeLost}</Button>) : (
													<Button style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}
														onClick={() => this.takeGiftcode(data[0].giftcodeEvent.id)}>Nhận</Button>)}
										</div>
									</Hidden>
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<Hidden smUp>
									{(data[0].giftcodeEvent.giftcodeLost) ? (
										<Button style={{
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minWidth: "auto",
											minHeight: "auto",
											width: "100%"
										}}
											onClick={() => this.copyText(data[0].giftcodeEvent.giftcodeLost)}>{data[0].giftcodeEvent.giftcodeLost}</Button>) : (
											<Button style={{
												borderRadius: "20px",
												background: "linear-gradient(90deg,#22cab5,#3fe28f)",
												color: "#fff",
												padding: "10px",
												fontSize: "0.8em",
												whiteSpace: "nowrap",
												minWidth: "auto",
												minHeight: "auto",
												width: "100%",
												marginBottom: "8px"
											}}
												onClick={() => this.takeGiftcode(data[0].giftcodeEvent.id)}>Nhận</Button>)}
								</Hidden>
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Giá</span>
							</Grid>
							<Grid item xs={12} style={{ padding: "15px" }}>
								{(data[0].giftcodeEvent.price > 0) ? (<span className="global-thit"><span style={{ color: "#fe8731" }} >{data[0].giftcodeEvent.price + " thịt"}</span> <img alt="just alt"
									src="../thit.png" /></span>) : (<div style={{ color: "#fe8731" }}>Miễn phí</div>)}
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Điều kiện</span>
							</Grid>
							<Grid item xs={12}>
								{value === 0 && <div>
									<List className="giftcode-list-root">
										{data[0].giftcodeEvent.giftcodeCondition.map((obj, key) => {
											if (obj.name !== "Check UDID") {
												if (obj.name === "Login Splay") {
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(logged) ? (<Avatar
															style={{ backgroundColor: green[700], width: "30px", height: "30px" }}><CheckIcon></CheckIcon></Avatar>) : (
																<Avatar style={{ width: "30px", height: "30px" }}><CloseIcon></CloseIcon></Avatar>)}
														<ListItemText primary={(<span style={{ color: "#fff" }}>Đăng nhập Splay</span>)} >
														</ListItemText>
														<ListItemText primary={(user !== null) ? 
															"" : (<Button variant="raised" 
																style={{
																	borderRadius: "20px",
																	background:"#232b36",
																	float:"right",
																	color: "#00948d",
																	border: "1px solid #00948d",
																	padding: "10px",
																	fontSize: "0.7em",
																	whiteSpace: "nowrap",
																	minWidth: "auto",
																	minHeight: "auto"
																}}
																onClick={this.loginAction}>THỰC HIỆN
															</Button>)}></ListItemText>
														<div className="giftcode-check"></div>
													</ListItem>
												}
												if (obj.name === "Share link facebook") {
													var isShared = false;
													if (obj.shareFacebook || shared) {
														isShared = true;
													}
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(isShared) ? (<div><Avatar style={{ backgroundColor: green[700], width: "30px", height: "30px", float:"left" }}><CheckIcon></CheckIcon></Avatar><div style={{ color: "#fff", marginLeft:"15px", marginTop:"5px", float:"left" }}>Chia sẻ Link trên Facebook</div></div>) : (
																<div style={{width:"100%"}}><Avatar style={{ width: "30px", height: "30px", float:"left" }}><CloseIcon></CloseIcon></Avatar>
														<div style={{ color: "#fff", marginLeft:"15px",marginTop:"5px", float:"left" }}>Chia sẻ Link trên Facebook</div>
														<div style={{float:"right"}}>
														<FacebookShareButton
															url={data[0].giftcodeEvent.urlShareFB}>
															<button style={{
																	borderRadius: "20px",
																	background:"#232b36",
																	float:"right",
																	color: "#00948d",
																	border: "1px solid #00948d",
																	padding: "10px",
																	fontSize: "0.7em",
																	whiteSpace: "nowrap",
																	minWidth: "auto",
																	minHeight: "auto"
																}}
																onClick={this.linkClicked}>THỰC HIỆN
														</button></FacebookShareButton></div></div>)}
														<div className="giftcode-check"></div>
													</ListItem>
												}
												if (obj.name === "Login Game") {
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(obj.loginGame) ? (<div><Avatar style={{ backgroundColor: green[700], width: "30px", height: "30px", float:"left" }}><CheckIcon></CheckIcon></Avatar><div style={{ color: "#fff", marginLeft:"15px", marginTop:"5px", float:"left" }}>Đăng nhập vào game</div></div>) : (
																<div style={{width:"100%"}}><Avatar style={{ width: "30px", height: "30px", float:"left" }}><CloseIcon></CloseIcon></Avatar>
														<div style={{ color: "#fff", marginLeft:"15px", marginTop:"5px", float:"left" }}>Đăng nhập vào game</div>
															<buton style={{
																borderRadius: "20px",
																background:"#232b36",
																color: "#00948d",
																border: "1px solid #00948d",
																padding: "10px",
																fontSize: "0.7em",
																whiteSpace: "nowrap",
																minWidth: "auto",
																minHeight: "auto",
																float:"right"
															}}
															href={data[0].giftcodeEvent.scoinGameObject.website}>THỰC HIỆN
														</buton></div>)}
														<div className="giftcode-check"></div>
													</ListItem>
												}
												if (obj.name === "Phone number validated") {
													return <ListItem style={{ padding: "5px" }} key={key}>
														{(obj.validatedPhone) ? (<div><Avatar style={{ backgroundColor: green[700], width: "30px", height: "30px", float:"left" }}><CheckIcon></CheckIcon></Avatar> <div style={{ color: "#fff", marginLeft:"15px", marginTop:"5px", float:"left"}}>Xác thực số điện thoại</div></div>) : (
																<div  style={{width:"100%"}}><Avatar style={{ width: "30px", height: "30px" }}><CloseIcon></CloseIcon></Avatar><div style={{ color: "#fff", marginLeft:"15px",float:"left" }}>Xác thực số điện thoại</div>
																	<button style={{
																		borderRadius: "20px",
																		background:"#232b36",
																		float:"right",
																		color: "#00948d",
																		border: "1px solid #00948d",
																		padding: "10px",
																		fontSize: "0.7em",
																		whiteSpace: "nowrap",
																		minWidth: "auto",
																		minHeight: "auto"
																	}}
																	href="https://scoin.vn/thong-tin-ca-nhan">THỰC HIỆN
																</button></div>)}
														<div className="giftcode-check"></div>
													</ListItem>
												}
											}
											
											return <div key={key}></div>
										})}
									</List>
								</div>}
							</Grid>
						</Grid>
						<Grid container style={{ backgroundColor: "#232b36", borderRadius: "5px", width: "100%", margin: "8px 0px 0px 0px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Mô tả</span>
							</Grid>
							<Grid className="giftcode-take" item xs={12}>
								<div style={{ padding: "10px", color: "#fff" }}
									dangerouslySetInnerHTML={{ __html: data[0].content }}>
								</div>
							</Grid>
						</Grid>
						<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
						<LoginRequired open={dialogLoginOpen}></LoginRequired>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		) : (<div className="global-loading" style={{ backgroundColor: "#232b36", marginTop: "8px" }}>
			{(server !== true) ? (												
				<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
				src="../baotri.png" />)}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
		
	}
}


export default connect()(withStyles(styles)(withTheme()(GiftCodeDetailComponent)))