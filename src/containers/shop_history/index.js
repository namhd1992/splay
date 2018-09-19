import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/history'
import {
	getData as getProfileData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import HeadMenu from '../../components/HeadMenu'
import { withTheme } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Dialog, {
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import LoginRequired from '../../components/LoginRequired'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'

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

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: "0px", paddingTop: "10px" }}>
			{props.children}
		</Typography>
	);
}

class Shop_history extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			auctionList: [],
			socket: null,
			loadedRecords: 0,
			value: 0,
			dialogLoginOpen: false,
			expand: []
		};
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	componentDidMount() {
		var _this = this;
		this.props.changeTitle("SHOP");
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getData(user.access_token, this.state.limit, this.state.offset).then(function () {
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleExpandItem = (id) => {
		if (this.state.expand.indexOf(id) !== -1) {
			this.state.expand.splice(this.state.expand.indexOf(id), 1);
		} else {
			this.state.expand.push(id);
		}
		this.forceUpdate();
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(user.access_token, this.state.limit, newOffset);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { fullScreen } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		const { value } = this.state;
		var _this = this;
		return (
			<div className={classes.root}>
				<HeadMenu></HeadMenu>
				<Grid container spacing={8} >
					<Grid item xs={12} md={8}>
						<Grid container spacing={8} justify="center" style={{ marginBottom: "10px" }} >
							<Grid item xs={12} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar src={"../default_ava.png"} ></Avatar>
									<div style={{ color: secondary.main, backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{this.props.profileData.fullName}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../thit.png"><img style={{ maxWidth: "100%" }} src="../thit.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{this.props.profileData.splayPoint.toLocaleString()}</div>
								</ListItem>
							</Grid>
							<Grid item xs={6} >
								<ListItem style={{ padding: "2px" }}>
									<Avatar style={{ padding: "2px" }} src="../scoin.png"><img style={{ maxWidth: "100%" }} src="../scoin.png" /></Avatar>
									<div style={{ color: "#fe8731", backgroundColor: "#15191e", width: "100%", marginLeft: "-20px", paddingLeft: "30px", borderRadius: "20px" }}>{this.props.profileData.scoinBalance.toLocaleString()}</div>
								</ListItem>
							</Grid>
						</Grid>
						<Grid container spacing={8} justify="center">
							{(this.props.data.length <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có lịch sử</Grid>) : (<span></span>)}
							<Grid item xs={12}>
								<List className="inbox-list-root">
									{this.props.data.map((obj, key) => (
										<div key={key}>
											<ListItem button onClick={() => this.handleExpandItem(obj.id)}
												style={{ backgroundColor: "#232b36", borderRadius: "5px", margin: "5px", width: "auto" }}>
												<Avatar><img src={obj.itemImage} style={{ width: "100%" }} /></Avatar>
												<ListItemText primary={(<span>{obj.name}</span>)}
													secondary={obj.status} />
												{(_this.state.expand.indexOf(obj.id) !== -1) ? <ExpandLess /> : <ExpandMore />}
											</ListItem>
											<Collapse in={(_this.state.expand.indexOf(obj.id) !== -1)} timeout="auto" unmountOnExit>
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
									{(this.props.waiting) ? (<div className="global-loading"><CircularProgress
										size={50}
									/></div>) : (this.props.totalRecords > this.state.loadedRecords) ? (
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
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.history.data,
	waiting: state.history.waiting,
	totalRecords: state.history.totalRecords,
	profileData: state.profile.data,
	profileWaiting: state.profile.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	getProfileData,
	changeTitle
}, dispatch)

Shop_history.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withStyles(styles)(withTheme()(Shop_history))))