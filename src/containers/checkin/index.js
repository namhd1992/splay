import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/checkin.css'
import {
	getData,
	checkin
} from '../../modules/checkin'
import {
	changeTitle
} from '../../modules/global'

import CheckinComponent from '../../components/page/Checkin'


class Checkin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
		var _this = this;
		if (user !== null) {
			this.props.getData(user.access_token).then(function () {
				_this.props.changeTitle("ĐIỂM DANH");
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	checkin = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.checkin(user.access_token).then(function () {
			_this.props.getData(user.access_token);
		});
	}

	render() {
		
		return (
			<div>
				<CheckinComponent
					checkin={this.checkin}
					server={this.props.server}
					data={this.props.data}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.checkin.data,
	actiondata: state.checkin.actiondata,
	waiting: state.checkin.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	checkin,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checkin)