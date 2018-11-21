import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData, changeCoin
} from '../../modules/coin'

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
		var _this = this;
		if (user !== null) {
			if(coin){
				this.props.getData(user.access_token, coin)
			}else{
				this.props.getData(user.access_token, 2)
			}
			
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}
	changeCoin=(packageXO, packageXu, coin)=>{
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.changeCoin(user.access_token, packageXO, packageXu, coin).then(function () {
				if(_this.props.status==="01"){
					_this.setState({ openSnack: true, message: "Đổi thành công", snackVariant: "success" });
				}else if(_this.props.status==="08"){
					_this.setState({ openSnack: true, message: "Quá hạn quy đổi", snackVariant: "info" });
				}else if(_this.props.status==="00"){
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

	render() {
		return (
			<div>
				<CoinComponent
					data={this.props.data}
					dataProfile={this.props.dataProfile}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
					changeCoin={this.changeCoin}
					handleCloseSnack={this.handleCloseSnack}

					message={this.state.message}
					openSnack={this.state.openSnack}
					snackVariant={this.state.snackVariant}
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
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeCoin
}, dispatch)


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Coin))