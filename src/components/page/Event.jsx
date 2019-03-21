import React from 'react'
import Modal from 'material-ui/Modal';
import Notification from '../../components/Notification'
import {
	FacebookShareButton,
} from 'react-share';
import copy from 'copy-to-clipboard';
import Hidden from 'material-ui/Hidden'
import '../../styles/event.css';


const FB = window.FB;

class EventComponent extends React.Component {

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
		}
	}

	componentWillMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.setState({auth:true, fullName:user.fullName, intValue:20000,whenSelect:"1px solid #00ccd4"});
		}
			// FB.login(function(response) {
			// 	if (response.authResponse) {
			// 			console.log('Authenticated!');
			// 			// location.reload(); //or do whatever you want
			// 		} else {
			// 				console.log('User cancelled login or did not fully authorize.');
			// 		}
			// 	},{
			// 			scope: 'id,email'
			// });
			// FB.getLoginStatus(function(response) {
			// 	if (response.status === 'connected') {
			// 		var uid = response.authResponse.userID;
			// 		// var email = response.authResponse.userEmail;
			// 		console.log('UID', uid)
					 
			// 	} else if (response.status === 'not_authorized') {
			// 		console.log('not_authorized')
			// 	} else {
			// 		console.log('unknow')
			// 	}
			//  });
		}

	// componentDidMount(){
	// 	window.fbAsyncInit = function () {
	// 		FB.init({
	// 			appId: '254750115436704',
	// 			autoLogAppEvents: true,
	// 			xfbml: true,
	// 			version: 'v3.2'
	// 		});
	// 		FB.api('/me', function(response) {
	// 			console.log("Response:",response);
	// 		}.bind(this));
	// 	}.bind(this);
	// 	(function(d, s, id) {
	// 		var js, fjs = d.getElementsByTagName(s)[0];
	// 		if (d.getElementById(id)) return;
	// 		js = d.createElement(s); js.id = id;
	// 		js.src = "//connect.facebook.net/en_US/sdk.js";
	// 		fjs.parentNode.insertBefore(js, fjs);
	// 	}(document, 'script', 'facebook-jssdk'));
	// }

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

	selectOptionCoin= (event) =>{
		this.setState({point: event/1000, pakageXu:event, intValue:event, whenSelect:"1px solid #00ccd4"})
		// this.props.selectPackage()
    }

	changePoint=()=>{
		if(this.state.intValue!==0){
			this.props.changePoint(this.state.pakageXu)
			this.setState({intValue:0, whenSelect:""});
		}
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

	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	copyText=()=>{
		copy(this.props.data.linkUserEvent);
	}
	
	handleOpenGame=()=>{
		this.props.handleOpenGame()
	}

	facebookLogin=()=> {
		// console.log('AA', FB)
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Authenticated!');
				// location.reload(); //or do whatever you want
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		},
		{
			scope: 'email,id'
		});
	}


	render() {
		const { openSnack,message,snackVariant, data, openModalLink, packageGift}=this.props;
		return (
			<div>
					<div className="logo" style={{ backgroundImage: "url(/../background_event.png)"}}>
						<div className="social">
							<span>
								<a className="a_home" href="http://mongchinhdo.vn/">Trang chủ</a>
								<a className="a_face" href="https://www.facebook.com/mongchinhdo.vn/">Fanpage</a>
							</span>
						</div>
						<div>
							<p className="title_event">SK Triệu hồi lệnh - Mộng Chinh Đồ H5</p>
						</div>
					</div>
					<div className="genlink">
						<div className="div_link">
							<img onClick={this.handleOpenModalLink} className="img_link" src="/../event_taolinktrieuhoi.png" alt="" />
							<img className="img_play_game" onClick={this.handleOpenGame} src="/../event_choigame.png" alt="" />
						</div>
						{/* <button onClick={this.facebookLogin}>TEST FACEBOOK</button> */}
						<div className="info_user">
										{(this.state.auth)?(	<div>
												<div style={{marginBottom: "15px"}}>
														<span>Xin chào: {this.state.fullName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span style={{color:"red", cursor:"pointer"}} onClick={this.logoutAction}>[Thoát]</span>
												</div>
												<div>
														<span>Điểm triệu hồi hiện tại:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#fac710"}}>{(data.eventPoint)? (data.eventPoint):0} điểm</span>
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
							<p style={{textAlign:"center"}}>👉TẠO LINK TRIỆU HỒI👉 KIẾM ĐIỂM 👉 ĐỔI ĐIỂM LẤY XU</p>
								{/* <img className="img_step" src="/../cacbuocthuchien_event.png" alt="" /> */}
						</div>
						</div>
						<ul>
							<li>
								Đăng nhập và tạo link triệu hồi. Share lên Facebook, messenger, group... hay bất cứ đâu bạn muốn
							</li>
							<li>
								Mỗi khi có người click vào link và hành động, bạn sẽ được thưởng điểm - dùng để đổi quà trong
								shop:
								<ul>
									<li>
										B1. Click CHƠI GAME và tạo nhân vật thành công
									</li>
									<li>
										B2. Quay lại link triệu hồi & Đăng nhập.
									</li>
								</ul>
							</li>
						</ul>
						
						<p style={{color:"#fff"}}>Lưu ý: </p>
						<ul>
							<li>
								Mỗi người chỉ được cộng điểm cho 1 tài khoản.
							</li>
							<li>
								Để đăng xuất tài khoản đang chơi: Click avatar nhân vật -> chọn Đăng xuất
							</li>
						</ul>
					</div>
					<div className="changePoint">
						<div style={{textAlign: "center", marginBottom: "50px"}}>
							<img className="img_shop" src="/../shopdoiqua_event.png" alt="" />
							<p className="point">Đang có {(data.eventPoint)? (data.eventPoint):0} điểm</p>
						</div>
									<p style={{textAlign: "center", color:"#fac710"}}>Xu có thể nạp vào game từ Scoin.vn: Chọn phương thức Nạp > Ví Xu</p>
							
						<div>
								<div className="xu_event">
									{/* <div className="divOptionXu">
										<select className="selectOptionXu" onChange={(event)=>this.selectOptionCoin(event)}>
											<option value="" selected disabled hidden>Chọn gói Xu muốn nhận</option>
													{(packageGift !==null) ? packageGift.map((obj,key) => {
															return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													}):(<div></div>)}
										</select>
									</div>
									<div className="divPrice">
										<span style={{marginRight:"20px"}}>Giá:</span><span>{this.state.point.toLocaleString()} điểm</span> 
									</div> */}
									<Hidden xsDown>
										<div className="optionLeft">
											<div style={{background:"#2b303b", borderRadius:"10px", height:"65px", marginBottom:"15px", cursor:"pointer", border:(this.state.intValue === 20000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(20000)}>
												<div style={{color:"#fff", padding:"5px 10px"}}>20,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} >Giá: 200 điểm</span></div>
											</div>
											<div style={{background:"#2b303b", borderRadius:"10px", height:"65px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 100000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(100000)}>
												<div style={{color:"#fff", padding:"5px 10px"}}>100,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 1,000 điểm</span></div>
											</div>
										</div>
										<div className="optionRight">
											<div style={{background:"#2b303b", borderRadius:"10px", height:"65px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 50000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(50000)}>
												<div style={{color:"#fff", padding:"5px 10px"}}>50,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 500 điểm</span></div>
											</div>
											<div style={{background:"#2b303b", borderRadius:"10px", height:"65px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 200000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(200000)}>
												<div style={{color:"#fff", padding:"5px 10px"}}>200,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 2,000 điểm</span></div>
											</div>
										</div>
									</Hidden>
									<Hidden smUp>
										<div className="optionLeft">
											<div style={{background:"#2b303b", borderRadius:"10px", height:"60px", marginBottom:"15px", cursor:"pointer", border:(this.state.intValue === 20000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(20000)}>
												<div style={{color:"#fff", padding:"10px 10px"}}>20,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} >Giá: 200 điểm</span></div>
											</div>
											<div style={{background:"#2b303b", borderRadius:"10px", height:"60px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 50000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(50000)}>
												<div style={{color:"#fff", padding:"10px 10px"}}>50,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 500 điểm</span></div>
											</div>
											<div style={{background:"#2b303b", borderRadius:"10px", height:"60px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 100000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(100000)}>
												<div style={{color:"#fff", padding:"10px 10px"}}>100,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 1,000 điểm</span></div>
											</div>
											<div style={{background:"#2b303b", borderRadius:"10px", height:"60px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 200000)?this.state.whenSelect:""}} onClick={()=>this.selectOptionCoin(200000)}>
												<div style={{color:"#fff", padding:"10px 10px"}}>200,000 Xu</div>
												<div style={{color:"#fff", textAlign:"right"}}><span style={{ color: "#df0000", paddingRight:"15px" }} > Giá: 2,000 điểm</span></div>
											</div>
										</div>
									</Hidden>
								</div>
								<button className="btnChangePoint" onClick={this.changePoint}>ĐỔI</button>
								{/* <p className="statusChangePoint" style={{ color:statusColor}}>{status}</p> */}
							</div>

							</div>
					<div className="footer" style={{color:"#fff"}}>
						<img src="/../logo_vtc.png" alt="" />
						<p>Copyright 2013 VTCMobile - Công ty Cổ phần VTC Dịch Vụ Di Động</p>
						<p>Địa chỉ: Tầng 11 - Tòa nhà VTC Online - 18 Tam Trinh - Hà Nội.</p>
						<p>Liên hệ hợp tác: dangnh@vtc.vn Hỗ trợ: 19001104</p>
					</div>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
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
								<input style={{width: "100%", height: "40px", border: "0px solid", borderRadius: "10px", backgroundColor: "#1a1a1a", color: "#3578ff"}} type="text" value={data.linkUserEvent}/>
								<div style={{width: "100%", margin: "20px 0px"}}>
								<button style={{backgroundColor: "#12cdd4", border: "0px solid", borderRadius: "10px", width: "45%"}}><FacebookShareButton url={data.linkUserEvent}><button style={{color:"#fff", backgroundColor: "#12cdd4",borderRadius: "10px", border: "0px solid", width: "100%", height: "40px", cursor: "pointer"}}>SHARE</button></FacebookShareButton></button>
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
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
			
		)
	}
}

export default EventComponent