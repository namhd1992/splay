import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import {
	getData as getHistoryData,
	getMoreData as getMoreHistoryData
} from '../../modules/history'

import PhoneCardComponent from '../../components/page/PhoneCard'

class Phone_card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			expand: [],
			limit: 12,
			offset: 0,
			value: 0,
			loadedRecords:0
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("MÃ THẺ");
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			// _this.props.getData(user.access_token, user.scoinAccessToken);
			this.props.getHistoryData(user.access_token, this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreHistoryData(user.access_token, this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	handleExpandItem = (id) => {
		if (this.state.expand.indexOf(id) !== -1) {
			this.state.expand.splice(this.state.expand.indexOf(id), 1);
		} else {
			this.state.expand.push(id);
		}
		this.forceUpdate();
	}

	render() {
		
		return (
			<div>
				<PhoneCardComponent
					handleExpandItem={this.handleExpandItem}
					loadMoreAction={this.loadMoreAction}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					loginAction={this.loginAction}
					handleChange={this.handleChange}
					handleChangeIndex={this.handleChangeIndex}

					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					dataHistory={this.props.dataHistory}
					waitingHistory={this.props.waitingHistory}
					totalRecords={this.props.totalRecords}
					expand={this.state.expand}
					value={this.state.value}
					dialogLoginOpen={this.state.dialogLoginOpen}
					loadedRecords={this.state.loadedRecords}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	dataHistory: state.history.data,
	waitingHistory: state.history.waiting,
	totalRecords: state.history.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	changeTitle,
	getHistoryData,
	getMoreHistoryData
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Phone_card)