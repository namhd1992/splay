import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Collapse from 'material-ui/transitions/Collapse'
import FilterIcon from 'material-ui-icons/FilterList'
import moment from 'moment'
import Divider from 'material-ui/Divider'
import SearchIcon from 'material-ui-icons/Search'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import { withTheme } from 'material-ui/styles'
import '../../styles/article.css'



class Category extends React.Component {
	constructor(props) {
	  super(props);
	}
	handleChangeType=(type)=>{
		this.props.handleChangeType(type);
	}
	render() {
		const { articleType, secondary } = this.props;
		const category=[{name:"Tất cả",value:undefined},{name:"Sự kiện",value:"event"},{name:"Tin tức",value:"news"}];
		return (
			<div>
				{category.map((obj, key) => (
					<Chip key={key} style={{
						margin: "5px",
						border: "solid 1px",
						backgroundColor: (articleType === obj.value) ? "transparent" : "#38414e",
						borderColor: (articleType === obj.value) ? secondary.main : "transparent",
						color: (articleType === obj.value) ? secondary.main : "#fff"
					}}
					label={obj.name} onClick={() => this.handleChangeType(obj.value)} />		
				))}
				
			</div>
			
		);
	}
  }


class ArticleComponent extends React.Component {

	handleExpandItem=()=>{
		this.props.handleExpandItem();
	}

	handleChange= name => event =>{
		this.props.handleChange(name,event);
	}

	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	handleApplyFilter=()=>{
		this.props.handleApplyFilter();
	}

	searchAction=()=>{
		this.props.searchAction();
	}

	handleChangeGame=(gameId)=>{
		this.props.handleChangeGame(gameId);
	}

	handleCloseTagDialog=()=>{
		this.props.handleCloseTagDialog();
	}

	render() {
		const {data, gameData, waiting, totalRecords, loadedRecords, searchValue, gameId, articleType, expand, server}=this.props;
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;

		return (
			<div>
				<Hidden mdUp>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12}>
							<ListItem style={{ padding: "8px" }}>
								<TextField InputProps={{ disableUnderline: true }}  style={{ width: "80%", border: "solid 1px #666", borderRight: "0px", padding: "1px 1px 1px 20px", borderRadius: "20px 0px 0px 20px", background: "#151c24" }} placeholder="Tiêu đề" onChange={this.handleChange('searchValue')}
									defaultValue={searchValue}></TextField>
								<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								<Button onClick={() => this.handleExpandItem()} style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "20%" }} ><FilterIcon style={{ color: "#fff" }} ></FilterIcon></Button>
							</ListItem>
							<Collapse in={(expand === true)} timeout="auto" unmountOnExit>
								<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
									<Grid item xs={12}>
										<div className="title">Game</div>
										<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (gameId === undefined) ? "transparent" : "#38414e",
											borderColor: (gameId === undefined) ? secondary.main : "transparent",
											color: (gameId === undefined) ? secondary.main : "#fff"
										}}
											label={"Tất cả"} onClick={() => this.handleChangeGame(undefined)} />
										{(gameData !== undefined) ? gameData.map((obj, key) => {
											return (<Chip style={{
												margin: "5px",
												border: "solid 1px",
												backgroundColor: (gameId === obj.id) ? "transparent" : "#38414e",
												borderColor: (gameId === obj.id) ? secondary.main : "transparent",
												color: (gameId === obj.id) ? secondary.main : "#fff"
											}} key={key}
												label={obj.name} onClick={() => this.handleChangeGame(obj.id)} />)
										}) : (<div></div>)}
										<Divider style={{ marginTop: "10px" }} />
										<div className="title">Thể loại</div>
										<Category
											handleChangeType={this.props.handleChangeType}
											articleType={articleType}
											secondary={secondary}
										/>
									</Grid>
									<Grid item xs={12} style={{ textAlign: "right" }}>
										<button onClick={() => this.handleApplyFilter()} className="buttonFull">Xác nhận</button>
									</Grid>
								</Grid>
							</Collapse>
						</Grid>
					</Grid>
				</Hidden>
				<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
							{(data.length === 0 && !waiting) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có kết quả</Grid>) : (
								<Grid item xs={12}></Grid>)}
							{data.map((obj, key) => (
								<Grid key={key} item xs={12}>
									<Link to={"/article_detail/" + obj.id} style={{ textDecoration: "none" }}>
										<ListItem key={key} style={{ padding: "10px 0px" }}>
											{(obj.articleType == "event") ? (<div className="articleEvent">Sự kiện</div>) : (<div className="articleNew">Tin tức</div>)}
											<ListItemText style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff", fontSize: "0.8em" }} disableTypography={true} primary={(<span><Link style={{ color: "#fff" }} to={"/article_detail/" + obj.id}>
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
							{(waiting) ? (<Grid item xs={12}>
								<div className="global-loadmore">
								{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img alt="just alt"
									src="../baotri.png" />)}
								</div>
							</Grid>) : (totalRecords > loadedRecords) ? (
								<Grid item xs={12} >
									<div className="global-loadmore">
										<a onClick={this.loadMoreAction} style={{ color: primary.main }}>XEM THÊM</a>
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
										defaultValue={searchValue}></TextField>
									<Button style={{ verticalAlign: "bottom", width: "10%", minWidth: "50px", background: "linear-gradient(90deg, rgb(34, 202, 181), rgb(63, 226, 143))", borderRadius: "0px 20px 20px 0px", padding: "0px" }} ><SearchIcon style={{ margin: "5px", float: "left" }} onClick={this.searchAction} /></Button>
								</Grid>
								<Grid item xs={12}>
									<div className="title">Game</div>
									<Chip style={{
										margin: "5px",
										border: "solid 1px",
										backgroundColor: (gameId === undefined) ? "transparent" : "#38414e",
										borderColor: (gameId === undefined) ? secondary.main : "transparent",
										color: (gameId === undefined) ? secondary.main : "#fff"
									}}
										label={"Tất cả"} onClick={() => this.handleChangeGame(undefined)} />
									{(gameData !== undefined) ? gameData.map((obj, key) => {
										return (<Chip style={{
											margin: "5px",
											border: "solid 1px",
											backgroundColor: (gameId === obj.id) ? "transparent" : "#38414e",
											borderColor: (gameId === obj.id) ? secondary.main : "transparent",
											color: (gameId === obj.id) ? secondary.main : "#fff"
										}} key={key}
											label={obj.name} onClick={() => this.handleChangeGame(obj.id)} />)
									}) : (<div></div>)}
									<Divider style={{ marginTop: "10px" }} />
									<div className="title">Thể loại</div>
									<Category
											handleChangeType={this.props.handleChangeType}
											articleType={articleType}
											secondary={secondary}
										/>
								</Grid>
								<Grid item xs={12} style={{ textAlign: "right" }}>
									<button onClick={() => this.handleApplyFilter()} className="buttonFull">Xác nhận</button>
								</Grid>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		);
	}
}


export default connect()(withTheme()(ArticleComponent))
