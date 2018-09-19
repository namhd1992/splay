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
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import {
	changeTitle
} from '../../modules/global'
import Divider from 'material-ui/Divider'
import { ListItem, ListItemText } from 'material-ui/List'
import SearchIcon from 'material-ui-icons/Search'
import { withTheme } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import Button from 'material-ui/Button'
import FilterIcon from 'material-ui-icons/FilterList'
import moment from 'moment'
import Hidden from 'material-ui/Hidden'

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

class Game extends React.Component {

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
			gameId: undefined,
			articleType: undefined,
			expand: false
		};
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

	handleChange = name => event => {
		var _this = this;
		this.setState({ [name]: event.target.value, offset: 0 });
	}

	handleExpandItem = () => {
		this.setState({ expand: !this.state.expand });
	}

	render() {
		const { theme } = this.props;
		const { classes } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		var _this = this;
		return (
			<div style={{ marginTop: "8px", marginBottom: "5px" }}>
				<HeadMenu></HeadMenu>
				<Hidden mdUp>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12}>
							<ListItem style={{ padding: "8px" }}>
								<TextField InputProps={{ disableUnderline: true }}  style={{ width: "80%", border: "solid 1px #666", borderRight: "0px", padding: "1px 1px 1px 20px", borderRadius: "20px 0px 0px 20px", background: "#151c24" }} placeholder="Tiêu đề" onChange={this.handleChange('searchValue')}
									defaultValue={this.state.searchValue}></TextField>
								<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								<Button onClick={() => this.handleExpandItem()} style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "20%" }} ><FilterIcon style={{ color: "#fff" }} ></FilterIcon></Button>
							</ListItem>
							<Collapse in={(_this.state.expand === true)} timeout="auto" unmountOnExit>
								<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
									<Grid item xs={12}>
										<div style={{ color: "gray", marginTop: "10px" }}>Game</div>
										<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.gameId === undefined) ? "transparent" : "#38414e",
											borderColor: (_this.state.gameId === undefined) ? secondary.main : "transparent",
											color: (_this.state.gameId === undefined) ? secondary.main : "#fff"
										}}
											label={"Tất cả"} onClick={() => this.handleChangeGame(undefined)} />
										{(_this.props.gameData !== undefined) ? _this.props.gameData.map((obj, key) => {
											return (<Chip style={{
												margin: "5px",
												border: "solid 1px",
												backgroundColor: (_this.state.gameId === obj.id) ? "transparent" : "#38414e",
												borderColor: (_this.state.gameId === obj.id) ? secondary.main : "transparent",
												color: (_this.state.gameId === obj.id) ? secondary.main : "#fff"
											}} key={key}
												label={obj.name} onClick={() => this.handleChangeGame(obj.id)} />)
										}) : (<div></div>)}
										<Divider style={{ marginTop: "10px" }} />
										<div style={{ color: "gray", marginTop: "10px" }}>Thể loại</div>
										<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.articleType === undefined) ? "transparent" : "#38414e",
											borderColor: (_this.state.articleType === undefined) ? secondary.main : "transparent",
											color: (_this.state.articleType === undefined) ? secondary.main : "#fff"
										}}
											label={"Tất cả"} onClick={() => this.handleChangeType(undefined)} />
										<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.articleType === "event") ? "transparent" : "#38414e",
											borderColor: (_this.state.articleType === "event") ? secondary.main : "transparent",
											color: (_this.state.articleType === "event") ? secondary.main : "#fff"
										}}
											label="Sự kiện" onClick={() => this.handleChangeType("event")} />
										<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.articleType === "news") ? "transparent" : "#38414e",
											borderColor: (_this.state.articleType === "news") ? secondary.main : "transparent",
											color: (_this.state.articleType === "news") ? secondary.main : "#fff"
										}}
											label="Tin tức" onClick={() => this.handleChangeType("news")} />
									</Grid>
									<Grid item xs={12} style={{ textAlign: "right" }}>
										<Button onClick={() => this.handleApplyFilter()} style={{
											borderRadius: "20px",
											background: "linear-gradient(90deg,#22cab5,#3fe28f)",
											color: "#fff",
											padding: "10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minWidth: "auto",
											minHeight: "auto"
										}}>Xác nhận</Button>
									</Grid>
								</Grid>
							</Collapse>
						</Grid>
					</Grid>
				</Hidden>
				<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
							{(this.props.data.length === 0 && !this.props.waiting) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có kết quả</Grid>) : (
								<Grid item xs={12}></Grid>)}
							{this.props.data.map((obj, key) => (
								<Grid key={key} item xs={12}>
									<Link to={"/article_detail/" + obj.id} style={{ textDecoration: "none" }}>
										<ListItem key={key} style={{ padding: "10px 0px" }}>
											{(obj.articleType == "event") ? (<div style={{
												border: "solid 1px #fe8731",
												display: "inline-block",
												padding: "5px",
												margin: "2px",
												borderRadius: "5px",
												fontSize: "0.6em",
												color: "#fe8731",
												whiteSpace: "nowrap"
											}}>Sự kiện</div>) : (<div style={{
												border: "solid 1px #24b9a9",
												display: "inline-block",
												padding: "5px",
												margin: "2px",
												borderRadius: "5px",
												fontSize: "0.6em",
												color: "#24b9a9",
												whiteSpace: "nowrap"
											}}>Tin tức</div>)}
											<ListItemText style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontSize: "0.8em" }} disableTypography={true} primary={(<span><Link style={{ color: "#fff" }} to={"/article_detail/" + obj.id} className={classes.homeBlockLink}>
												{(obj.splayGameName !== "" && obj.splayGameName !== null) ? "[" + obj.splayGameName + "]" : ""} {obj.title}
											</Link></span>)} ></ListItemText>
											<span style={{ color: "#555", fontSize: "0.8em" }}>
												{moment(new Date(obj.createOn)).format("DD.MM")}
											</span>
										</ListItem>
									</Link>
									<Divider />
								</Grid>
							))}
							{(this.props.waiting) ? (<Grid item xs={12}>
								<div className="global-loadmore">
									<CircularProgress size={50} />
								</div>
							</Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
								<Grid item xs={12} >
									<div className="global-loadmore">
										<a onClick={this.loadMoreAction} style={{ color: primary.main }}>Xem thêm</a>
									</div>
								</Grid>
							) : (<div></div>)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<Grid container style={{ width: "100%", margin: "0" }}>
								<Grid item xs={12}>
									<TextField InputProps={{ disableUnderline: true }} style={{ width: "80%", border: "solid 1px #666", borderRight: "0px", padding: "1px 1px 1px 20px", borderRadius: "20px 0px 0px 20px", background: "#151c24" }} placeholder="Tiêu đề" onChange={this.handleChange('searchValue')}
										defaultValue={this.state.searchValue}></TextField>
									<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								</Grid>
								<Grid item xs={12}>
									<div style={{ color: "gray", marginTop: "10px" }}>Game</div>
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.gameId === undefined) ? "transparent" : "#38414e",
										borderColor: (_this.state.gameId === undefined) ? secondary.main : "transparent",
										color: (_this.state.gameId === undefined) ? secondary.main : "#fff"
									}}
										label={"Tất cả"} onClick={() => this.handleChangeGame(undefined)} />
									{(_this.props.gameData !== undefined) ? _this.props.gameData.map((obj, key) => {
										return (<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.gameId === obj.id) ? "transparent" : "#38414e",
											borderColor: (_this.state.gameId === obj.id) ? secondary.main : "transparent",
											color: (_this.state.gameId === obj.id) ? secondary.main : "#fff"
										}} key={key}
											label={obj.name} onClick={() => this.handleChangeGame(obj.id)} />)
									}) : (<div></div>)}
									<Divider style={{ marginTop: "10px" }} />
									<div style={{ color: "gray", marginTop: "10px" }}>Thể loại</div>
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.articleType === undefined) ? "transparent" : "#38414e",
										borderColor: (_this.state.articleType === undefined) ? secondary.main : "transparent",
										color: (_this.state.articleType === undefined) ? secondary.main : "#fff"
									}}
										label={"Tất cả"} onClick={() => this.handleChangeType(undefined)} />
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.articleType === "event") ? "transparent" : "#38414e",
										borderColor: (_this.state.articleType === "event") ? secondary.main : "transparent",
										color: (_this.state.articleType === "event") ? secondary.main : "#fff"
									}}
										label="Sự kiện" onClick={() => this.handleChangeType("event")} />
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.articleType === "news") ? "transparent" : "#38414e",
										borderColor: (_this.state.articleType === "news") ? secondary.main : "transparent",
										color: (_this.state.articleType === "news") ? secondary.main : "#fff"
									}}
										label="Tin tức" onClick={() => this.handleChangeType("news")} />
								</Grid>
								<Grid item xs={12} style={{ textAlign: "right" }}>
									<Button onClick={() => this.handleApplyFilter()} style={{
										borderRadius: "20px",
										background: "linear-gradient(90deg,#22cab5,#3fe28f)",
										color: "#fff",
										padding: "10px",
										fontSize: "0.8em",
										whiteSpace: "nowrap",
										minWidth: "auto",
										minHeight: "auto"
									}}>Xác nhận</Button>
								</Grid>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
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
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(Game)))