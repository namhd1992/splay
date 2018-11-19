import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/inbox'
import {
	getData as getDataProfile
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import CopyIcon from 'material-ui-icons/ContentCopy'
import copy from 'copy-to-clipboard'
import moment from 'moment'
import { withTheme } from 'material-ui/styles'
import CheckinIcon from 'material-ui-icons/CheckCircle'
import MissionIcon from 'material-ui-icons/ContentPaste'
import Notification from '../../components/Notification'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'
import LoginRequired from '../../components/LoginRequired'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: "0px",
		width: '100%'
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

class Inbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			service: -1,
			openSnack: false,
			message: "",
			snackVariant: "info",
			loadedRecords: 0,
			dialogLoginOpen: false,
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}


	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getData(this.state.limit, this.state.offset, user.access_token, this.state.service).then(function () {
				_this.props.changeTitle("INBOX");
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
			});
		}else {
			_this.setState({ dialogLoginOpen: true });
		}
		// this.props.getDataProfile(user.access_token, user.scoinAccessToken);
	}

	loadMoreAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, user.access_token, this.state.service);
		this.setState({
			offset: newOffset,
			loadedRecords: _this.state.limit + newOffset
		});
	}

	copy = (text) => {
		copy(text);
		this.setState({ openSnack: true, message: "Đã sao chép " + text });
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value, offset: 0 });
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getData(this.state.limit, 0, user.access_token, event.target.value);
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	render() {
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		return (
			<div>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container className="inbox-root" style={{ backgroundColor: "#232b36" }}>
							<Grid item xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="age-native-simple">Bộ lọc</InputLabel>
									<Select
										native
										value={this.state.service}
										onChange={this.handleChange('service')}
										inputProps={{
											id: 'age-native-simple',
										}}
										style={{ backgroundColor: "#232b36" }}
									>
										<option style={{ backgroundColor: "#232b36" }} value={-1}>Tất cả</option>
										<option style={{ backgroundColor: "#232b36" }} value={1}>Điểm danh</option>
										<option style={{ backgroundColor: "#232b36" }} value={2}>Nhiệm vụ</option>
										<option style={{ backgroundColor: "#232b36" }} value={3}>Vòng quay</option>
										<option style={{ backgroundColor: "#232b36" }} value={4}>Giftcode</option>
										<option style={{ backgroundColor: "#232b36" }} value={5}>Đấu giá</option>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<List className="inbox-list-root">
									{this.props.data.map((obj, key) => (
										<ListItem key={key} style={{ borderBottom: "solid 1px #333" }}>
											{(obj.serviceId === 1) ? (<Avatar style={{ backgroundColor: secondary.main }}><CheckinIcon></CheckinIcon></Avatar>) : (
												<span></span>)}
											{(obj.serviceId === 2) ? (<Avatar style={{ backgroundColor: secondary.main }}><MissionIcon></MissionIcon></Avatar>) : (
												<span></span>)}
											{(obj.serviceId === 3) ? (<Avatar style={{ backgroundColor: secondary.main }}><img alt="home lucky icon" className="head-menu-icon"
												style={{ width: "24px", height: "24px" }}
												src="../lucky_icon.png" /></Avatar>) : (
													<span></span>)}
											{(obj.serviceId === 4) ? (
												<Avatar style={{ backgroundColor: secondary.main }}><img alt="home giftcode icon" className="head-menu-icon"
													style={{ width: "24px", height: "24px" }}
													src="../giftcode_icon.png" /></Avatar>) : (<span></span>)}
											{(obj.serviceId === 5) ? (
												<Avatar style={{ backgroundColor: secondary.main }}><img alt="home auction icon" className="head-menu-icon"
													style={{ width: "24px", height: "24px" }}
													src="../auction_icon.png" /></Avatar>) : (<span></span>)}
											<ListItemText primary={(<span style={{ color: "#fff" }}>{obj.message} {(obj.stringValue != null) ? " - " + obj.stringValue : ""}</span>)}
												secondary={(<span style={{ color: "#ccc" }}>{moment(obj.createOn).format("hh:mm DD/MM/YYYY")}</span>)} />
											{(obj.stringValue != null) ? (<ListItemSecondaryAction>
												<IconButton aria-label="Comments" onClick={() => this.copy(obj.stringValue)}>
													<CopyIcon style={{ color: secondary.main }} color="primary" />
												</IconButton>
											</ListItemSecondaryAction>) : (<div></div>)}
										</ListItem>
									))}
								</List>
								{(this.props.waiting) ? (<Grid item xs={12} style={{ color: secondary.main }} className="global-loadmore"><CircularProgress
									size={50} style={{ color: secondary.main }}
								/></Grid>) : (this.props.totalRecords > this.state.loadedRecords) ? (
									<Grid item xs={12} style={{ color: secondary.main }} className="global-loadmore">
										<a onClick={this.loadMoreAction}>Xem thêm</a>
									</Grid>
								) : (<div></div>)}
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		)
	}
}

Inbox.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	data: state.inbox.data,
	waiting: state.inbox.waiting,
	totalRecords: state.inbox.totalRecords,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getDataProfile,
	getMoreData,
	changeTitle,
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTheme()(withStyles(styles)(Inbox)))