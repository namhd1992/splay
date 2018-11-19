import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/history'
import {
	getData as getProfileData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import ShopHistoryComponent from '../../components/page/ShopHistory'

class Shop_history extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			loadedRecords: 0,
			dialogLoginOpen: false,
			expand: []
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
			this.props.getData(user.access_token, this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	handleExpandItem = (id) => {
		if (this.state.expand.indexOf(id) !== -1) {
			this.state.expand.splice(this.state.expand.indexOf(id), 1);
		} else {
			this.state.expand.push(id);
		}
		this.forceUpdate();
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(user.access_token, this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	render() {
		
		return (
			<div>
				<ShopHistoryComponent
					loadMoreAction={this.loadMoreAction}
					handleExpandItem={this.handleExpandItem}
					handleCloseDialogLogin={this.handleCloseDialogLogin}

					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					profileData={this.props.profileData}
					profileWaiting={this.props.profileWaiting}
					loadedRecords={this.state.loadedRecords}
					dialogLoginOpen={this.state.dialogLoginOpen}
					expand={this.state.expand}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.history.data,
	waiting: state.history.waiting,
	totalRecords: state.history.totalRecords,
	profileData: state.profile.data,
	profileWaiting: state.profile.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	getProfileData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Shop_history)