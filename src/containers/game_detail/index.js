import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getDataId,
	getData,
	rating
} from '../../modules/game'
import {
	getDataByGame
} from '../../modules/giftcode'
import {
	changeTitle
} from '../../modules/global'
import { getData as getArticleData } from '../../modules/article'
import { getData as getYoutubeData } from '../../modules/youtubeApi'
import {getMissionByGame} from '../../modules/mission'

import GameDetailComponent from '../../components/page/GameDetail'
class Game_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			dialogRatingOpen: false,
			pointSubmit: 0,
			showMore: false,
			message: "",
			snackVariant: "info",
			videoId:"",
			openSnack: false,
			lightBoxOpen: false,
			lightBoxIndex: 0,
			youtubeOpen: false,
			gameArticles: [],
			gameData: [],
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		this.props.getDataId(this.props.match.params.id).then(function () {
			_this.props.changeTitle(_this.props.data[0].name);
			_this.props.getDataByGame(_this.props.data[0].id);
			// _this.props.getMissionByGame(_this.props.data[0].id);
			_this.props.getArticleData(6, 0, undefined, undefined, _this.props.data[0].id).then(function () {
				_this.setState({ gameArticles: _this.props.articleData });
			});
			_this.props.getYoutubeData(_this.props.data[0].youtubeChannelId, _this.props.data[0].youtubeDefaultSearch);
			_this.setState({ gameData: _this.props.data });
		});
	}

	readMore = () => {
		this.setState({ showMore: true });
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	dialogLoginOpen = () => {
		this.setState({ dialogLoginOpen: true });
	};

	dialogLoginClose = () => {
		this.setState({ dialogLoginOpen: false });
	};

	dialogRatingOpen = () => {
		this.setState({ dialogRatingOpen: true });
	};

	dialogRatingClose = () => {
		this.setState({ dialogRatingOpen: false });
	};

	dialogYoutubeOpen = (videoId) => {
		this.setState({ youtubeOpen: true, videoId: videoId });
	};

	dialogYoutubeClose = () => {
		this.setState({ youtubeOpen: false });
	};

	changePointSubmit = (point) => {
		this.setState({ pointSubmit: point });
	}

	ratingAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.rating(this.props.match.params.id, this.state.pointSubmit, user.access_token).then(function () {
			if (_this.props.dataRating.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Thành công", snackVariant: "success", dialogRatingOpen: false });
			} else {
				_this.setState({ openSnack: true, message: _this.props.dataRating.onlyMessage, snackVariant: "error", dialogRatingOpen: false });
			}
		});
	}

	openRatingDialog = () => {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.dialogRatingOpen();
		} else {
			this.dialogLoginOpen();
		}
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	closeLightBox = () => {
		this.setState({ lightBoxOpen: false });
	}

	openLightBox = (index) => {
		this.setState({ lightBoxOpen: true, lightBoxIndex: index });
	}

	goToLightBoxNext = () => {
		this.setState({ lightBoxIndex: this.state.lightBoxIndex + 1 });
	}
	goToLightBoxPrev = () => {
		this.setState({ lightBoxIndex: this.state.lightBoxIndex - 1 });
	}
	

	render() {
		
		return (
			<div>
				<GameDetailComponent
					goToLightBoxPrev={this.goToLightBoxPrev}
					goToLightBoxNext={this.goToLightBoxNext}
					openLightBox={this.openLightBox}
					closeLightBox={this.closeLightBox}
					openRatingDialog={this.openRatingDialog}
					ratingAction={this.ratingAction}
					changePointSubmit={this.changePointSubmit}
					dialogYoutubeClose={this.dialogYoutubeClose}
					dialogYoutubeOpen={this.dialogYoutubeOpen}
					dialogRatingClose={this.dialogRatingClose}
					dialogRatingOpen={this.dialogRatingOpen}
					dialogLoginClose={this.dialogLoginClose}
					dialogLoginOpen={this.dialogLoginOpen}
					handleCloseSnack={this.handleCloseSnack}
					readMore={this.readMore}

					data={this.props.data}
					server={this.props.server}
					dataMission={this.props.dataMission}
					dataGiftcode={this.props.dataGiftcode}
					youtubeData={this.props.youtubeData}
					youtubeWaiting={this.props.youtubeWaiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
					dialogRatingOpen={this.state.dialogRatingOpen}
					pointSubmit={this.state.pointSubmit}
					showMore={this.state.showMore}
					videoId={this.state.videoId}
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					openSnack={this.state.openSnack}
					lightBoxOpen={this.state.lightBoxOpen}
					lightBoxIndex={this.state.lightBoxIndex}
					youtubeOpen={this.state.youtubeOpen}
					gameArticles={this.state.gameArticles}
					gameData={this.state.gameData}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.game.dataDetail,
	dataRating: state.game.dataRating,
	dataMission: state.mission.dataMission,
	waiting: state.game.waiting,
	dataGiftcode: state.giftcode.data,
	articleData: state.article.data,
	articleWaiting: state.article.waiting,
	youtubeData: state.youtubeApi.data,
	youtubeWaiting: state.youtubeApi.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataId,
	getData,
	rating,
	getDataByGame,
	changeTitle,
	getArticleData,
	getMissionByGame,
	getYoutubeData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game_detail)