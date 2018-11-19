import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getDataDetail
} from '../../modules/article'
import {
	withMobileDialog,
} from 'material-ui/Dialog'
import {
	changeTitle
} from '../../modules/global'
import { withTheme } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import ArticleDetailComponent from '../../components/page/ArticleDetail'


class Article_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		_this.props.getDataDetail( _this.props.match.params.id);
	}
	render() {
		return (
			<div>
				<ArticleDetailComponent
					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	data: state.article.dataDetail,
	waiting: state.article.waiting,
	totalRecords: state.article.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataDetail,
	changeTitle,
}, dispatch)

Article_detail.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withTheme()(Article_detail))))