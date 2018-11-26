import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import Slider from 'react-slick'
import Notification from '../../components/Notification'
import List, { ListItem, ListItemText } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import LoginRequired from '../../components/LoginRequired'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import { withStyles } from "material-ui/styles/index"
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#2b323d"
	},
};

function SampleNextArrow(props) {
	const { style, onClick } = props;
	return (
		<div
			className="slick-arrow slick-next"
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

class AuctionDetailComponent extends React.Component {

	changeImage=(image)=>{
		this.props.changeImage(image);
	}

	handleChangeTab=(event, value)=>{
		this.props.handleChangeTab(event, value);
	}

	handleChange= name => event=>{
		this.props.handleChange(name, event);
	}

	handleOnAuction=(id, price)=>{
		this.props.handleOnAuction(id, price);
	}

	handleUpdateProfile=()=>{
		this.props.handleUpdateProfile();
	}

	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	handleCloseDialog=()=>{
		this.props.handleCloseDialog();
	}


	
	render() {
		const {dialogLoginOpen, value, waiting,loadedRecords, dataHistory, totalHistoryRecords,
			 dialogOpen, price, message, snackVariant, openSnack, itemImage, data, dataProfile, server}=this.props;
		
		var lengthHistory=0;
		if(dataHistory){
			lengthHistory=this.props.dataHistory.length;
		}
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		var now = moment(new Date()); //todays date
		var time_text = "";
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			centerMode: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		if (data[0] !== undefined) {
			var end = moment(new Date(data[0].toDate)); // another date
			var start = moment(new Date(data[0].fromDate)); // another date
			var duration = moment.duration(end.diff(now));
			var durationstart = moment.duration(start.diff(now));
			var days = Math.floor(duration.asDays());
			var hours = Math.floor(duration.asHours());
			var minutes = Math.floor(duration.asMinutes());
			if (days > 0) {
				time_text = "còn " + days + " ngày";
			} else if (hours > 0) {
				time_text = "còn " + hours + " giờ";
			} else if (minutes > 0) {
				time_text = "còn " + minutes + " phút";
			}
			if (duration < 0) {
				time_text = "Đã kết thúc";
			}
			if (durationstart > 0) {
				time_text = "Chưa bắt đầu";
			}
		}

		return (data.length === 1) ? (
			<div>
				<Grid container spacing={8} >
					<Grid item xs={12} md={8}>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36" }}>
							<Grid className="auction-icon" item xs={12} sm={6} >
								<div style={{
									width: "100%",
									padding: "8px",
									boxSizing: "border-box"
								}}>
									<div
										style={{
											width: "100%",
											paddingBottom: "100%",
											backgroundImage: "url(" + itemImage + ")",
											backgroundSize: "contain",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "center"
										}}
									></div>
								</div>
								{(data[0].listImage !== null && data[0].listImage !== "") ? (
									<div style={{ width: "80%", margin: "auto" }}>
										<Slider dotsClass={"slick-dots carousel-dot"} {...settings} >
											{data[0].listImage.split(",").map((obj, key) => (<div onClick={() => this.changeImage(obj)} style={{ width: "25%", padding: "2px", boxSizing: "border-box" }}><div style={{ width: "100%", paddingBottom: "100%", backgroundImage: "url(" + obj + ")", backgroundSize: "cover" }} ></div></div>))}
										</Slider>
									</div>
								) : (
										<div></div>
									)}
							</Grid>
							<Grid item xs={12} sm={6}>
								<List className="auction-root" style={{ backgroundColor: "#232b36" }}>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Giá khởi điểm <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {data[0].amountStart.toLocaleString()} </span></span>)} ></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Bước giá <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {data[0].priceStep.toLocaleString()} </span></span>)}></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Giá hiện tại <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> <span>{data[0].topPrice.toLocaleString()}</span> </span></span>)} ></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>{data[0].countUserAuction} người đã tham gia</span>)}
										></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Còn lại {time_text}</span>)}></ListItemText>
									</ListItem>
									<ListItem style={{ padding: "5px" }}>
										<Button color="primary" variant="raised" style={{
											margin: "10px auto",
											width: "100%",
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minHeight: "auto"
										}}
											onClick={this.handleOpenDialog}>Đấu giá</Button>
									</ListItem>
								</List>
							</Grid>
						</Grid>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36", padding: "8px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Mô tả</span>
							</Grid>
							<Grid item xs={12}>
								{value === 0 && <div>
									<div style={{ color: "#fff", padding: "8px" }}>
										{data[0].description}
									</div>
								</div>}
							</Grid>
						</Grid>
						<Grid container spacing={8} style={{ width: "100%", margin: "8px 0px 0px 0px", borderRadius: "5px", backgroundColor: "#232b36", padding: "8px" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em", color: "#fff" }}>Lịch sử</span>
							</Grid>
							{(lengthHistory <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có lịch sử</Grid>) : (<span></span>)}
							<Grid item xs={12}>
								{dataHistory !== undefined && <div style={{ padding: "0px" }}>
									<List className="auction-history-list-root">
										{dataHistory.map((obj, key) => (
											<ListItem key={key} style={{ padding: "8px" }}>
												<ListItemText primary={(<span style={{ color: "#fff" }}>{obj.userPaid}</span>)}
													secondary={(<span style={{ color: "#fff" }}>{moment(obj.createOn).format("hh:mm DD/MM/YYYY")}</span>)} />
												<ListItemText style={{ textAlign: "right" }}
													primary={<span className="global-thit" style={{ color: "#fe8731" }}><img
														alt="just alt" src="../thit.png" /> {obj.currentPrice.toLocaleString()} </span>} />
											</ListItem>
										))}
									</List>
									{(waiting) ? (<div className="global-loading">
									{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
									</div>) : (totalHistoryRecords > loadedRecords) ? (
										<Grid item xs={12} className="global-loadmore">
											<a onClick={this.loadMoreAction} style={{ color: secondary.main }}>Xem thêm</a>
										</Grid>
									) : (<div></div>)}
								</div>}
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<Dialog
					fullScreen={false}
					open={dialogOpen}
					onClose={this.handleCloseDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }} >Đấu giá</span></DialogTitle>
					<DialogContent>
						<List className="auction-root" style={{ backgroundColor: "#232b36" }}>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Giá khởi điểm <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {data[0].amountStart.toLocaleString()} </span></span>)} ></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Bước giá <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> {data[0].priceStep.toLocaleString()} </span></span>)} ></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Giá hiện tại <span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt" src="../thit.png" /> <span>{data[0].topPrice.toLocaleString()}</span> </span></span>)}></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>{data[0].countUserAuction} người đã tham gia</span>)}
								></ListItemText>
							</ListItem>
							<ListItem style={{ padding: "5px" }}>
								<ListItemText primary={(<span style={{ color: "#fff" }}>Còn lại {time_text}</span>)}></ListItemText>
							</ListItem>
						</List>
						<div className="auction-phone-wrap" style={{ display: "table", padding: "5px" }}>
							<div style={{ padding: "5px" }}>
								<TextField
									id="number"
									label="Số điện thoại"
									onChange={this.handleChange('phone')}
									defaultValue={dataProfile.phoneNumber}
									type="password"
									className="priceInput"
									InputLabelProps={{
										shrink: true,
									}}
									margin="normal"
								/>
							</div>
							<div style={{ padding: "5px", display: "table-cell", verticalAlign: "bottom" }}>
								<Button className="auction-button-phone" onClick={this.handleUpdateProfile} style={{ color: "#24b9a9", border: "solid 1px #24b9a9" }}>Cập nhật</Button>
							</div>
						</div>
						<div className="auction-phone-wrap" style={{ color: "#ccc" }}>Cập nhật số điện thoại để tham gia đấu giá</div>
						<div className="auction-phone-wrap">
							<TextField
								id="number"
								label="Giá"
								defaultValue="1"
								onChange={this.handleChange('price')}
								type="number"
								className="priceInput"
								InputLabelProps={{
									shrink: true,
								}}
								margin="normal"
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<div className="popup-button">
							<Button onClick={this.handleCloseDialog} style={{ color: "#fe8731", borderRadius:"20px" }}>
								Đóng
              </Button>
							<Button style={{
								margin: "auto",
								maxWidth: "320px",
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minHeight: "auto"
							}}
								onClick={this.handleOnAuction(data[0].id, price)}
								color="primary" autoFocus>
								Đấu giá
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading" style={{ marginTop: "8px" }}>
			{(server !== true) ? (												
				<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
				src="../baotri.png" />)}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(AuctionDetailComponent)))
