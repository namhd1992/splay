import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EventTruyKichComponent from '../../components/page/EventTruyKich';
import {
	buyItem, getLink, addPoint, eventGame
} from '../../modules/truykich'

class GameTruyKich extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status:'',
			statusColor:'#12cdd4',
			openSnack: false,
			message: "",
			snackVariant: "info",
			data:null,
			openModalLink:false,
			openModalInfoGame:false,
			itemEvents:null,
			dialogUserEmpty: false,
			isOpenListUser:false,
			serverGameId:0,
			itemId:0,
			eventGameId:0,
			toDate:0,
			day:0,
			hour:0, 
			minute:0, 
			second:0,
			dialogLoginOpen:false,
			isLogin:false,

		};
	}


	componentWillMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		var path=window.location.pathname;
		var len=path.length;
		var n=path.lastIndexOf('/');
		var str=path.substring(n+1,len);
		
		if (user === null) {
			if(str.indexOf("-Truy-")===-1 && str!==""){
				this.setState({dialogLoginOpen:true, isLogin:true});
			}
		}
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	// selectPackage=()=>{
	// 	this.setState({status:''})
	// }
	componentDidMount(){
		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		this.props.eventGame().then(()=>{
			var data= _this.props.dataEventGame;
			if(data!==undefined){
				if(data.status==="01"){
					this.timeRemain(data.data.eventGame.toDate)
					this.setState({itemEvents:data.data.itemEvents, toDate:data.data.eventGame.toDate});
				}
			}
		});
		if(user !== null){
			this.getLink(user);
		}
	}

	timeRemain=(toDate)=>{
		var _this=this;
		setInterval(()=>{
			var time=(toDate-Date.now())/1000;
			var day=Math.floor(time/86400);
			var hour=Math.floor((time%86400)/3600);
			var minute=Math.floor(((time%86400)%3600)/60);
			var second=Math.ceil(((time%86400)%3600)%60);
			_this.setState({day:day, hour: hour, minute: minute, second:second})
			// console.log('TIME:',time,"DAY:",day,"HOUR:",hour,"MINUTE:",minute,"SECOND:", second)
		}, 1000);
	}

	getLink=(user)=>{
		var _this=this;
		this.props.getLink(user.access_token).then(()=>{
			var data= _this.props.dataLink;
			if(data!==undefined){
				if(data.status==="01"){
					this.setState({data:data.data})
					_this.addPoint(user.access_token);
				}else{
					this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
				}
			}
		});
	}
	buyItem=(idServer)=>{

		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.buyItem(this.state.data.eventGameId, this.state.itemId, idServer, user.access_token).then(() => {
				var data= _this.props.data;
				if(data!==undefined){
					if(data.status==="01"){
						this.setState({openSnack:true, message:'Đổi thành công, vật phẩm thêm vào nhân vật',snackVariant:'success'})
						_this.getLink(user);
					}else if(data.status==="05"){
						this.setState({openSnack:true, message:'Số điểm của bạn không đủ để đổi',snackVariant:'info',})
					}else if(data.status==="04"){
						this.setState({openSnack:true, message:'Người dùng chưa tham gia sự kiện',snackVariant:'info',})
					}else if(data.status==="02"){
						this.setState({openSnack:true, message:'Dữ liệu không đúng',snackVariant:'info',})
					}else{
						this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
					}
				}
			})
		}else{
			this.setState({dialogLoginOpen:true, isLogin:false});
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	handleCloseModalLink=()=>{
		this.setState({openModalLink:false});
	}

	handleOpenModalLink=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.setState({openModalLink:true});
		}else{
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}
	}

	handleOpenGame=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			var win = window.open('http://truykich.vn/', '_blank');
			win.focus();
		}else{
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}
	}

	addPoint=(token, data)=>{
		var _this=this;
		var path=window.location.pathname;
		var len=path.length;
		var n=path.lastIndexOf('/');
		var str=path.substring(n+1,len);
		var faceId='';
		if(str.indexOf("-Truy-")===-1 && str!==""){
			this.props.addPoint(token, str, faceId).then(()=>{
				var data= _this.props.dataPoint;
				if(data!==undefined){
					if(data.status==="01"){
					}else if(data.status==="03"){
						this.setState({openSnack:true, message:'Không tìm thấy sự kiện hiện tại',snackVariant:'info',})
					}else if(data.status==="-02"){
						this.setState({openSnack:true, message:'Chưa chơi game',snackVariant:'info',})
					}else if(data.status==="-03"){
						this.setState({openSnack:true, message:'Tài khoản đã dùng cho người chơi khác',snackVariant:'info',})
					}else if(data.status==="-04"){
						this.setState({openSnack:true, message:'Không dùng link của chính mình',snackVariant:'info',})
					}else{
						this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
					}
				}
			})
		}
	}

	selectOptionCoin=(itemId)=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.setState({openModalInfoGame:true, itemId:itemId})
		}else{
			this.setState({dialogLoginOpen:true, isLogin:false});
		}
	}


	handleCloseModalInfoGame=()=>{
		this.setState({openModalInfoGame:false})
	}

	openListUser=()=>{
		const {data}=this.state;
		if(data.userChildents.length>0){
			this.setState({isOpenListUser:true});
		}else{
			this.openDialogUserEmpty();
		}
		
	}
	closeListUser=()=>{
		this.setState({isOpenListUser:false});
	}
	openDialogUserEmpty=()=>{
		this.setState({dialogUserEmpty:true})
	}
	closeDialogUserEmpty=()=>{
		this.setState({dialogUserEmpty:false})

	}
	handleCloseDialogLogin=()=>{
		this.setState({dialogLoginOpen:false});
	}

	render() {
		return (
			<div>
				<EventTruyKichComponent 
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					openSnack={this.state.openSnack}
					data={this.state.data}
					openModalLink={this.state.openModalLink}
					openModalInfoGame={this.state.openModalInfoGame}
					itemEvents={this.state.itemEvents}
					dialogUserEmpty={this.state.dialogUserEmpty}
					isOpenListUser={this.state.isOpenListUser}
					day={this.state.day}
					hour={this.state.hour}
					minute={this.state.minute}
					second={this.state.second}
					isLogin={this.state.isLogin}


					handleCloseSnack={this.handleCloseSnack}
					selectOptionCoin={this.selectOptionCoin}
					handleCloseModalLink={this.handleCloseModalLink}
					handleOpenModalLink={this.handleOpenModalLink}
					handleCloseModalInfoGame={this.handleCloseModalInfoGame}
					handleOpenGame={this.handleOpenGame}
					openListUser={this.openListUser}
					closeListUser={this.closeListUser}
					openDialogUserEmpty={this.openDialogUserEmpty}
					closeDialogUserEmpty={this.closeDialogUserEmpty}
					dialogLoginOpen={this.state.dialogLoginOpen}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					buyItem={this.buyItem}
					// getData={this.getData}
					// selectPackage={this.selectPackage}
				/>
			</div>
		)

	}
}


const mapStateToProps = state => ({
	data: state.event.data,
	dataLink: state.event.dataLink,
	dataPoint:state.event.dataPoint,
	dataEventGame:state.event.dataEventGame,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	buyItem,
	getLink,
	addPoint,
	eventGame,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameTruyKich)