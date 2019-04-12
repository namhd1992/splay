import React from 'react'
import Modal from 'material-ui/Modal';
import Notification from '../../components/Notification'
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText } from 'material-ui/List'
import {
	FacebookShareButton,
} from 'react-share';
import PopupTruyKich from '../../components/PopupTruyKich'
import copy from 'copy-to-clipboard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import Dialog, {
	DialogActions,
	DialogContent,
	withMobileDialog
} from 'material-ui/Dialog'
import '../../styles/truykich.css';

class EventTruyKichComponent extends React.Component {

	constructor(props){
		super(props);
		this.state={
			intValue:0,
			whenSelect:"",
			point:0,
			pakageXu:0,
			auth:false,
			fullName:'',
			openModalLink:false,
			dialogItemOpen: false,
			dialogUserEmpty: false,
			idServer:0,
			serverName:'',
			nameItem:'',
		}
	}

	componentWillMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.setState({auth:true, fullName:user.fullName, intValue:20000,whenSelect:"1px solid #00ccd4"});
		}
	}

	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}${currentPath}&action=logout&agencyid=0`,
			// `http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}${currentPath}&action=logout&agencyid=0`
		);
	}

	selectOptionCoin= (option) =>{
		this.setState({nameItem:option.item.name})
		this.props.selectOptionCoin(option.item.id);
  	}

	// changePoint=()=>{
	// 	this.props.handleOpenModalInfoGame();
	// }

	buyItem=()=>{
		this.props.buyItem(this.state.idServer)
	}

	getScoinToken=(paramName)=>{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('='); //split key and value
			if (pArr[0] == paramName) 
				return pArr[1]; //return value
		}
		return '';
	}

	handleCloseModalLink=()=>{
		this.props.handleCloseModalLink();
	}

	handleOpenModalLink=()=>{
		this.props.handleOpenModalLink();
	}

	handleCloseModalInfoGame=()=>{
		this.props.handleCloseModalInfoGame();
	}


	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	copyText=()=>{
		copy(this.props.data.linkUserEvent);
	}
	
	handleOpenGame=()=>{
		this.props.handleOpenGame()
	}
	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};
	
	selectServer=(event)=>{
		this.setState({idServer:+event.target.value})
	}

	selectObject=(event)=>{

	}

	openComfirm=()=>{
		const {idServer}=this.state;
		if(idServer===0){
			this.setState({serverName:"Miền Bắc"})
		}else{
			this.setState({serverName:"Miền Nam"})
		}
		this.setState({dialogItemOpen:true})
		this.handleCloseModalInfoGame();
	}

	openListUser=()=>{

		this.props.openListUser();
	}
	closeListUser=()=>{
		this.props.closeListUser();
	}
	openDialogUserEmpty=()=>{
		this.props.openDialogUserEmpty();
	}
	closeDialogUserEmpty=()=>{
		this.props.closeDialogUserEmpty();
	}

	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}
	login=()=>{
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}


	render() {
		const { openSnack,message,snackVariant,dialogLoginOpen, data, openModalLink, openModalInfoGame, dialogUserEmpty, isOpenListUser, itemEvents, day, hour, minute, second, isLogin}=this.props;
		var arrLeft=[];
		var arrRight=[];
		var arr=[];
		if(itemEvents!==null){
			var n=itemEvents.length;
			if(n%2===0){
				arrLeft=itemEvents.slice(0, n/2);
				arrRight=itemEvents.slice(n/2, n);
			}else{
				var k=Math.ceil(n/2);
				arrLeft=itemEvents.slice(0, k);
				arrRight=itemEvents.slice(k, n);
			}
			arr=itemEvents
		}
		var listServer=[{name:"Miền Bắc", serverGameId:0}, {name:"Miền Nam", serverGameId:1}]
		// var listObject=["Gamer1", "Gamer2", "Gamer3"]
		return (
			<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
				<Grid container style={{
					margin: "0px",
					width: "100%",
					backgroundImage: "url('/../TRK-truy-kich-bùng-nổ-2.png')",
					backgroundSize: "100% auto",
					backgroundPosition: "center top",
					backgroundRepeat: "no-repeat"}} justify="center">
					<Grid item xs={12} style={{textAlign:"center"}}>
						<span style={{border:"1px solid #fff", padding:"5px", borderRadius:"0px 0px 5px 5px"}}>
							<a className="a_home" href="http://truykich.vn/">Trang chủ</a>
							<a className="a_face" href="https://www.facebook.com/truykich.vn/">Fanpage</a>
						</span>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: "50%" }}>
					</Grid>
					
				</Grid>
				<Grid item xs={12} style={{ textAlign:'center', marginTop:"10px", marginBottom:"20px" }}>
					<span style={{color:"#fff"}}>Thời gian sự kiện:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#fac710"}}>CÒN {day} NGÀY - {hour} GIỜ - {minute} PHÚT - {second} GIÂY</span>
				</Grid>
				<Grid item xs={12} style={{ textAlign:'center' }}>
							<img onClick={this.handleOpenModalLink} className="img_link" src="/../event_taolinktrieuhoi.png" alt="" />
							<img className="img_play_game" onClick={this.handleOpenGame} src="/../event_choigame.png" alt="" />
				</Grid>
				<Grid item xs={12}>
					<div className="genlink">
						<div className="info_user">
										{(this.state.auth)?(	<div>
												<div style={{marginBottom: "15px"}}>
														<span>Xin chào xạ thủ: {this.state.fullName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span style={{color:"red", cursor:"pointer"}} onClick={this.logoutAction}>[Thoát]</span>
												</div>
												<div>
														<span>Điểm triệu hồi hiện tại:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#fac710"}}>{(data !==null && data.eventPoint)? (data.eventPoint):0} điểm</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{textDecoration:'underline', cursor:'pointer'}} onClick={this.openListUser}>Chi tiết</span>
												</div>
										</div>):(	<div id="login">
												<span>Đại hiệp cần đăng nhập để tạo link triệu hồi</span>
												<span className="btn_login" onClick={this.loginAction}>Đăng nhập</span>
										</div>)}
						</div>
					</div>
					<div className="play">
						<div>
							<div style={{textAlign: "center"}}>
								<img className="img_play" src="/../cachchoi_event.png" alt="" />
							</div>
						<div>
							<p style={{textAlign:"center"}}>👉TẠO LINK TRIỆU HỒI👉 KIẾM ĐIỂM 👉 ĐỔI PHẦN THƯỞNG</p>
								{/* <img className="img_step" src="/../cacbuocthuchien_event.png" alt="" /> */}
						</div>
						</div>
						<ul>
							<li>
								Đăng nhập và tạo link triệu hồi. Share lên Facebook, messenger, group... hay bất cứ đâu bạn muốn
							</li>
							<li>
								Mỗi khi có người click vào link và chơi game bạn sẽ được cộng 5 điểm
							</li>
							<li>
							Điểm tích lũy dùng để đổi vật phẩm Hot trong shop
							</li>
						</ul>
						
						<p style={{color:"#fff"}}>Lưu ý: </p>
						<ul>
							<li>
								Bạn sẽ chỉ được tích điểm khi các tài khoản đăng nhập là tài khoản tạo trước ngày 12/04/2019
							</li>
							<li>
								Bạn được cộng điểm cho lần đăng nhập và chơi game đầu tiên của 1 tài khoản (những lần đăng nhập tiếp theo không được tính)
							</li>
						</ul>
					</div>
				</Grid>
				<Grid item xs={12} >
					<div className='changePoint'>
						<div style={{textAlign: "center"}}>
							<img className="img_shop" src="/../doiquatruykich_event.png" alt="" />
						</div>
						<p style={{textAlign: "center", color:"#fac710"}}>Hướng dẫn: Chọn vật phẩm muốn đổi > Chọn server > Xác nhận</p>
						<div>
							<p>Danh sách phần thưởng <span style={{color:"red", float:"right", marginRight:"10px"}}>Đang có {(data !==null && data.eventPoint)? (data.eventPoint):0} điểm</span></p>
						</div>
							
						<div style={{ textAlign:'center' }}>
							<div className="xu_event">
								<Hidden xsDown>
									<div className="optionLeft">
										{arrLeft.map((obj,key)=>{
										return 	<Grid key={key} container style={{
											margin: "0px",
											width: "100%",
											backgroundImage: "url('/../truykich.jpg')",
											backgroundSize: "100% auto",
											cursor:"pointer",
											backgroundPosition: "center top",
											marginBottom:"20px",
											backgroundRepeat: "no-repeat",
											border:"1px solid #4bb525"}} justify="center"  onClick={()=>this.selectOptionCoin(obj)}>

											<Grid item xs={12} style={{textAlign:"center"}}>
													<div className="nameItemTruyKich" style={{textAlign:'left'}}>{obj.item.name}</div>
													<span className="priceItemTruyKich"><span className="priceItem">{obj.newPrice} ĐIỂM</span><span className="statusItem">ĐÃ ĐỔI</span></span>
											</Grid>
										</Grid>
										})}
									</div>
									<div className="optionRight">
									{arrRight.map((obj,key)=>{
											return 	<Grid key={key} container style={{
												margin: "0px",
												width: "100%",
												backgroundImage: "url('/../truykich.jpg')",
												backgroundSize: "100% auto",
												cursor:"pointer",
												backgroundPosition: "center top",
												marginBottom:"20px",
												backgroundRepeat: "no-repeat",
												border:"1px solid #4bb525"}} justify="center" onClick={()=>this.selectOptionCoin(obj)}>
												<Grid item xs={12} style={{textAlign:"center"}}>
													 <div className="nameItemTruyKich" style={{textAlign:'left'}}>{obj.item.name}</div>
													 <span className="priceItemTruyKich"><span className="priceItem">{obj.newPrice} ĐIỂM</span><span className="statusItem">ĐÃ ĐỔI</span></span>
												</Grid>
												
											</Grid>
										})}
									</div>
								</Hidden>
								<Hidden smUp>
									<div className="optionLeft">
										{arr.map((obj,key)=>{
											return 	<Grid key={key} container style={{
												margin: "0px",
												width: "100%",
												backgroundImage: "url('/../truykich.jpg')",
												backgroundSize: "100% auto",
												cursor:"pointer",
												backgroundPosition: "center top",
												marginBottom:"20px",
												backgroundRepeat: "no-repeat",
												border:"1px solid #4bb525"}} justify="center" onClick={()=>this.selectOptionCoin(obj)}>
												<Grid item xs={12} style={{textAlign:"center"}}>
													 <div className="nameItemTruyKich" style={{textAlign:'left'}}>{obj.item.name}</div>
													 <span className="priceItemTruyKich"><span className="priceItem">{obj.newPrice} ĐIỂM</span><span className="statusItem">ĐÃ ĐỔI</span></span>
												</Grid>
												
											</Grid>
										})}
									</div>
								</Hidden>
							</div>
							<button style={{visibility:"hidden"}} className="btnTruyKich">ĐỔI</button>
								{/* <p className="statusChangePoint" style={{ color:statusColor}}>{status}</p> */}
						</div>
					</div>
				</Grid>
				<Grid item xs={12} className="footerTryKich">
					<img src="/../logo_vtc.png" alt="" />
					<p>Copyright 2013 VTCMobile - Công ty Cổ phần VTC Dịch Vụ Di Động</p>
					<p>Địa chỉ: Tầng 11 - Tòa nhà VTC Online - 18 Tam Trinh - Hà Nội.</p>
					<p>Liên hệ hợp tác: dangnh@vtc.vn Hỗ trợ: 19001104</p>
				</Grid>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						disableAutoFocus={true}
						open={openModalLink}
						style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
						onClose={this.handleCloseModalLink}
						>
						<div className="popupGenLink" style={{ backgroundColor:"#212833"}}>
							<div style={{marginBottom:"50px"}}>
								<span className="titlePopupGenLink">Link triệu hồi của bạn</span>
								<img style={{float:'right', zIndex:"1", cursor:"pointer"}} src="/../close.png" alt="close popup" onClick={this.handleCloseModalLink} />
							</div>
							<div style={{padding:"0px 20px"}}>
								<input style={{width: "100%", height: "40px", border: "0px solid", borderRadius: "10px", backgroundColor: "#1a1a1a", color: "#3578ff"}} type="text" value={(data !==null && data.linkUserEvent)? data.linkUserEvent : ''}/>
								<div style={{width: "100%", margin: "20px 0px"}}>
								<button style={{backgroundColor: "#12cdd4", border: "0px solid", borderRadius: "10px", width: "45%"}}><FacebookShareButton url={(data !==null && data.linkUserEvent)? data.linkUserEvent : ''}><button style={{color:"#fff", backgroundColor: "#12cdd4",borderRadius: "10px", border: "0px solid", width: "100%", height: "40px", cursor: "pointer"}}>SHARE</button></FacebookShareButton></button>
									<button style={{color:"#fff", backgroundColor: "#f24726", border: "0px solid", borderRadius: "10px", textAlign: "center", width: "45%", height: "40px", float:"right", cursor: "pointer"}} onClick={this.copyText}>COPY LINK</button>
								</div>
								<ul style={{marginLeft: "-20px"}}>
									<li>
										Share link triệu hồi này lên Facebook cá nhân, messenger, group... hoặc copy & paste lên bất cứ đâu bạn muốn và kêu gọi mọi người tham gia.
									</li>
								</ul>
							</div>
						</div>
					</Modal>

					<Dialog
							open={openModalInfoGame}
							onClose={this.handleCloseModalInfoGame}
							aria-labelledby="responsive-dialog-title"
					>
							<DialogContent style={{padding:"10px 20px"}}>
								<div>
									<p style={{color:"#fff", fontSize:"18px"}}>Chọn Server</p>
									<div className="divServer">
											<select className="selectServer" onChange={(event)=> this.selectServer(event)}>
														{(listServer !==null) ? listServer.map((obj,key) => {
																return <option key={key}
															value={obj. serverGameId}>{obj.name.toLocaleString()}</option>;
														}):(<div></div>)}
											</select>
									</div>
								</div>
							</DialogContent>
							<DialogActions style={{padding:"10px 15px"}}>
								<div>
									<Button onClick={this.handleCloseModalInfoGame} style={{ color: "#888787", marginRight:"10px"}}>Đóng</Button>
									<Button style={{ color: "#fff", background:"#00ccd4"}} onClick={this.openComfirm}>XÁC NHẬN</Button>	
											
								</div>
							</DialogActions>
					</Dialog>

					<Dialog
							open={this.state.dialogItemOpen}
							onClose={this.handleCloseDialogItem}
							aria-labelledby="responsive-dialog-title"
					>
							<DialogContent>
								<p style={{color:"#fff"}}>Xác nhận đổi vật phẩm '{this.state.nameItem}'</p>
								<p style={{color:"#808080"}}>Vật phẩm này sẽ được thêm vào nhân vật tại server '{this.state.serverName}'</p>	
							</DialogContent>
							<DialogActions>
									<div>
										<Button onClick={this.handleCloseDialogItem} style={{ color: "#888787", marginRight:"10px"}}>
													Đóng
											</Button>
											
											<Button style={{ color: "#fff", background:"#00ccd4"}} onClick={this.buyItem}>XÁC NHẬN</Button>
											
									</div>
							</DialogActions>
					</Dialog>

					<Dialog
							open={dialogLoginOpen}
							// onClose={this.handleCloseDialogLogin}
							aria-labelledby="responsive-dialog-title"
					>
							<DialogContent>
								<p style={{color:"#28b5a5"}}>Đăng nhập</p>
								<p style={{color:"#fff"}}>Tính năng này yêu cầu đăng nhập</p>	
							</DialogContent>
							<DialogActions>
									<div>
									{(isLogin)?(<div></div>):(<Button onClick={this.handleCloseDialogLogin} style={{ color: "#888787", marginRight:"10px"}}>
													Đóng
											</Button>)}
											<Button style={{ color: "#fff", background:"#00ccd4"}} onClick={this.login}>ĐĂNG NHẬP</Button>
											
									</div>
							</DialogActions>
					</Dialog>

					<Dialog
							open={dialogUserEmpty}
							onClose={this.closeDialogUserEmpty}
							aria-labelledby="responsive-dialog-title"
					>
							<DialogContent>
								<p style={{color:"#fff"}}>Danh sách trống hãy triệu hồi để nhận thêm điểm</p>
							</DialogContent>
							<DialogActions>
									<div>
											<Button onClick={this.closeDialogUserEmpty} style={{ color: "#888787"}}>
													Đóng
											</Button>
											
									</div>
							</DialogActions>
					</Dialog>
					{(data!==null)?(<PopupTruyKich
						handleCloseBonus={this.closeListUser}
						isOpenListUser={isOpenListUser}
						userChildents={data.userChildents}
					/>):(<div></div>)}
					
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</Grid>
			
		)
	}
}

export default EventTruyKichComponent