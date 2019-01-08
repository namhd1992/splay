import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData, changeCoin
} from '../../modules/coin'
import {
	closePopup
} from '../../modules/server'

import {
	getData as getDataProfile
} from '../../modules/profile'

import { withRouter } from 'react-router-dom'
import CoinComponent from '../../components/page/Coin'


class Coin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			messageServer:"Đã có lỗi từ hệ thống.",
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var coin=localStorage.getItem("Coin");
		var serviceId=localStorage.getItem("serviceId");
		var _this = this;
		if (user !== null) {
			if(coin){
				this.props.getData(user.access_token, coin, serviceId)
			}else{
				this.props.getData(user.access_token, 2)
			}
			
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}
	changeCoin=(packageXO, packageXu, type)=>{
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var coin=localStorage.getItem("Coin");
		var serviceId=localStorage.getItem("serviceId");
		if (user !== null) {
			this.props.changeCoin(user.access_token, packageXO, packageXu, type, serviceId).then(function () {
				var status=_this.props.status;
				if(status==="01"){
					_this.setState({ openSnack: true, message: "Đổi thành công", snackVariant: "success" });
					_this.props.getData(user.access_token, coin, serviceId)
					_this.props.getDataProfile(user.access_token, user.scoinAccessToken)
				}else if(status==="-55"){
					_this.setState({ openSnack: true, message: "Số dư Xu không đủ", snackVariant: "info" });
				}else if(status==="-304"){
					_this.setState({ openSnack: true, message: "Dịch vụ này không tồn tại hoặc đang tạm dừng", snackVariant: "info" });
				}else if(status==="-1004"){
					_this.setState({ openSnack: true, message: "Vượt quá giới hạn nạp XO", snackVariant: "info" });
				}else if(status==="-1005"){
					_this.setState({ openSnack: true, message: "Vượt quá giới hạn rút XO", snackVariant: "info" });
				}else if(status==="-1001"){
					_this.setState({ openSnack: true, message: "Số dư XO không đủ", snackVariant: "info" });
				}else if(status==="00" || status==="02" || status==="-99" || status==="-1003" || status==="-1099" ){
					_this.setState({ openSnack: true, message: "Lỗi hệ thống", snackVariant: "error" });
				}
				
			});
		} else {
			this.setState({ dialogLoginOpen: true });
		}
	}
	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}
	handleCloseErrorServer = () => {
		this.props.closePopup();
	}

	render() {
		return (
			<div>
				<CoinComponent
					data={this.props.data}
					dataProfile={this.props.dataProfile}
					server={this.props.server}
					serverChange={this.props.serverChange}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
					changeCoin={this.changeCoin}
					handleCloseSnack={this.handleCloseSnack}
				
					message={this.state.message}
					openSnack={this.state.openSnack}
					snackVariant={this.state.snackVariant}
					openSnackErrorServer={this.props.serverChange}
					handleCloseErrorServer={this.handleCloseErrorServer}
					messageServer={this.state.messageServer}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	data: state.coin.data,
	dataProfile: state.profile.data,
	waiting: state.coin.waiting,
	status: state.coin.status,
	server:state.server.serverError,
	serverChange:state.server.serverErrorOther,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeCoin,
	getDataProfile,
	closePopup
}, dispatch)


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Coin))