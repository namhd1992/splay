import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/game'
import { getData as getTagData } from '../../modules/tag'
import {
	changeTitle
} from '../../modules/global'

import Ultilities from '../../Ultilities/global'

import GameComponent from '../../components/page/Game'


class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 24,
			offset: 0,
			loadedRecords: 0,
			sort: 1,
			searchValue: "",
			tagDialogOpen: false,
			tagList: [],
			selectedTag: [],
			hover: -1,
			expand: false
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}


	handleCloseTagDialog = () => {
		this.setState({ tagDialogOpen: false });
	}

	handleChange = (name, event) => {
		var _this = this;
		this.setState({ [name]: event.target.value, offset: 0 });
		var resultid = this.state.selectedTag.map(a => a.id);
		if (name === "sort") {
			this.props.getData(this.state.limit, this.state.offset, event.target.value, this.state.searchValue, resultid.toString()).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		}
	}

	componentDidMount() {
		var _this = this;
		var filter = Ultilities.parse_query_string("filter", window.location.href);
		_this.props.getData(_this.state.limit, _this.state.offset, _this.state.sort, _this.state.searchValue, "").then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
		this.props.getTagData(1000, 0).then(function () {
			_this.setState({ tagList: _this.props.tagData });
			if (filter !== null) {
				var obj = _this.props.tagData.find(function (obj) {
					return obj.id === parseInt(filter, 10);
				});
				_this.handleAddTag(obj);
				_this.props.getData(_this.state.limit, _this.state.offset, _this.state.sort, _this.state.searchValue, obj.id).then(function () {
					_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
				});
			}
		});
		this.props.changeTitle("DANH SÁCH GAME");
	}

	handleAddTag = (id) => {
		if (this.state.selectedTag.indexOf(id) === -1) {
			var newTagList = this.state.selectedTag.concat(id);
			this.setState({ selectedTag: newTagList });
			this.setState({ offset: 0 });
		} else {
			this.state.selectedTag.splice(this.state.selectedTag.indexOf(id), 1);
			var newTagList = this.state.selectedTag;
			this.setState({ selectedTag: newTagList });
		}
	}

	handleApplyFilter = () => {
		var _this = this;
		var resultid = null;
		resultid = this.state.selectedTag.map(a => a.id);
		this.props.getData(this.state.limit, this.state.offset, this.state.sort, this.state.searchValue, resultid.toString()).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
	}

	changeSort = (sort) => {
		this.setState({ sort: sort });
	}

	searchAction = () => {
		this.setState({ offset: 0 });
		var _this = this;
		var resultid = this.state.selectedTag.map(a => a.id);
		this.props.getData(this.state.limit, 0, this.state.sort, this.state.searchValue, resultid.toString()).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
		this.handleCloseTagDialog();
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		var resultid = this.state.selectedTag.map(a => a.id);
		this.props.getMoreData(this.state.limit, newOffset, this.state.sort, this.state.searchValue, resultid.toString()).then(function () {
			_this.setState({
				offset: newOffset,
				loadedRecords: _this.state.limit + newOffset
			});
		});
	}

	handleExpandItem = () => {
		this.setState({ expand: !this.state.expand });
	}

	handleHover = (id) => {
		this.setState({hover:id});
	}

	handleOut = (id) => {
		this.setState({hover:null});
	}

	render() {
		
		return (
			<div>
				<GameComponent
					handleOut={this.handleOut}
					handleHover={this.handleHover}
					handleExpandItem={this.handleExpandItem}
					loadMoreAction={this.loadMoreAction}
					searchAction={this.searchAction}
					changeSort={this.changeSort}
					handleApplyFilter={this.handleApplyFilter}
					handleAddTag={this.handleAddTag}
					handleChange={this.handleChange}
					handleCloseTagDialog={this.handleCloseTagDialog}

					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					tagData={this.props.tagData}
					loadedRecords={this.state.loadedRecords}
					sort={this.state.sort}
					searchValue={this.state.searchValue}
					tagDialogOpen={this.state.tagDialogOpen}
					tagList={this.state.tagList}
					selectedTag={this.state.selectedTag}
					hover={this.state.hover}
					expand={this.state.expand}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.game.data,
	waiting: state.game.waiting,
	totalRecords: state.game.totalRecords,
	tagData: state.tag.data,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	getTagData,
	changeTitle,
	changePage: () => push('/game_detail')
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game)