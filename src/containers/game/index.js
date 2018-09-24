import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getData,
	getMoreData
} from '../../modules/game'
import { getData as getTagData } from '../../modules/tag'
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
import List, { ListItem, ListItemText } from 'material-ui/List'
import Ultilities from '../../Ultilities/global'
import SearchIcon from 'material-ui-icons/Search'
import Rating from '../../components/Rating'
import { withTheme } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import ExpandLess from 'material-ui-icons/ExpandLess'
import FilterIcon from 'material-ui-icons/FilterList'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
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
	formControl: {},
	cssUnderline: {
		'&:after': {
			height: "0px",
		},
	},
});

class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 24,
			offset: 0,
			chipData: [],
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

	handleCloseTagDialog = () => {
		this.setState({ tagDialogOpen: false });
	}

	handleChange = name => event => {
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
	getTheLoai=(obj)=>{
		var tagsList=obj.tagsList;
		var theloai="";
		if (tagsList !== undefined) {
			for(var i=0; i<tagsList.length;i++){
				if (tagsList[i].typeName === "theloai") {
					theloai=tagsList[i].name;
					break;
				}
			};
		}
		return theloai;
	}

	render() {
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		// const {classes} = this.props;
		const { fullScreen } = this.props;
		var _this = this;
		// var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// var deviceType = Ultilities.getMobileOperatingSystem(userAgent);
		var tagListTheloai = [];
		var tagListChude = [];
		var tagListHedieuhanh = [];
		if (this.state.tagList !== undefined) {
			this.state.tagList.forEach((element) => {
				if (element.typeName === "chude") {
					tagListChude.push(element);
				} else if (element.typeName === "theloai") {
					tagListTheloai.push(element);
				} else if (element.typeName === "hedieuhanh") {
					tagListHedieuhanh.push(element);
				}
			});
		}
		return (
			<div style={{ marginTop: "8px", marginBottom: "5px" }}>
				<HeadMenu></HeadMenu>
				<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
							<Hidden mdUp>
								<Grid item xs={12}>
									<List className="inbox-list-root">
										<ListItem style={{ padding: "8px" }}>
											<TextField InputProps={{ disableUnderline: true }} style={{ width: "70%", border: "solid 1px #666", borderRight: "0px", padding: "1px 1px 1px 20px", borderRadius: "20px 0px 0px 20px", background: "#151c24" }} placeholder="Tên game" onChange={this.handleChange('searchValue')}
												defaultValue={this.state.searchValue}></TextField>
											<Button style={{ width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
											<Button onClick={() => this.handleExpandItem()} style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "20%" }} ><FilterIcon style={{ color: "#fff" }} ></FilterIcon></Button>
										</ListItem>
										<Collapse in={(_this.state.expand === true)} timeout="auto" unmountOnExit>
											<Grid container style={{ width: "100%", margin: "0" }}>
												<Grid item xs={12}>
													<div style={{ color: "gray", marginTop: "10px" }}>Hệ điều hành</div>
													{tagListHedieuhanh.map((obj, key) => {
														return (<Chip style={{
															margin: "5px",
															border: "solid 1px",
															backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
															borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
															color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
														}} key={key}
															label={obj.name} onClick={() => this.handleAddTag(obj)} />)
													})}
													<Divider style={{ marginTop: "10px" }} />
													<div style={{ color: "gray", marginTop: "10px" }}>Thể loại</div>
													{tagListTheloai.map((obj, key) => {
														return (<Chip style={{
															margin: "5px",
															border: "solid 1px",
															backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
															borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
															color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
														}} key={key} label={obj.name} onClick={() => this.handleAddTag(obj)} />)
													})}
													<Divider style={{ marginTop: "10px" }} />
													<div style={{ color: "gray", marginTop: "10px" }}>Chủ đề</div>
													{tagListChude.map((obj, key) => {
														return (<Chip style={{
															margin: "5px",
															border: "solid 1px",
															backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
															borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
															color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
														}} key={key}
															label={obj.name} onClick={() => this.handleAddTag(obj)} />)
													})}
													<Divider style={{ marginTop: "10px" }} />
													<div style={{ color: "gray", marginTop: "10px" }}>Sắp xếp</div>
													<Chip style={{
														margin: "5px",
														border: "solid 1px",
														backgroundColor: (_this.state.sort === 1) ? "transparent" : "#38414e",
														borderColor: (_this.state.sort === 1) ? secondary.main : "transparent",
														color: (_this.state.sort === 1) ? secondary.main : "#fff"
													}}
														label="Thời gian" onClick={() => this.changeSort(1)} />
													<Chip style={{
														margin: "5px",
														border: "solid 1px",
														backgroundColor: (_this.state.sort === 2) ? "transparent" : "#38414e",
														borderColor: (_this.state.sort === 2) ? secondary.main : "transparent",
														color: (_this.state.sort === 2) ? secondary.main : "#fff"
													}}
														label="Người chơi" onClick={() => this.changeSort(2)} />
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
									</List>
								</Grid>
							</Hidden>
							{(this.props.data.length === 0 && !this.props.waiting) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có kết quả</Grid>) : (
								<Grid item xs={12}></Grid>)}
							<Hidden mdUp>
								{this.props.data.map((obj, key) => (
									<Grid key={key} item xs={12}>
										<Link to={"/gamedetail/" + obj.id} style={{ textDecoration: "none" }}>
											<ListItem style={{ padding: "10px" }}>
												<div style={{
													backgroundImage: "url(" + obj.defaultImage + ")",
													backgroundSize: "contain",
													width: "64px",
													height: "64px",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													position: "relative",
													overflow: "hidden"
												}}>
												</div>
												<ListItemText style={{ textAlign: "left" }} primary={(<span><b><span style={{ color: secondary.main }} >{obj.name}</span></b>{(obj.subTitle !== "" && obj.subTitle !== null) ? (<span style={{
													"borderRadius": "5px",
													"background": (obj.subTitle === "NEW") ? "#fe8731" : secondary.main,
													"color": "white",
													"padding": "0px 5px",
													"marginLeft": "5px",
												}}>{obj.subTitle}</span>) : (<span></span>)}</span>)}
													secondary={(<span>{obj.downloadTurns + " Lượt tải"}<br />
														<div style={{marginTop:"5px"}}>
															<Rating point={obj.pointReview}></Rating>
															<span style={{
																marginLeft:"10px",
																fontSize:"11px",
																border: "1px solid #23c9b6",
																padding:"1px 2px",
																borderRadius: "20px"}}>
																<label style={{color:"#23c9b6"}}>{this.getTheLoai(obj)}</label>
															</span>
														</div>
													</span>)} />
												<Button
													style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}>Chơi</Button>
												{/* {(obj.subTitle === "hot")
										? (<div className="game-item-hot"><div className="game-item-new-inside"><div className="content">Hot</div></div></div>)
										: (obj.subTitle === "suggest") ? (<div className="game-item-sug"><div className="game-item-new-inside"><div className="content">Đề cử</div></div></div>)
											: (obj.subTitle === "new") ? (<div className="game-item-new"><div className="game-item-new-inside"><div className="content">Mới</div></div></div>) : (<div></div>)} */}
											</ListItem>
										</Link>
										<Divider />
									</Grid>
								))}
							</Hidden>
							<Hidden smDown>
								{this.props.data.map((obj, key) => (
									<Grid key={key} item xs={3} style={{ padding: "10px", position: "relative" }} onMouseOver={() => this.handleHover(obj.id)} onMouseOut={() => this.handleOut(obj.id)} >
										<Link to={"/gamedetail/" + obj.id} style={{ textDecoration: "none", color: secondary.main }} >
										<div
											style={{
												position: "absolute",
												width: "100%",
												height: "100%",
												top: "0",
												left: "0",
												background: "rgba(0, 0, 0, 0.8)",
												border: "2px dashed #23c9b6",
												opacity: (this.state.hover === obj.id) ? "1" : "0",
												transition: "0.5s"
											}}
										><div style={{ position: "absolute", top: "30%", width: "100%", textAlign: "center", color: "#23c9b6",fontSize:"1.2em" }}>Chi tiết</div></div>
											<div
												style={{
													backgroundImage: "url(" + obj.bigImage + ")",
													backgroundSize: "cover",
													width: "100%",
													height: "0px",
													paddingBottom: "40%",
													backgroundPosition: "left",
													backgroundRepeat: "no-repeat",
													overflow: "hidden"
												}}>
											</div>
											<div style={{
												width: "100%",
												marginTop: "10px"
											}}>
												{obj.name}
											</div>
											<div style={{marginTop:"5px"}}>
												<span style={{color: "#fff"}}>
													<Rating point={obj.pointReview}></Rating>
												</span>
												<span style={{
													float:"right",
													fontSize:"11px",
													border: "1px solid #23c9b6",
													padding:"1px 2px",
													borderRadius: "20px"}}>
													<label>{this.getTheLoai(obj)}</label>
												</span>
											</div>
										</Link>
									</Grid>
								))}
							</Hidden>
							{(this.props.waiting) ? (<Grid item xs={12}>
								<div className="global-loadmore">
									<CircularProgress size={50} />
								</div>
							</Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
								<Grid item xs={12}>
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
									<TextField InputProps={{ disableUnderline: true }} style={{ width: "80%", border: "solid 1px #666", borderRight: "0px", padding: "1px 1px 1px 20px", borderRadius: "20px 0px 0px 20px", background: "#151c24" }} placeholder="Tên game" onChange={this.handleChange('searchValue')}
										defaultValue={this.state.searchValue}></TextField>
									<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								</Grid>
								<Grid item xs={12}>
									<div style={{ color: "gray", marginTop: "10px" }}>Hệ điều hành</div>
									{tagListHedieuhanh.map((obj, key) => {
										return (<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
											borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
											color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
										}} key={key}
											label={obj.name} onClick={() => this.handleAddTag(obj)} />)
									})}
									<Divider style={{ marginTop: "10px" }} />
									<div style={{ color: "gray", marginTop: "10px" }}>Thể loại</div>
									{tagListTheloai.map((obj, key) => {
										return (<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
											borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
											color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
										}} key={key} label={obj.name} onClick={() => this.handleAddTag(obj)} />)
									})}
									<Divider style={{ marginTop: "10px" }} />
									<div style={{ color: "gray", marginTop: "10px" }}>Chủ đề</div>
									{tagListChude.map((obj, key) => {
										return (<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
											borderColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
											color: (_this.state.selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
										}} key={key}
											label={obj.name} onClick={() => this.handleAddTag(obj)} />)
									})}
									<Divider style={{ marginTop: "10px" }} />
									<div style={{ color: "gray", marginTop: "10px" }}>Sắp xếp</div>
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.sort === 1) ? "transparent" : "#38414e",
										borderColor: (_this.state.sort === 1) ? secondary.main : "transparent",
										color: (_this.state.sort === 1) ? secondary.main : "#fff"
									}}
										label="Thời gian" onClick={() => this.changeSort(1)} />
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (_this.state.sort === 2) ? "transparent" : "#38414e",
										borderColor: (_this.state.sort === 2) ? secondary.main : "transparent",
										color: (_this.state.sort === 2) ? secondary.main : "#fff"
									}}
										label="Người chơi" onClick={() => this.changeSort(2)} />
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
				<Dialog
					fullScreen={fullScreen}
					open={this.state.tagDialogOpen}
					onClose={this.handleCloseTagDialog}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">Lọc theo</DialogTitle>
					<DialogContent>
						<h3>Hệ điều hành</h3>
						{tagListHedieuhanh.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Thể loại</h3>
						{tagListTheloai.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Chủ đề</h3>
						{tagListChude.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (_this.state.selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Tên game</h3>
						<TextField label="Tên game" onChange={this.handleChange('searchValue')} defaultValue={this.state.searchValue}></TextField>
						<Divider />
						<h3>Sắp xếp</h3>
						<Select
							native
							style={{ marginLeft: "5px" }}
							value={this.state.sort}
							onChange={this.handleChange('sort')}
						>
							<option value="">Không sắp xếp</option>
							<option value={1}>Thời gian</option>
							<option value={2}>Người chơi</option>
						</Select>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.searchAction} color="primary">
								Tìm kiếm
              </Button>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.game.data,
	waiting: state.game.waiting,
	totalRecords: state.game.totalRecords,
	tagData: state.tag.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	getTagData,
	changeTitle,
	changePage: () => push('/game_detail')
}, dispatch)

Game.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(withTheme()(Game))))