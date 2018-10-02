import React from 'react'
import { getData as getGameData } from '../modules/game'
import { getData as getArticleData } from '../modules/article'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import { ListItem, ListItemText } from 'material-ui/List'
import moment from 'moment'
import Rating from './Rating'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import { withTheme } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'

const styles = {
	root: {
		position: "absolute",
		top: "14px",

	},
	badge: {
		fontSize: "0.5em",
		width: "20px",
		height: "20px",
	},
};

class RightArea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			allArticles: [],
			allGames: [],
		};
	}

	componentDidMount() {
		var _this = this;
		_this.props.getGameData(12, 0, "", "", "").then(function () {
			_this.setState({ allGame: _this.props.gameData });
		});
		_this.props.getArticleData(6, 0, undefined, undefined, undefined).then(function () {
			_this.setState({ allArticles: _this.props.articleData });
		});
	}

	goToLink(id) {
		this.props.getDataDetail(id);
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
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		return (this.state.allGame !== undefined) ? (
			<div>
				<Grid container spacing={16} justify="center" style={{ margin: "0px", width: "100%" }}>
					<Grid item xs={12}>
						<div style={{
							borderRadius: "5px",
							padding: "5px",
							overflow: "hidden",
							color: "#fff",
							display: "flex"
						}}>
							<div className={classes.homeTitle} style={{ textAlign: "left", width: "90%" }}> Tin Tức </div>
							<div className={classes.homeLink}><Link to="/article"><KeyboardArrowRight
								style={{ color: "#555" }}></KeyboardArrowRight></Link></div>
						</div>
					</Grid>
					<Grid item xs={12}>
						{this.state.allArticles.map((obj, key) => {
							return (
								<ListItem key={key} style={{ padding: "10px 0px" }}>
									{(obj.articleType === "event") ? (<div style={{
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
									<ListItemText style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontSize: "0.8em" }} disableTypography={true} primary={(<span><Link onClick={() => { this.goToLink(obj.id) }} style={{ color: "#fff" }} to={"/article_detail/" + obj.id} className={classes.homeBlockLink}>
										{(obj.splayGameName !== "" && obj.splayGameName !== null) ? "[" + obj.splayGameName + "]" : ""} {obj.title}
									</Link></span>)} ></ListItemText>
									<span style={{ color: "#555", fontSize: "0.8em" }}>
										{moment(new Date(obj.createOn)).format("DD.MM")}
									</span>
								</ListItem>
							)
						}
						)}
					</Grid>
				</Grid>
				<Grid container style={{ margin: "16px 0px", width: "100%" }} spacing={16}>
					<Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", borderRadius: "15px", padding: "15px", border: "solid 1px #333", color: "#fff" }}>
						<span style={{ marginTop: "5px" }}>Thiếu
							<span className="global-thit" style={{ color: "#fe8731" }}>
								<img alt="just alt" src="../thit.png" /> Thịt
							</span> để tham gia hoạt động?
						</span><Link to={"./article_detail/129"} ><Button
							style={{
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minWidth: "auto",
								minHeight: "auto",
							}}>Nhận ngay</Button></Link>
					</Grid>
				</Grid>
				<Grid container style={{ margin: "0px", width: "100%" }} spacing={16}>
					<Grid item xs={12}>
						<div style={{
							borderRadius: "5px",
							padding: "5px",
							overflow: "hidden",
							color: "#fff",
							display: "flex"
						}}>
							<div className={classes.homeTitle} style={{ textAlign: "left", width: "90%" }}> Games </div>
							<div className={classes.homeLink}><Link to="/game"><KeyboardArrowRight
								style={{ color: "#555" }}></KeyboardArrowRight></Link></div>
						</div>
					</Grid>
					{this.state.allGame.slice(0, 8).map((obj, key) => (
						<Grid key={key} item xs={12}>
							<a href={"/gamedetail/" + obj.id} style={{ textDecoration: "none" }}>
								<ListItem style={{ padding: "8px 0px" }}>
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
									<ListItemText style={{ textAlign: "left" }} primary={(<span><b><span style={{ color: secondary.main }}>{obj.name}</span></b>{((obj.subTitle !== "" && obj.subTitle !== null)) ? (<span style={{
										"borderRadius": "5px",
										"background": (obj.subTitle === "NEW") ? "#24b9a9" : "#fe8731",
										"color": "white",
										"padding": "0px 5px",
										"marginLeft": "5px",
									}}>{obj.subTitle}</span>) : (<span></span>)}</span>)}
										secondary={(<span>{"Hơn " + obj.downloadTurns + " lượt tải"}<br />
											<span style={{marginTop:"5px"}}>
												<Rating point={obj.pointReview}></Rating>
												<span style={{
																marginLeft:"20px",
																fontSize:"11px",
																border: "1px solid #23c9b6",
																padding:"1px 2px",
																borderRadius: "20px"}}>
																<span style={{color:"#23c9b6"}}>{this.getTheLoai(obj)}</span>
														</span>
											</span>
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
											minHeight: "auto",
										}}>Chơi</Button>
									{/* {(obj.subTitle === "hot")
										? (<div className="game-item-hot"><div className="game-item-new-inside"><div className="content">Hot</div></div></div>)
										: (obj.subTitle === "suggest") ? (<div className="game-item-sug"><div className="game-item-new-inside"><div className="content">Đề cử</div></div></div>)
											: (obj.subTitle === "new") ? (<div className="game-item-new"><div className="game-item-new-inside"><div className="content">Mới</div></div></div>) : (<div></div>)} */}
								</ListItem>
							</a>
							<Divider />
						</Grid>
					))}
					<Grid item xs={12}>
						<div style={{ textAlign: "center" }}>
							<Link to="/game">
								<Button
									style={{
										borderRadius: "20px",
										background: "transparent",
										color: "#fff",
										padding: "10px",
										fontSize: "0.8em",
										whiteSpace: "nowrap",
										minWidth: "auto",
										minHeight: "auto"
									}}>Xem thêm</Button>
							</Link>
						</div>
					</Grid>
				</Grid>
			</div>
		) : (<div></div>);
	}
}

const mapStateToProps = state => ({
	gameData: state.game.data,
	articleData: state.article.data,
	waiting: state.game.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getGameData,
	getArticleData,
}, dispatch)

RightArea.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withTheme()(RightArea))));
