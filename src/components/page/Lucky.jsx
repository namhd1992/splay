import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import IconButton from 'material-ui/IconButton'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import '../../styles/imageServerError.css'


const styles = theme => ({
	root: {
		marginTop: "8px",
		margin: "auto"
	},
	gridItem: {
		borderRadius: "5px",
		backgroundColor: "#fff",
		overflow: "hidden"
	}
});

class LuckyComponent extends React.Component {

	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	render() {
		const {data, waiting, totalRecords, loadedRecords, server}=this.props;
		const { classes } = this.props;
		return (<div className={classes.root}>
			<Grid container spacing={8}>
				<Grid item xs={12} md={8}>
					<Grid container spacing={8}>
						{data.map((obj, key) => {
							var now = moment(new Date()); //todays date
							var end = moment(new Date(obj.endDate)); // another date
							var duration = moment.duration(end.diff(now));
							var days = Math.floor(duration.asDays());
							var hours = Math.floor(duration.asHours());
							var minutes = Math.floor(duration.asMinutes());
							var time_text = "";
							if (days > 0) {
								time_text = "còn " + days + " ngày";
							} else if (hours > 0) {
								time_text = "còn " + hours + " giờ";
							} else if (minutes > 0) {
								time_text = "còn " + minutes + " phút";
							}
							return (
								<Grid key={key} item xs={12} md={6}>
									<div className={classes.gridItem}>
										<Link to={"/luckydetail/" + obj.id}>
											<GridListTile style={{ listStyleType: "none", backgroundColor: "#fff" }}>
												<div style={{
													backgroundImage: "url(" + obj.image + ")",
													backgroundSize: "cover",
													width: "100%",
													paddingBottom: "30%",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center"
												}} />
												<GridListTileBar
													title={time_text}
													actionIcon={
														<IconButton>
														</IconButton>
													}
												/>
											</GridListTile>
										</Link>
									</div>
								</Grid>
							)
						}
						)}
						{(waiting) ? (<Grid item xs={12}>
							<div className="global-loading">
							{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
							</div>
						</Grid>) : (totalRecords > loadedRecords) ? (
							<Grid item xs={12}>
								<div className="global-loadmore">
									<a onClick={this.loadMoreAction}>Xem thêm</a>
								</div>
							</Grid>
						) : (<div></div>)}
					</Grid>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} md={4}>
						<RightArea></RightArea>
					</Grid>
				</Hidden>
			</Grid>
		</div>)
	}
}

export default connect()(withStyles(styles)(withTheme()(LuckyComponent)))
