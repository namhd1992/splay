import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import DoneIcon from 'material-ui-icons/Done'
import LoginRequired from '../../components/LoginRequired'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withTheme } from 'material-ui/styles'
import '../../styles/imageServerError.css'


class CheckinComponent extends React.Component {

	checkin=()=>{
		this.props.checkin();
	}

	render() {
		const {data, dialogLoginOpen, waiting,server}=this.props;
		var toDay = data[1];
		var award = 0;
		if (data[0] !== undefined) {
			data[0].forEach(obj => {
				if (toDay.toDay === obj.day) {
					award = obj.awardPoint + obj.pointBonus
				}
			});
		}
		
		return (data.length === 2) ? (
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
							{data[0].map((obj, key) => (
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
							{(waiting) ? (<div className="global-loading">
							{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
							</div>) : (
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
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading">
			{(server !== true) ? (												
			<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
			src="../baotri.png" />)}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

export default connect()(withTheme()(CheckinComponent))
