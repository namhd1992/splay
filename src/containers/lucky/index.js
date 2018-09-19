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
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

const styles = theme => ({
	root: {
		marginTop: "8px",
		margin: "auto"
	},
	gridItem: {
		borderRadius: "5px",
		backgroundColor: "#fff",
		overflow: "hidden"
	}
});

class Lucky extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			loadedRecords: 0,
			allGame: [],
			allArticles: [],
		};
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
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container spacing={8}>
							{this.props.data.map((obj, key) => {
								var now = moment(new Date()); //todays date
								var end = moment(new Date(obj.endDate)); // another date
								var duration = moment.duration(end.diff(now));
								var days = Math.floor(duration.asDays());
								var hours = Math.floor(duration.asHours());
								var minutes = Math.floor(duration.asMinutes());
								var time_text = "";
								if (days > 0) {
									time_text = "còn " + days + " ngày";
								} else if (hours > 0) {
									time_text = "còn " + hours + " giờ";
								} else if (minutes > 0) {
									time_text = "còn " + minutes + " phút";
								}
								return (
									<Grid key={key} item xs={12} md={6}>
										<div className={classes.gridItem}>
											<Link to={"/luckydetail/" + obj.id}>
												<GridListTile style={{ listStyleType: "none", backgroundColor: "#fff" }}>
													<div style={{
														backgroundImage: "url(" + obj.image + ")",
														backgroundSize: "cover",
														width: "100%",
														paddingBottom: "30%",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center"
													}} />
													<GridListTileBar
														title={time_text}
														actionIcon={
															<IconButton>
															</IconButton>
														}
													/>
												</GridListTile>
											</Link>
										</div>
									</Grid>
								)
							}
							)}
							{(this.props.waiting) ? (<Grid item xs={12}>
								<div className="global-loading"><CircularProgress
									size={50}
								/></div>
							</Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
								<Grid item xs={12}>
									<div className="global-loadmore">
										<a onClick={this.loadMoreAction}>Xem thêm</a>
									</div>
								</Grid>
							) : (<div></div>)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.lucky.data,
	waiting: state.lucky.waiting,
	totalRecords: state.lucky.totalRecords
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(Lucky)))