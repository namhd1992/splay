import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import RightArea from '../../components/RightArea'
import Hidden from 'material-ui/Hidden'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import '../../styles/imageServerError.css'


const styles = theme => ({
	root: {
		marginTop: "8px",
		margin: "auto"
	},
	gridItem: {
		backgroundColor: "#232b36",
		borderRadius: "5px"
	},
	gridLink: {
		textDecoration: "none"
	}
});

class GiftCodeComponent extends React.Component {


	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	render() {
		const { classes } = this.props;
		const { server,loadedRecords ,totalRecords,waiting} = this.props;
		return (
			<div>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container spacing={8}>
							{(this.props.data.length <= 0) ? (<Grid item xs={12} style={{ textAlign: "center", color: "#fff" }}>Không có Giftcode</Grid>) : (<span></span>)}
							{this.props.data.map((obj, key) => (
								<Grid key={key} item xs={12}>
									<div className={classes.gridItem}>
										<Link to={"/giftcodedetail/" + obj.giftcodeEvent.id} className={classes.gridLink}>
											<ListItem>
												<div className="giftcode-item-image">
													<div style={{
														backgroundImage: "url(" + obj.defaultImage + ")",
														backgroundSize: "contain",
														width: "72px",
														height: "72px",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat"
													}}></div>
												</div>
												<ListItemText disableTypography={true}
													primary={(<h4 style={{ color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "400" }}
														className="giftcode-item-name">{obj.title}</h4>)}
													secondary={(<span style={{ color: "#ccc" }}>{"Còn lại " + (obj.giftcodeEvent.numberGiftcode - obj.giftcodeEvent.numberGiftcodeLost)}</span>)} />
												<div>
													<Button color="primary" style={{
														borderRadius: "20px",
														background: "linear-gradient(90deg,#22cab5,#3fe28f)",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minWidth: "auto",
														minHeight: "auto"
													}}>Nhận</Button>
												</div>
											</ListItem>
										</Link>
									</div>
								</Grid>
							))}
							{(waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}>
							{(server !== true) ? (												
								<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
							</Grid>) : (totalRecords > loadedRecords) ? (
								<Grid item xs={12} style={{ textAlign: "center", color: "#23c9b6" }}>
									<a onClick={this.loadMoreAction}>Xem thêm</a>
								</Grid>
							) : (<div></div>)}
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		);
	}
}


export default connect()(withStyles(styles)(GiftCodeComponent))