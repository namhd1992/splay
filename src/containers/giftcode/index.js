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
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import RightArea from '../../components/RightArea'
import Hidden from 'material-ui/Hidden'

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
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container spacing={8}>
							{(this.props.data.length <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có Giftcode</Grid>) : (<span></span>)}
							{this.props.data.map((obj, key) => (
								<Grid key={key} item xs={12}>
									<div className={classes.gridItem}>
										<Link to={"/giftcodedetail/" + obj.giftcodeEvent.id} className={classes.gridLink}>
											<ListItem>
												<div className="giftcode-item-image">
													<div style={{
														backgroundImage: "url(" + obj.defaultImage + ")",
														backgroundSize: "contain",
														width: "72px",
														height: "72px",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat"
													}}></div>
												</div>
												<ListItemText disableTypography={true}
													primary={(<h4 style={{ color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "400" }}
														className="giftcode-item-name">{obj.title}</h4>)}
													secondary={(<span style={{ color: "#ccc" }}>{"Còn lại " + (obj.giftcodeEvent.numberGiftcode - obj.giftcodeEvent.numberGiftcodeLost)}</span>)} />
												<div>
													<Button color="primary" style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}>Nhận</Button>
												</div>
											</ListItem>
										</Link>
									</div>
								</Grid>
							))}
							{(this.props.waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}>
								<CircularProgress style={{ color: "#23c9b6" }}
									size={50}
								/>
							</Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
								<Grid item xs={12} style={{ textAlign: "center", color: "#23c9b6" }}>
									<a onClick={this.loadMoreAction}>Xem thêm</a>
								</Grid>
							) : (<div></div>)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.giftcode.data,
	waiting: state.giftcode.waiting,
	totalRecords: state.giftcode.totalRecords
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