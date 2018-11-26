import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/auction'
import {
	getData as getShopItemGiftcodeData,
	getMoreData as getMoreShopItemGiftcodeData
} from '../../modules/shopItemGiftcode'
import {
	getData as getShopItemData,
	getMoreData as getMoreShopItemData
} from '../../modules/shopItem'
import {
	getData as getAllData,
	getMoreData as getMoreAllData
} from '../../modules/itemAndAuction'
import {
	getMissionByLuckyAndAution
} from '../../modules/auction'
import {
	getData as getGameData,
} from '../../modules/game'
import { getData as getArticleData } from '../../modules/article'
import {
	changeTitle
} from '../../modules/global'
import PropTypes from 'prop-types'

import AuctionComponent from '../../components/page/Auction'




class Auction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			limitShopItem: 12,
			offsetShopItem: 0,
			limitShopItemGiftcode: 12,
			offsetShopItemGiftcode: 0,
			limitAll: 12,
			offsetAll: 0,
			loadedRecords: 0,
			loadedRecordsShopItemGiftcode: 0,
			loadedRecordsShopItem: 0,
			loadedRecordsAll: 0,
			value: 0,
			dialogLoginOpen: false,
			allGame: [],
			allArticles: [],
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("SHOP");
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getMissionByLuckyAndAution(user.access_token, user.scoinAccessToken);
			this.props.getData(this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
			this.props.getShopItemData(this.state.limitShopItem, this.state.offsetShopItem).then(function () {
				_this.setState({ loadedRecordsShopItem: _this.state.limitShopItem + _this.state.offsetShopItem });
			});
			this.props.getShopItemGiftcodeData(this.state.limitShopItemGiftcode, this.state.offsetShopItemGiftcode).then(function () {
				_this.setState({ loadedRecordsShopItemGiftcode: _this.state.limitShopItemGiftcode + _this.state.offsetShopItemGiftcode });
			});
			this.props.getAllData(this.state.limitAll, this.state.offsetAll).then(function () {
				_this.setState({ loadedRecordsAll: _this.state.limitAll + _this.state.offsetAll });
			});
			_this.props.getGameData(12, 0, "", "", "").then(function () {
				_this.setState({ allGame: _this.props.gameData });
			});
			_this.props.getArticleData(6, 0, undefined, undefined, undefined).then(function () {
				_this.setState({ allArticles: _this.props.articleData });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	loadMoreShopItemAction = () => {
		var _this = this;
		var newOffset = this.state.limitShopItem + this.state.offsetShopItem;
		this.props.getMoreShopItemData(this.state.limitShopItem, newOffset);
		this.setState({
			offsetShopItem: newOffset,
			loadedRecordsShopItem: _this.state.limitShopItem + newOffset
		});
	}

	loadMoreShopItemGiftcodeAction = () => {
		var _this = this;
		var newOffset = this.state.limitShopItemGiftcode + this.state.offsetShopItemGiftcode;
		this.props.getMoreShopItemGiftcodeData(this.state.limitShopItemGiftcode, newOffset);
		this.setState({
			offsetShopItemGiftcode: newOffset,
			loadedRecordsShopItemGiftcode: _this.state.limitShopItemGiftcode + newOffset
		});
	}

	loadMoreAllAction = () => {
		var _this = this;
		var newOffset = this.state.limitAll + this.state.offsetAll;
		this.props.getMoreAllData(this.state.limitAll, newOffset);
		this.setState({
			offsetAll: newOffset,
			loadedRecordsAll: _this.state.limitAll + newOffset
		});
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};
	render() {
		
		return (
			<div>
				<AuctionComponent
					handleChange={this.handleChange}
					loadMoreAllAction={this.loadMoreAllAction}
					loadMoreShopItemGiftcodeAction={this.loadMoreShopItemGiftcodeAction}
					loadMoreShopItemAction={this.loadMoreShopItemAction}
					loadMoreAction={this.loadMoreAction}

					dialogLoginOpen={this.state.dialogLoginOpen}
					value={this.state.value}
					loadedRecordsAll={this.state.loadedRecordsAll}
					loadedRecordsShopItem={this.state.loadedRecordsShopItem}
					loadedRecordsShopItemGiftcode={this.state.loadedRecordsShopItemGiftcode}
					loadedRecords={this.state.loadedRecords}

					data={this.props.data}
					dataAutionAndLucky={this.props.dataAutionAndLucky}
					server={this.props.server}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					profileData={this.props.profileData}
					dataShopItemGiftcode={this.props.dataShopItemGiftcode}
					waitingShopItemGiftcode={this.props.waitingShopItemGiftcode}
					totalRecordsShopItemGiftcode={this.props.totalRecordsShopItemGiftcode}
					dataShopItem={this.props.dataShopItem}
					waitingShopItem={this.props.waitingShopItem}
					totalRecordsShopItem={this.props.totalRecordsShopItem}
					dataAll={this.props.dataAll}
					waitingAll={this.props.waitingAll}
					totalRecordsAll={this.props.totalRecordsAll}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	gameData: state.game.data,
	articleData: state.article.data,
	data: state.auction.data,
	dataAutionAndLucky:state.auction.dataAutionAndLucky,
	waiting: state.auction.waiting,
	totalRecords: state.auction.totalRecords,
	profileData: state.profile.data,
	profileWaiting: state.profile.waiting,
	dataShopItemGiftcode: state.shopItemGiftcode.data,
	waitingShopItemGiftcode: state.shopItemGiftcode.waiting,
	totalRecordsShopItemGiftcode: state.shopItemGiftcode.totalRecords,
	dataShopItem: state.shopItem.data,
	waitingShopItem: state.shopItem.waiting,
	totalRecordsShopItem: state.shopItem.totalRecords,
	dataAll: state.itemAndAuction.data,
	waitingAll: state.itemAndAuction.waiting,
	totalRecordsAll: state.itemAndAuction.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getArticleData,
	getGameData,
	getData,
	getMoreData,
	getShopItemGiftcodeData,
	getMoreShopItemGiftcodeData,
	getShopItemData,
	getMoreShopItemData,
	getAllData,
	getMoreAllData,
	getMissionByLuckyAndAution,
	changeTitle
}, dispatch)

Auction.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auction)