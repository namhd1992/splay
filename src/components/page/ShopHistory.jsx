import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import {
	withMobileDialog,
} from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import LoginRequired from '../../components/LoginRequired'
import '../../styles/imageServerError.css'



const styles = theme => ({
	root: {
		marginTop: "8px",
		marginBottom: "8px",
		borderRadius: "5px",
	},
	gridItem: {
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px",
		backgroundColor: "white"
	},
	gridLink: {
		textDecoration: "none"
	}
});


class ShopHistoryComponent extends React.Component {


	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}
	
	handleExpandItem=(id)=>{
		this.props.handleExpandItem(id);
	}
	
	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}

	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const {data, waiting,totalRecords,profileData,loadedRecords,dialogLoginOpen,expand,server}=this.props;
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		var splayPoint=profileData.splayPoint;
		var scoinBalance=profileData.scoinBalance;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}

		if(scoinBalance !== undefined){
			scoinBalance=this.convettoLocaleString(scoinBalance);
		}
	
		return (<div className={classes.root}>
			<HeadMenu></HeadMenu>
			<Grid container spacing={8} >
				<Grid item xs={12} md={8}>
					<Grid container spacing={8} justify="center" style={{ marginBottom: "10px" }} >
						<Grid item xs={12} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar src={"../default_ava.png"} ></Avatar>
								<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{profileData.fullName}</div>
							</ListItem>
						</Grid>
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
								<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{splayPoint}</div>
							</ListItem>
						</Grid>
						<Grid item xs={6} >
							<ListItem style={{ padding: "2px" }}>
								<Avatar style={{ padding: "2px" }} src="../scoin.png"><img style={{ maxWidth: "100%" }} src="../scoin.png" /></Avatar>
								<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{scoinBalance}</div>
							</ListItem>
						</Grid>
					</Grid>
					<Grid container spacing={8} justify="center">
						{(data.length <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có lịch sử</Grid>) : (<span></span>)}
						<Grid item xs={12}>
							<List className="inbox-list-root">
								{data.map((obj, key) => (
									<div key={key}>
										<ListItem button onClick={() => this.handleExpandItem(obj.id)}
											style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "auto" }}>
											<Avatar><img src={obj.itemImage} style={{ width: "100%" }} /></Avatar>
											<ListItemText primary={(<span>{obj.name}</span>)}
												secondary={obj.status} />
											{(expand.indexOf(obj.id) !== -1) ? <ExpandLess /> : <ExpandMore />}
										</ListItem>
										<Collapse in={(expand.indexOf(obj.id) !== -1)} timeout="auto" unmountOnExit>
											<List component="div" disablePadding style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px 10px", width: "auto" }}>
												<ListItem>
													<Avatar></Avatar>
													<ListItemText primary={moment(obj.createOn).format("hh:mm DD/MM/YYYY")} secondary={<span>{obj.amount} <img
														src="../scoin.png"
														style={{ height: "18px", verticalAlign: "text-bottom" }} /></span>} />
													<ListItemText primary={(<span>{obj.userType}</span>)} />
												</ListItem>
												<ListItem>
													<Avatar></Avatar>
													<ListItemText primary={obj.note} />
												</ListItem>
											</List>
										</Collapse>
									</div>
								))}
								{(waiting) ? (<div className="global-loading">
								{(server !== true) ? (												
									<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
									src="../baotri.png" />)}
								</div>) : (totalRecords > loadedRecords) ? (
									<ListItem className="global-loadmore" style={{ textAlign: "center", background: "#232b36", borderRadius: "5px", margin: "5px", width: "auto" }}>
										<a onClick={this.loadMoreAction} style={{ color: secondary.main, margin: "auto" }}>Xem thêm</a>
									</ListItem>
								) : (<div></div>)}
							</List>
						</Grid>
					</Grid>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} md={4}>
						<RightArea></RightArea>
					</Grid>
				</Hidden>
			</Grid>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

export default connect()(withMobileDialog()(withStyles(styles)(withTheme()(ShopHistoryComponent))))
