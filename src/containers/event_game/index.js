import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EventComponent from '../../components/page/Event'
import {
	changePoint
} from '../../modules/event'

class EventGame extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status:'',
			statusColor:'#12cdd4',
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	selectPackage=()=>{
		this.setState({status:''})
	}
	changePoint=(scoinToken, point)=>{
		if(scoinToken!==""){
			if(point!==0){
				this.props.changePoint(scoinToken, 1, point).then(v=>{
					if(v.status==="01"){
						this.setState({status:'Đổi thành công, Xu được cộng vào tài khoản',statusColor:'#12cdd4',})
					}else if(v.status==="04"){
						this.setState({status:'Số điểm của bạn không đủ để đổi',statusColor:'#f24726',})
					}else if(v.status==="05"){
						this.setState({status:'Hiện tại số quà đã hết',statusColor:'#f24726',})
					}else if(v.status==="-3"){
						this.setState({status:'Tài khoản không tồn tại',statusColor:'#f24726',})
					}else{
						this.setState({status:'Đã có lỗi, liên hệ admin',statusColor:'#f24726',})
					}
				})
			}else{
				this.setState({status:'Bạn chưa chọn gói',statusColor:'#f24726',})
			}
		}else{
			this.setState({status:'Bạn chưa đăng nhập',statusColor:'#f24726',})
		}
	}

	render() {
		return (
			<div>
				<EventComponent 
					status={this.state.status}
					statusColor={this.state.statusColor}
					changePoint={this.changePoint}
					selectPackage={this.selectPackage}
				/>
			</div>
		)

	}
}


const mapStateToProps = state => ({
	data: state.event.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	changePoint
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventGame)