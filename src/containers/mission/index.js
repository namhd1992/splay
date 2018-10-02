import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData,
	finishData
} from '../../modules/mission'
import {
	changeTitle
} from '../../modules/global'
import MissionComponent from '../../components/page/Mission'

class Mission extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogDetailOpen: false,
			dialogContent: "",
			loadedRecords: 0,
			message: "",
			openSnack: false,
			dialogLoginOpen: false,
			snackVariant: "info",
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			this.props.getData(this.state.limit, this.state.offset, user.access_token).then(function () {
				_this.props.changeTitle("NHIỆM VỤ");
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, user.access_token);
		this.setState({
			loadedRecords: _this.state.limit + newOffset,
			offset: newOffset
		});
	}

	doMission = (action, id, value, objectGame) => {
		switch (parseInt(action.substring(action.length - 1), 10)) {
			case 1:
				window.location.href = '/lucky';
				break;
			case 2:
				window.location.href = '/checkin';
				break;
			case 3:
				window.location.href = '/auctiondetail/' + id;
				break;
			case 4:
				window.location.href = '/giftcodedetail/' + id;
				break;
			case 5:
				window.location.href = '/gamedetail/' + objectGame.id;
				break;
			case 8:
				window.location.href = '/gamedetail/' + objectGame.id;
				break;
			default:
				window.location.assign(value);
				break;
		}
	}

	reward = (id) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.finishData(id, user.scoinAccessToken, user.access_token).then(function (response) {
			_this.props.getData(_this.state.limit, _this.state.offset, user.access_token);
		}).catch(function (err) {
			console.log(err);
		});
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	showDetail = (detail) => {
		this.setState({ dialogDetailOpen: true, dialogContent: detail });
	}

	handleCloseDialogDetail = () => {
		this.setState({ dialogDetailOpen: false });
	};

	render() {
		return (
			<div>
				<MissionComponent
					handleCloseDialogDetail={this.handleCloseDialogDetail}
					showDetail={this.showDetail}
					handleCloseSnack={this.handleCloseSnack}
					reward={this.reward}
					doMission={this.doMission}
					loadMoreAction={this.loadMoreAction}

					data={this.props.data}
					dataFinish={this.props.dataFinish}
					totalRecords={this.props.totalRecords}
					waiting={this.props.waiting}
					dialogDetailOpen={this.state.dialogDetailOpen}
					dialogContent={this.state.dialogContent}
					loadedRecords={this.state.loadedRecords}
					message={this.state.message}
					openSnack={this.state.openSnack}
					dialogLoginOpen={this.state.dialogLoginOpen}
					snackVariant={this.state.snackVariant}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.mission.data,
	dataFinish: state.mission.dataFinish,
	totalRecords: state.mission.totalRecords,
	waiting: state.mission.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	finishData,
	getMoreData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mission)