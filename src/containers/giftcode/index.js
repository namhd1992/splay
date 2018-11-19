import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/giftcode'
import {
	changeTitle
} from '../../modules/global'
import { withStyles } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import GiftCodeComponent from '../../components/page/GiftCode'


const styles = theme => ({
	root: {
		marginTop: "8px",
		margin: "auto"
	},
	gridItem: {
		backgroundColor: "#232b36",
		borderRadius: "5px"
	},
	gridLink: {
		textDecoration: "none"
	}
});

class Giftcode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			loadedRecords: 0
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("GIFTCODE");
		this.props.getData(this.state.limit, this.state.offset).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});
	}

	loadMoreAction = () => {
		var _this = this;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset).then(function () {
			_this.setState({
				offset: newOffset,
				loadedRecords: _this.state.limit + newOffset
			});
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<HeadMenu></HeadMenu>
				<GiftCodeComponent
					data={this.props.data}
					loadedRecords={this.state.loadedRecords}
					totalRecords={this.props.totalRecords}
					loadMoreAction={this.loadMoreAction}
					server={this.props.server}
					waiting={this.props.waiting}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.giftcode.data,
	waiting: state.giftcode.waiting,
	totalRecords: state.giftcode.totalRecords,
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
)(withStyles(styles)(Giftcode))