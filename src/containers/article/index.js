import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getData,
	getMoreData
} from '../../modules/article'
import {
	getData as getGameData,
	getMoreData as getMoreGameData
} from '../../modules/game'
import { getData as getTagData } from '../../modules/tag'
import {
	changeTitle
} from '../../modules/global'
import HeadMenu from '../../components/HeadMenu'
import ArticleComponent from '../../components/page/Article'



class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			loadedRecords: 0,
			searchValue: "",
			tagDialogOpen: false,
			gameId: undefined,
			articleType: undefined,
			expand: false
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		_this.props.getData(_this.state.limit, _this.state.offset).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
		_this.props.getGameData(100, 0, "", "", "");
		this.props.changeTitle("TIN TỨC");
	}

	handleCloseTagDialog = () => {
		this.setState({ tagDialogOpen: false });
	}

	handleChangeGame = (gameId) => {
		this.setState({ gameId: gameId });
	}
	handleChangeType = (type) => {
		this.setState({ articleType: type });
	}

	searchAction = () => {
		this.setState({ offset: 0 });
		var _this = this;
		this.props.getData(this.state.limit, 0, undefined, this.state.searchValue, this.state.gameId, this.state.articleType).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
		this.handleCloseTagDialog();
	}

	handleApplyFilter = () => {
		var _this = this;
		this.props.getData(this.state.limit, 0, undefined, this.state.searchValue, this.state.gameId, this.state.articleType).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, this.state.searchValue, this.state.gameId, this.state.articleType).then(function () {
			_this.setState({
				offset: newOffset,
				loadedRecords: _this.state.limit + newOffset
			});
		});
	}

	handleChange = (name,event) => {
		this.setState({ [name]: event.target.value, offset: 0 });
	}

	handleExpandItem = () => {
		this.setState({ expand: !this.state.expand });
	}

	render() {

		return (
			<div style={{ marginTop: "8px", marginBottom: "5px" }}>
				<HeadMenu></HeadMenu>
				<ArticleComponent
				data={this.props.data}
				server={this.props.server}
				gameData={this.props.gameData}
				waiting={this.props.waiting}
				totalRecords={this.props.totalRecords}
				tagData={this.props.tagData}
				loadedRecords={this.state.loadedRecords}
				searchValue={this.state.searchValue}
				gameId={this.state.gameId}
				articleType={this.state.articleType}
				expand={this.state.expand}
				handleExpandItem={this.handleExpandItem}
				handleChange={this.handleChange}
				loadMoreAction={this.loadMoreAction}
				handleApplyFilter={this.handleApplyFilter}
				searchAction={this.searchAction}
				handleChangeType={this.handleChangeType}
				handleChangeGame={this.handleChangeGame}
				handleCloseTagDialog={this.handleCloseTagDialog}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.article.data,
	gameData: state.game.data,
	waiting: state.article.waiting,
	totalRecords: state.article.totalRecords,
	tagData: state.tag.data,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getGameData,
	getMoreData,
	getMoreGameData,
	getTagData,
	changeTitle,
}, dispatch)

Game.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game)