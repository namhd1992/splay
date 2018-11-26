import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import Notification from '../../components/Notification'
import { withTheme } from 'material-ui/styles'
import { withStyles } from 'material-ui/styles'
import LoginRequired from '../../components/LoginRequired'
import '../../styles/imageServerError.css'



const styles = theme => ({
	root: {
		marginTop: "16px",
		marginBottom: "8px",
		borderRadius: "5px",
		backgroundColor: "#232b36",
		color: "#fff",
	},
	gridItem: {
		backgroundColor: "#fff",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px"
	},
	gridLink: {
		textDecoration: "none"
	}
});




class ProfileComponent extends React.Component {


	handleChangeFile=(FileList)=>{
		this.props.handleChangeFile(FileList);
	}
	
	handleOpenDialog=()=>{
		this.props.handleOpenDialog();
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	showUpdate=()=>{
		this.props.showUpdate();
	}
	
	handleCloseDialogUpdate=()=>{
		this.props.handleCloseDialogUpdate();
	}
	
	handleUpdateProfile=()=>{
		this.props.handleUpdateProfile();
	}
	
	handleChange= name => event =>{
		this.props.handleChange(name,event);
	}
	
	responseFacebook=(response)=>{
		this.props.responseFacebook(response);
	}

	convettoLocaleString=(value)=>{
		return value.toLocaleString();
	}
	email=(email)=>{
		if(email !== undefined && email !== "" && email !== null){
			var text=email.substr(1, email.indexOf("@")-2)
			var a="";
			for(var i=0; i<text.length; i++){
				a=a+"*";
			}
			return email.replace(text,a);
		}
	}
	phone=(phone)=>{
		if(phone !== undefined && phone !== "" && phone !== null){
			console.log("AAAAAAAAAA", phone)
			var text=phone.substr(phone.length-3, phone.length-1)
			var a="";
			for(var i=0; i<text.length; i++){
				a=a+"*";
			}
			return phone.replace(text,a);
		}
	}

	render() {
		const {data, waiting,dialogUpdateOpen,openSnack,message,snackVariant,dialogLoginOpen,server}=this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { classes } = this.props;
		const { fullScreen } = this.props;
		var splayPoint=data.splayPoint;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}
		
		// let phoneNumber= data.phoneNumber;
		// let str_phone = "";
		// if (phoneNumber !== undefined && phoneNumber !== "") {
		// 	var trailingCharsIntactCount = 3;
		// 	str_phone = new Array(data.phoneNumber.length - (trailingCharsIntactCount - 1)).join('*') +
		// 		data.phoneNumber.substr(data.phoneNumber.length - trailingCharsIntactCount, trailingCharsIntactCount);
		// }
		return (<div className={classes.root}>
			<Grid container spacing={8}>
				<Grid item xs={12} md={8}>
					<Grid container spacing={8}>
						<Grid item xs={12} style={{ textAlign: "center" }}><h2>Hồ sơ cá nhân</h2></Grid>
						<Grid item xs={12} sm={6}>
							{(data.urlAvatar !== undefined && data.urlAvatar !== null) ? (<div style={{
								width: "60%",
								height: "100%",
								minHeight: "180px",
								margin: "auto",
								backgroundImage: "url(../default_ava.png)",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								backgroundSize: "contain"
							}}></div>) : (<div style={{
								width: "60%",
								height: "100%",
								margin: "auto",
								minHeight: "180px",
								backgroundImage: "url(../default_ava.png)",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								backgroundSize: "contain"
							}}></div>)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<List className="inbox-list-root">
								<ListItem>
									<ListItemText primary={(<span style={{ fontWeight: "500" }}>Họ tên <span style={{ color: secondary.main }}>*********</span></span>)} />
								</ListItem>
								<ListItem>
									<ListItemText primary={(<span style={{ fontWeight: "500" }}>Email <span style={{ color: secondary.main }}>{data.email ? this.email(data.email) : ""}</span></span>)} />
								</ListItem>
								<ListItem>
									<ListItemText primary={(<span style={{ fontWeight: "500" }}>Số điện thoại <span style={{ color: secondary.main }}>{data.phoneNumber ? this.phone(data.phoneNumber): ""}</span></span>)} />
								</ListItem>
								<ListItem>
									<ListItemText primary={(<span style={{ fontWeight: "500" }}>VIP <span style={{ color: secondary.main }}>{data.vipLevel}</span></span>)} />
								</ListItem>
								<ListItem>
									<ListItemText primary={(<span style={{ fontWeight: "500" }}>Thịt <span className="global-thit" style={{ color: "#f8b03c" }}>{splayPoint} <img alt="just alt"
										src="../thit.png" /></span></span>)} />
								</ListItem>
								<ListItem>
									<a style={{ textDecoration: "none", width: "100%" }} href="https://scoin.vn/thong-tin-ca-nhan"
										rel="noopener noreferrer" target="_blank">
										<Button
											color="secondary"
											onClick={this.showUpdate}
											variant="raised" style={{
												borderRadius: "20px",
												background: "linear-gradient(90deg,#22cab5,#3fe28f)",
												color: "#fff",
												padding: "10px",
												fontSize: "0.8em",
												whiteSpace: "nowrap",
												minWidth: "auto",
												minHeight: "auto"
											}}>Cập nhật hồ sơ</Button>
									</a>
								</ListItem>
							</List>
						</Grid>
						{(waiting) ? (<div className="global-loading">
						{(server !== true) ? (												
							<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
							src="../baotri.png" />)}
						</div>) : (
								<div></div>
							)}
					</Grid>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} md={4}>
						<RightArea></RightArea>
					</Grid>
				</Hidden>
			</Grid>
			<Dialog
				fullScreen={fullScreen}
				open={dialogUpdateOpen}
				onClose={this.handleCloseDialogUpdate}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">Cập nhật profile</DialogTitle>
				<DialogContent>
					<List className="inbox-list-root">
						<ListItem>
							<input
								type="file"
								onChange={(e) => this.handleChangeFile(e.target.files)}
							/>
						</ListItem>
						<ListItem>
							<TextField
								id="fullname"
								label="Họ tên"
								defaultValue={(data.fullName) ? data.fullName : ""}
								onChange={this.handleChange('fullname')}
								margin="normal"
							/>
						</ListItem>
						<ListItem>
							<TextField
								id="email"
								label="Email"
								defaultValue={(data.email) ? data.email : ""}
								onChange={this.handleChange('email')}
								margin="normal"
							/>
						</ListItem>
						<ListItem>
							<TextField
								id="phone"
								label="Số điện thoại"
								defaultValue={(data.phoneNumber) ? data.phoneNumber : ""}
								onChange={this.handleChange('phone')}
								margin="normal"
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Vip" secondary={data.vipLevel} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Thịt" secondary={(
								<span className="global-thit">{splayPoint} <img alt="just alt"
									src="../thit.png" /></span>)} />
						</ListItem>
					</List>
				</DialogContent>
				<DialogActions>
					<div>
						<Button onClick={this.handleCloseDialogUpdate} style={{color:"primary", borderRadius:"20px"}}>
							Đóng
		  </Button>
					</div>
					<div>
						<Button onClick={this.handleUpdateProfile} style={{
							borderRadius: "20px",
							background: "linear-gradient(90deg,#22cab5,#3fe28f)",
							color: "#fff",
							padding: "10px",
							fontSize: "0.8em",
							whiteSpace: "nowrap",
							minWidth: "auto",
							minHeight: "auto"
						}} >
							Lưu
		  </Button>
					</div>
				</DialogActions>
			</Dialog>
			<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

ProfileComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};
export default connect()(withMobileDialog()(withTheme()(withStyles(styles)(ProfileComponent))))
