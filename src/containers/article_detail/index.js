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

	componentDidMount() {
		var _this = this;
		_this.props.getDataDetail( _this.props.match.params.id).then(function () {
			_this.props.changeTitle(_this.props.data[0].title);
		});
	}

	render() {
		return (
			<div>
				<ArticleDetailComponent
					data={this.props.data}
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