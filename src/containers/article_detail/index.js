import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getDataDetail
} from '../../modules/article'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Chip from 'material-ui/Chip'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import {
	changeTitle
} from '../../modules/global'
import Divider from 'material-ui/Divider'
import { ListItem, ListItemText } from 'material-ui/List'
import Ultilities from '../../Ultilities/global'
import SearchIcon from 'material-ui-icons/Search'
import StarRate from 'material-ui-icons/Star'
import Hidden from 'material-ui/Hidden'
import Rating from '../../components/Rating'
import { withTheme } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import RightArea from '../../components/RightArea'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'left',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2,
	},
	chip: {
		margin: theme.spacing.unit / 2,
	},
	formControl: {}
});

class ArticleDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			chipData: [],
			loadedRecords: 0,
			sort: 1,
			searchValue: "",
			tagDialogOpen: false,
			tagList: [],
			selectedTag: []
		};
	}

	componentDidMount() {
		var _this = this;
		_this.props.getDataDetail( _this.props.match.params.id).then(function () {
			_this.props.changeTitle(_this.props.data[0].title);
		});
	}

	render() {
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		var _this = this;
		return (this.props.data!== undefined && this.props.data.length > 0) ? (
			<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
				<HeadMenu></HeadMenu>
				<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ width: "100%", margin: "0" }} spacing={8} justify="center">
							<Grid item xs={12}>
								<h2 style={{ color: "#fff" }}>{this.props.data[0].title}</h2>
							</Grid>
							<Grid item xs={12} style={{ overflow: "hidden" }}>
								<div className={"article_content"} style={{ color: "#fff" }}
									dangerouslySetInnerHTML={{ __html: this.props.data[0].content }}>
								</div>
							</Grid>
							{(this.props.waiting) ? (<Grid item xs={12} md={8}>
								<div className="global-loadmore">
									<CircularProgress size={50} />
								</div>
							</Grid>) : (<div></div>)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		) : (<div style={{ width: "100%", textAlign: "center", color: "#fff" }}>Không tìm thấy tin tức</div>)
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

ArticleDetail.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(withTheme()(ArticleDetail)))))