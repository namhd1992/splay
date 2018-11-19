import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/lucky'
import {
	changeTitle
} from '../../modules/global'
import LuckyComponent from '../../components/page/Lucky'

class Lucky extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			loadedRecords: 0,
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("MAY MẮN");
		this.props.getData(this.state.limit, this.state.offset).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + newOffset });
		});
	}

	render() {
		
		return (
			<div>
				<LuckyComponent
					loadMoreAction={this.loadMoreAction}
					data={this.props.data}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					loadedRecords={this.state.loadedRecords}
					server={this.props.server}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.lucky.data,
	waiting: state.lucky.waiting,
	totalRecords: state.lucky.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky)