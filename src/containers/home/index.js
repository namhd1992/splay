import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getData, getDataMission } from '../../modules/home'
import { finishData } from '../../modules/mission'
import { getData as getArticleData } from '../../modules/article'
import { changeTitle } from '../../modules/global'

import HomeComponent from '../../components/page/Home'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			logged: false,
			dialogDetailOpen: false,
			dialogContent: "",
			title_dialog:"",
			canClick: true
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.changeTitle("");
		if (user !== null) {
			this.setState({ logged: true });
			this.props.getDataMission(6, 0, user.access_token);
		} else {
			this.setState({ logged: false });
		}
		this.props.getData();
		this.props.getArticleData(6, 0);
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	doMission = (action, id, value, scoinGameId) => {
		switch (+action) {
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
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 8:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 9:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 10:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			default:
				window.location.assign(value);
				break;
		}
	}

	showDetail = (detail,title) => {
		this.setState({ dialogDetailOpen: true, dialogContent: detail,title_dialog: title });
	}


	handleCloseDialogDetail = () => {
		this.setState({ dialogDetailOpen: false });
	};

	reward = (id) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.finishData(id, user.scoinAccessToken, user.access_token).then(function (response) {
			_this.props.getDataMission(6, 0, user.access_token);
			if(_this.props.status==="03"){
				_this.setState({ dialogDetailOpen: true, dialogContent: _this.props.message_server, title_dialog:"Error"});
			}
		}).catch(function (err) {
			console.log(err);
		});
	}

	handlePointerDown = () => {
		this.setState({ canClick: true });
	}

	handlePointerUp = (url) => {
		if (this.state.canClick) {
			window.open(url, "_blank");
		}
	}
	handlePointerMove = () => {
		this.setState({ canClick: false });
	}
	
	render() {
		return (
			<div>
				<HomeComponent
					handlePointerMove={this.handlePointerMove}
					handlePointerUp={this.handlePointerUp}
					handlePointerDown={this.handlePointerDown}
					reward={this.reward}
					handleCloseDialogDetail={this.handleCloseDialogDetail}
					showDetail={this.showDetail}
					doMission={this.doMission}
					loginAction={this.loginAction}

					data={this.props.data}
					server={this.props.server}
					status={this.props.status}
					title_dialog={this.state.title_dialog}
					articleData={this.props.articleData}
					waiting={this.props.waiting}
					articleWaiting={this.props.articleWaiting}
					dataMission={this.props.dataMission}
					logged={this.state.logged}
					dialogDetailOpen={this.state.dialogDetailOpen}
					dialogContent={this.state.dialogContent}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.home.data,
	articleData: state.article.data,
	waiting: state.home.waiting,
	articleWaiting: state.article.waiting,
	dataMission: state.home.dataMission,
	status: state.mission.status,
	message_server: state.mission.message_server,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getDataMission,
	finishData,
	changeTitle,
	getArticleData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)