import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Ultilities from '../../Ultilities/global'
import LuckyDetailComponent from '../../components/page/LuckyDetail'

class Lucky_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			flippedArr: [],
			collapse: false,
			cardArr: [],
			dialogOpen: false,
			highLightCard: null,
			canPlay: true,
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			dialogItemOpen: false,
			fontSize: "1em",
			dialogMoreTurnOpen: false
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getDetailData(user.access_token, this.props.match.params.id).then(function () {
				if(_this.props.dataDetail!==null){
					_this.props.changeTitle(_this.props.dataDetail.luckyspin.name);
					var new_arr = [];
					_this.props.dataDetail.itemOfSpin.forEach(function (item, key) {
						new_arr.push({ id: item.item.id, status: true });
					});
					_this.setState({ cardArr: _this.props.dataDetail.itemOfSpin, flippedArr: new_arr });
				}
			
			});
			// this.props.getData(user.access_token, user.scoinAccessToken);
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	onResize = () => {
		if (window.innerWidth <= 480) {
			this.setState({ cardHeight: 114, cardWidth: 76, fontSize: "0.6em" });
		}
		if (window.innerWidth > 480 && window.innerWidth <= 768) {
			this.setState({ cardHeight: 180, cardWidth: 120, fontSize: "1em" });
		}
		if (window.innerWidth > 768 && window.innerWidth <= 1024) {
			this.setState({ cardHeight: 160, cardWidth: 95, fontSize: "0.8em" });
		}
		if (window.innerWidth > 1024) {
			this.setState({ cardHeight: 180, cardWidth: 120, fontSize: "1em" });
		}
	}

	openCard = (id) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var new_arr = [];
		var new_arr_after = [];
		this.state.flippedArr.forEach(function (item, key) {
			if (item.id === id) {
				new_arr.push({ id: item.id, status: false });
			} else {
				new_arr.push({ id: item.id, status: true });
			}
			new_arr_after.push({ id: item.id, status: false });
		});
		_this.setState({ flippedArr: new_arr });
		setTimeout(function () {
			_this.setState({ flippedArr: new_arr_after, highLightCard: id, canPlay: true });
		}, 1000);
		this.props.getDetailData(user.access_token, this.props.match.params.id)
	}

	random = () => {
		this.setState({ cardArr: Ultilities.shuffle(this.state.cardArr) });
	}

	highLight = (card_id) => {
		this.setState({ highLightCard: card_id });
	}

	unHighLight = () => {
		this.setState({ highLightCard: null });
	}

	swap = (id1, id2) => {
		var newCardArr = this.state.cardArr;
		var key1 = 0;
		var key2 = 0;
		this.state.cardArr.forEach(function (item, key) {
			if (item.item.id === id1) key1 = key;
			if (item.item.id === id2) key2 = key;
		});
		newCardArr[key1] = newCardArr.splice(key2, 1, newCardArr[key1])[0];
		this.setState({ cardArr: newCardArr });
	}

	flipCard = (key) => {
		var newFlippedArr = this.state.flippedArr;
		newFlippedArr[key] = false;
		this.setState({ flippedArr: newFlippedArr });
	}

	collapse = () => {
		this.setState({ collapse: true });
	}

	expand = () => {
		this.setState({ collapse: false });
	}

	start = () => {
		if (this.props.dataDetail.userSpinInfo.turnsBuy + this.props.dataDetail.userSpinInfo.turnsFree <= 0) {
			this.setState({ dialogMoreTurnOpen: true });
		} else {
			if (this.state.canPlay) {
				var _this = this;
				var new_arr_after = [];
				this.state.flippedArr.forEach(function (item, key) {
					new_arr_after.push({ id: item.id, status: true });
				});
				_this.setState({ flippedArr: new_arr_after });
				this.collapse();
				this.random();
				this.unHighLight();
				setTimeout(function () {
					_this.expand();
				}, 1000);
			}
		}
	}

	pick = (key) => {
		if (this.state.canPlay) {
			var _this = this;
			this.setState({ canPlay: false });
			var user = JSON.parse(localStorage.getItem("user"));
			this.props.pickCard(user.access_token, user.scoinAccessToken, this.props.match.params.id).then(function () {
				if (_this.props.dataPick === null) {
					_this.setState({ openSnack: true, message: "Bạn đã hết lượt quay", snackVariant: "error" });
				} else {
					_this.swap(key, _this.props.dataPick.item.id);
					_this.openCard(_this.props.dataPick.item.id);
					_this.setState({ openSnack: true, message: "Thành công, vào hộp thư để xem vật phẩm trúng thưởng", snackVariant: "success" });
				}
				_this.props.getDetailData(user.access_token, _this.props.match.params.id);
				// _this.props.getData(user.access_token, user.scoinAccessToken);
			});
		}
	}

	buyTurn = (turn) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.buyTurn(user.access_token, user.scoinAccessToken, this.props.match.params.id, turn).then(function () {
			if (_this.props.dataTurn.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
			} else {
				_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
			}
			_this.props.getDetailData(user.access_token, _this.props.match.params.id);
			// _this.props.getData(user.access_token, user.scoinAccessToken);
		});
	}

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	handleCloseMoreTurnDialog = () => {
		this.setState({ dialogMoreTurnOpen: false });
	};

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};

	showBuyTurn = () => {
		this.setState({ dialogOpen: true, dialogMoreTurnOpen: false});
	}
	showItem = () => {
		this.setState({ dialogItemOpen: true });
	}
	notSelectOption=()=>{
		this.setState({ openSnack: true, message: "Bạn chưa chọn gói", snackVariant: "error" });
	}
	

	render() {
		
		return (
			<div>
				<LuckyDetailComponent
					showItem={this.showItem}
					showBuyTurn={this.showBuyTurn}
					handleCloseDialogItem={this.handleCloseDialogItem}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					handleCloseMoreTurnDialog={this.handleCloseMoreTurnDialog}
					handleCloseDialog={this.handleCloseDialog}
					buyTurn={this.buyTurn}
					pick={this.pick}
					start={this.start}
					expand={this.expand}
					flipCard={this.flipCard}
					swap={this.swap}
					unHighLight={this.unHighLight}
					highLight={this.highLight}
					random={this.random}
					openCard={this.openCard}
					onResize={this.onResize}
					handleCloseSnack={this.handleCloseSnack}
					notSelectOption={this.notSelectOption}

					dataDetail={this.props.dataDetail}
					server={this.props.server}
					dataPick={this.props.dataPick}
					waiting={this.props.waiting}
					dataProfile={this.props.dataProfile}
					dataTurn={this.props.dataTurn}
					message={this.state.message}
					cardWidth={this.state.cardWidth}
					cardHeight={this.state.cardHeight}
					flippedArr={this.state.flippedArr}
					collapse={this.state.collapse}
					cardArr={this.state.cardArr}
					dialogOpen={this.state.dialogOpen}
					highLightCard={this.state.highLightCard}
					openSnack={this.state.openSnack}
					snackVariant={this.state.snackVariant}
					dialogLoginOpen={this.state.dialogLoginOpen}
					dialogItemOpen={this.state.dialogItemOpen}
					fontSize={this.state.fontSize}
					dialogMoreTurnOpen={this.state.dialogMoreTurnOpen}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	dataPick: state.lucky.dataPick,
	waiting: state.lucky.waiting,
	dataProfile: state.profile.data,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	pickCard,
	buyTurn,
	getData,
	changeTitle,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_detail)