import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import LoginRequired from '../../components/LoginRequired'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import PopupDetailBonus from '../../components/PopupDetailBonus'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import '../../styles/auction.css'
import '../../styles/imageServerError.css'

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

class AuctionComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			openDetailBonus:false,
			speed:10
		};
	}

	handleChange=(event, value)=>{
		this.props.handleChange(event,value);
	}

	loadMoreAllAction=()=>{
		this.props.loadMoreAllAction()
	}

	loadMoreShopItemGiftcodeAction=()=>{
		this.props.loadMoreShopItemGiftcodeAction()
	}

	loadMoreShopItemAction=()=>{
		this.props.loadMoreShopItemAction()
	}

	loadMoreAction=()=>{
		this.props.loadMoreAction()
	}
	handleCloseBonus=()=>{
		this.setState({openDetailBonus:false});
	}
	handleOpenBonus=()=>{
		this.setState({openDetailBonus:true});
	}
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
	getStringBonus=(obj)=> {
		var output = document.getElementById("bonus");
		var bonus="";
		for (let i = 0; i < obj.length; i++) {
			bonus+='<span>Chúc mừng <span style="color:#00bf98">'+ obj[i].userName+'</span>'+' vừa giành được '+ '<span style="color:#ff9d42">'+ obj[i].itemName+'</span>'+' từ sự kiện ' +'<span style="color:#00bf98">'+ obj[i].eventName+'.'+'</span></span>&nbsp;&nbsp;&nbsp;&nbsp;'
		}
		if(output!==null){
			output.insertAdjacentHTML('beforeend',bonus)
		}
	}
	handleMouseOut=()=>{
		this.setState({speed:10});
	}
	handleMouseOver=()=>{
		this.setState({speed:0});
	}

	render() {
		const { classes } = this.props;
		const { secondary } = this.props.theme.palette;
		const {dialogLoginOpen, value, waiting, loadedRecordsAll, loadedRecordsShopItem, loadedRecordsShopItemGiftcode,loadedRecords,
			data, totalRecords, profileData, dataShopItemGiftcode, waitingShopItemGiftcode, totalRecordsShopItemGiftcode,
			dataShopItem, waitingShopItem, totalRecordsShopItem, dataAll, waitingAll, totalRecordsAll,server,dataAutionAndLucky}=this.props;
		if(dataAutionAndLucky!==null && dataAutionAndLucky.length>0){
			this.getStringBonus(dataAutionAndLucky)
		}
		return (
			<div className={classes.root}>
				<HeadMenu></HeadMenu>
				<Grid container spacing={8} style={{ width: "100%", margin: "0px" }}>
					<Grid item xs={12} md={8}>
						<Grid container justify="center" style={{ marginBottom: "10px" }} spacing={8}>
							<Grid item xs={12} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar src={"../default_ava.png"} ></Avatar>
									<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{profileData.fullName}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(profileData.splayPoint) ? profileData.splayPoint.toLocaleString() : "0"}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../scoin.png"><img style={{ maxWidth: "100%" }} src="../scoin.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{(profileData.splayPoint) ? profileData.scoinBalance.toLocaleString() : "0"}</div>
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
								
									<div className="bonus" onClick={this.handleOpenBonus}>
										<div className="marquee">
											{/* <div > */}				
												<marquee id="bonus" behavior="scroll" scrollamount={this.state.speed} direction="left">
												</marquee>
											{/* </div> */}
											
										</div>
										<div className="detail">
											<label>Chi tiết</label>
											<img className="img_avatar" src="../play_arrow_black.png"/>
										</div>
									</div>
								
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
									{(dataAll.length <= 0 && !waitingAll) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8}>
										{dataAll.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={(obj.objectType === "auction") ? "/auctiondetail/" + obj.id : "itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auctionNameWhite">{obj.name}</div>
															<div className="auctionNameBlack"><img src={(obj.objectType === "auction") ? "../thit.png" : "../scoin.png"} style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.price.toLocaleString()}</span></div>
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
										{(waitingAll) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecordsAll > loadedRecordsAll) ? (
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
									{(dataShopItemGiftcode.length <= 0 && !waitingShopItemGiftcode) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{dataShopItemGiftcode.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auctionNameWhite">{obj.name}</div>
														 	<div className="auctionNameBlack"><img src="../scoin.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.priceScoin.toLocaleString()}</span></div>
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
										{(waitingShopItemGiftcode) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecordsShopItemGiftcode > loadedRecordsShopItemGiftcode) ? (
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
									{(data.length <= 0 && !waiting) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{data.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/auctiondetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auctionNameWhite">{obj.name}</div>
															<div className="auctionNameBlack"><img src="../thit.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.topPrice.toLocaleString()}</span></div>
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
										{(waiting) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecords > loadedRecords) ? (
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
									{(dataShopItem.length <= 0 && !waitingShopItem) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center" }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{dataShopItem.map((obj, key) => (
											<Grid key={key} item xs={12} sm={6}>
												<Link to={"/itemgiftcodedetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auctionNameWhite">{obj.name}</div>
															<div className="auctionNameBlack"><img src="../scoin.png" style={{ width: "24px", verticalAlign: "text-bottom" }} /> <span style={{ color: "#fe8731" }}>{obj.priceScoin.toLocaleString()}</span></div>
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
										{(waitingShopItem) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecordsShopItem > loadedRecordsShopItem) ? (
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
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<PopupDetailBonus
					handleCloseBonus={this.handleCloseBonus}
					openDetailBonus={this.state.openDetailBonus}
					dataAutionAndLucky={dataAutionAndLucky}
				/>
			</div>
		)
	}
}

export default connect()(withStyles(styles)(withTheme()(AuctionComponent)))
