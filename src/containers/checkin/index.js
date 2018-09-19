import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/checkin.css'
import {
	getData,
	checkin
} from '../../modules/checkin'
import {
	changeTitle
} from '../../modules/global'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import DoneIcon from 'material-ui-icons/Done'
import Hidden from 'material-ui/Hidden'
import { withTheme } from 'material-ui/styles'
import RightArea from '../../components/RightArea'
import { withStyles } from 'material-ui/styles'
import LoginRequired from '../../components/LoginRequired'

const styles = theme => ({
	root: {
		marginTop: "8px",
		marginBottom: "8px",
		borderRadius: "5px",
		margin: "auto"
	},
	gridItem: {
		display: "flex",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px",
		backgroundColor: "#232b36",
		justifyContent: "space-between"
	},
	gridLink: {
		textDecoration: "none"
	}
});

class Checkin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 12,
			offset: 0,
			dialogLoginOpen: false,
		};
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			this.props.getData(user.access_token).then(function () {
				_this.props.changeTitle("ĐIỂM DANH");
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	checkin = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.checkin(user.access_token).then(function () {
			_this.props.getData(user.access_token);
		});
	}

	render() {
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		var toDay = this.props.data[1];
		var award = 0;
		if (this.props.data[0] !== undefined) {
			this.props.data[0].forEach(obj => {
				if (toDay.toDay === obj.day) {
					award = obj.awardPoint + obj.pointBonus
				}
			});
		}
		return (this.props.data.length === 2) ? (
			<div>
				<Grid container className="checkin-root" spacing={8} >
					<Grid item xs={12} md={8}>
						<Grid container spacing={8} >
							<Grid item xs={12}>
								<List className="checkin-root-list">
									<ListItem>
										<ListItemText primary={(<span style={{ color: "#fff" }}>Quà đăng nhập hôm nay <span className="global-thit" style={{ color: "#ff6126" }}> {award + " Thịt"} <img alt="just alt"
											src="../thit.png" /></span></span>)}></ListItemText>
										<Hidden xsDown>
											<div>
												{(!toDay.checkined) ? (
													<Button onClick={this.checkin} style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}>Điểm danh</Button>) : (
														<Button disabled style={{ color: "#ccc" }}>Đã nhận</Button>)}
											</div>
										</Hidden>
									</ListItem>
								</List>
							</Grid>
							<Hidden smUp>
								<div style={{ width: "100%", padding: "10px", textAlign: "center" }}>
									{(!toDay.checkined) ? (<Button onClick={this.checkin} style={{
										borderRadius: "20px",
										background: "linear-gradient(90deg,#22cab5,#3fe28f)",
										color: "#fff",
										padding: "10px",
										fontSize: "0.8em",
										whiteSpace: "nowrap",
										minWidth: "auto",
										minHeight: "auto"
									}}>Điểm danh</Button>) : (
											<Button disabled style={{ width: "100%", color: "#ccc" }}>Đã nhận</Button>)}
								</div>
							</Hidden>
							<Grid item xs={12}>
							</Grid>
							{this.props.data[0].map((obj, key) => (
								<Grid className="checkin-item-wrap" key={key} item xs={4} sm={3}>
									<div
										className={(toDay.toDay === obj.day) ? (toDay.checkined) ? "checkin-item" : "checkin-item-today" : (toDay.toDay < obj.day) ? "checkin-item-wait" : "checkin-item"}>
										<div className="checkin-day">{"Ngày " + obj.day}</div>
										<div className="checkin-icon"><img alt="just alt" src="../thit.png" /></div>
										<div className="checkin-price">
											<div className="global-thit" style={{ color: "#fff" }}>{obj.awardPoint + obj.pointBonus} Thịt</div>
										</div>
										{(toDay.toDay > obj.day || (toDay.checkined && obj.day === toDay.toDay)) ? (
											<div className="checkin-done"><DoneIcon className="checkin-done-icon"></DoneIcon></div>) : (<div></div>)}
									</div>
								</Grid>
							))}
							{(this.props.waiting) ? (<div className="global-loading"><CircularProgress
								size={50}
							/></div>) : (
									<div></div>
								)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
				<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading"><CircularProgress
			size={50}
		/>
			<LoginRequired open={this.state.dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

const mapStateToProps = state => ({
	data: state.checkin.data,
	actiondata: state.checkin.actiondata,
	waiting: state.checkin.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	checkin,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTheme()(withStyles(styles)(Checkin)))