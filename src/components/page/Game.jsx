import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withTheme } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import FilterIcon from 'material-ui-icons/FilterList'
import Collapse from 'material-ui/transitions/Collapse'
import SearchIcon from 'material-ui-icons/Search'
import Rating from '../../components/Rating'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import Chip from 'material-ui/Chip'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'

import '../../styles/imageServerError.css'
import '../../styles/game.css'

class TagList extends React.Component {
	constructor(props) {
	  super(props);
	}
	handleAddTag=(obj)=>{
		this.props.handleAddTag(obj);
	}
	render() {
		const { tagList, name, selectedTag, secondary } = this.props;
		return (
			<div>
				<div style={{ color: "gray", marginTop: "10px" }}>{name}</div>
				{tagList.map((obj, key) => {
					return (<Chip style={{
						margin: "5px",
						border: "solid 1px",
						backgroundColor: (selectedTag.indexOf(obj) !== -1) ? "transparent" : "#38414e",
						borderColor: (selectedTag.indexOf(obj) !== -1) ? secondary.main : "transparent",
						color: (selectedTag.indexOf(obj) !== -1) ? secondary.main : "#fff"
					}} key={key}
						label={obj.name} onClick={() => this.handleAddTag(obj)} />)
				})}
				<Divider style={{ marginTop: "10px" }} />
				
			</div>
			
		);
	}
  }

  class Sort extends React.Component {
	constructor(props) {
	  super(props);
	}
	changeSort=(sort)=>{
		this.props.changeSort(sort);
	}
	render() {
		const { sort, secondary } = this.props;
		const category=[{name:"Thời gian",value:1},{name:"Người chơi",value:2}];
		return (
			<div>
				{category.map((obj, key) => (
					<Chip style={{
						margin: "5px",
						border: "solid 1px",
						backgroundColor: (sort === obj.value) ? "transparent" : "#38414e",
						borderColor: (sort === obj.value) ? secondary.main : "transparent",
						color: (sort === obj.value) ? secondary.main : "#fff"
					}}
						label={obj.name} onClick={() => this.changeSort(obj.value)} />
				))}
			</div>
		);
	}
  }


class GameComponent extends React.Component {

	getTheLoai=(obj)=>{
		this.props.getTheLoai(obj);
	}

	handleOut=(id)=>{
		this.props.handleOut(id);
	}

	handleHover=(id)=>{
		this.props.handleHover(id);
	}

	handleExpandItem=()=>{
		this.props.handleExpandItem();
	}

	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	searchAction=()=>{
		this.props.searchAction();
	}

	handleApplyFilter=()=>{
		this.props.handleApplyFilter();
	}

	handleChange= name => event => {
		this.props.handleChange(name,event);
	}
	
	handleCloseTagDialog=()=>{
		this.props.handleCloseTagDialog();
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
		const {data, waiting, totalRecords, loadedRecords,tagList, sort, searchValue, tagDialogOpen, selectedTag, hover, expand,server}=this.props;
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		var tagListTheloai = [];
		var tagListChude = [];
		var tagListHedieuhanh = [];
		if (tagList !== undefined) {
			tagList.forEach((element) => {
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
												defaultValue={searchValue}></TextField>
											<Button style={{ width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
											<Button onClick={() => this.handleExpandItem()} style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "20%" }} ><FilterIcon style={{ color: "#fff" }} ></FilterIcon></Button>
										</ListItem>
										<Collapse in={(expand === true)} timeout="auto" unmountOnExit>
											<Grid container style={{ width: "100%", margin: "0" }}>
												<Grid item xs={12}>
													<TagList
														name="Hệ điều hành"
														tagList={tagListHedieuhanh}
														selectedTag={selectedTag}
														secondary={secondary}
														handleAddTag={this.props.handleAddTag}
													/>
													<TagList
														name="Thể loại"
														tagList={tagListTheloai}
														selectedTag={selectedTag}
														secondary={secondary}
														handleAddTag={this.props.handleAddTag}
													/>
													<TagList
														name="Chủ đề"
														tagList={tagListChude}
														selectedTag={selectedTag}
														secondary={secondary}
														handleAddTag={this.props.handleAddTag}
													/>
													<div style={{ color: "gray", marginTop: "10px" }}>Sắp xếp</div>
													<Sort
														sort={sort}
														secondary={secondary}
														changeSort={this.props.changeSort}
													/>
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
							{(data.length === 0 && !waiting) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có kết quả</Grid>) : (
								<Grid item xs={12}></Grid>)}
							<Hidden mdUp>
								{data.map((obj, key) => (
									<Grid key={key} item xs={12}>
										<Link to={"/gamedetail/" + obj.id} style={{ textDecoration: "none" }}>
											<ListItem style={{ padding: "10px" }}>
												<div className="logoGame" style={{
													backgroundImage: "url(" + obj.defaultImage + ")",
													backgroundSize: "contain",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
													position: "relative",
													overflow: "hidden"
												}}>
												</div>
												<ListItemText style={{ textAlign: "left" }} primary={(<span><b><span style={{ color: secondary.main }} >{obj.name}</span></b>{(obj.subTitle !== "" && obj.subTitle !== null) ? (<span style={{
													"borderRadius": "5px",
													"background": (obj.subTitle === "HOT") ? "#fe8731" : secondary.main,
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
														padding: "8px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}>Chơi</Button>
											</ListItem>
										</Link>
										<Divider />
									</Grid>
								))}
							</Hidden>
							<Hidden smDown>
								{data.map((obj, key) => (
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
												opacity: (hover === obj.id) ? "1" : "0",
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
							{(waiting) ? (<Grid item xs={12}>
								<div className="global-loadmore">
								{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
								</div>
							</Grid>) : (totalRecords > loadedRecords) ? (
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
										defaultValue={searchValue}></TextField>
									<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								</Grid>
								<Grid item xs={12}>
									<TagList
										name="Hệ điều hành"
										tagList={tagListHedieuhanh}
										selectedTag={selectedTag}
										secondary={secondary}
										handleAddTag={this.props.handleAddTag}
									/>
									<TagList
										name="Thể loại"
										tagList={tagListTheloai}
										selectedTag={selectedTag}
										secondary={secondary}
										handleAddTag={this.props.handleAddTag}
									/>
									<TagList
										name="Chủ đề"
										tagList={tagListChude}
										selectedTag={selectedTag}
										secondary={secondary}
										handleAddTag={this.props.handleAddTag}
									/>
									<div style={{ color: "gray", marginTop: "10px" }}>Sắp xếp</div>
									<Sort
										sort={sort}
										secondary={secondary}
										changeSort={this.props.changeSort}
									/>
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
					open={tagDialogOpen}
					onClose={this.handleCloseTagDialog}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">Lọc theo</DialogTitle>
					<DialogContent>
						<h3>Hệ điều hành</h3>
						{tagListHedieuhanh.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Thể loại</h3>
						{tagListTheloai.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Chủ đề</h3>
						{tagListChude.map((obj, key) => {
							return (<Chip style={{ margin: "5px", backgroundColor: (selectedTag.indexOf(obj) !== -1) ? "#03a9f4" : "lightgray" }} key={key}
								label={obj.name} onClick={() => this.handleAddTag(obj)} />)
						})}
						<Divider />
						<h3>Tên game</h3>
						<TextField label="Tên game" onChange={this.handleChange('searchValue')} defaultValue={searchValue}></TextField>
						<Divider />
						<h3>Sắp xếp</h3>
						<Select
							native
							style={{ marginLeft: "5px" }}
							value={sort}
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

export default connect()(withMobileDialog()(withTheme()(GameComponent)))
