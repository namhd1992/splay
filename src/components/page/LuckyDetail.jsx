import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import ReactCardFlip from 'react-card-flip'
import ReactResizeDetector from 'react-resize-detector'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Notification from '../../components/Notification'
import LoginRequired from '../../components/LoginRequired'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#2b323d"
	},
	buttonOrange:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#ff5f27,#ff9019)",
		color: "#fff",
		padding: "10px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	},
	buttonGreen:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#22cab5,#3fe28f)",
		color: "#fff",
		padding: "10px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	}
};



class LuckyDetailComponent extends React.Component {


	showItem=()=>{
		this.props.showItem();
	}
	
	showBuyTurn=()=>{
		this.props.showBuyTurn();
	}
	
	handleCloseDialogItem=()=>{
		this.props.handleCloseDialogItem();
	}
	
	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}
	
	handleCloseMoreTurnDialog=()=>{
		this.props.handleCloseMoreTurnDialog();
	}
	
	handleCloseDialog=()=>{
		this.props.handleCloseDialog();
	}
	
	buyTurn=(turn)=>{
		this.props.buyTurn(turn);
	}
	
	pick=(key)=>{
		this.props.pick(key);
	}
	
	start=()=>{
		this.props.start();
	}
	
	expand=()=>{
		this.props.expand();
	}

	flipCard=(key)=>{
		this.props.flipCard(key);
	}
	
	swap=(id1, id2)=>{
		this.props.swap(id1, id2);
	}
	
	unHighLight=()=>{
		this.props.unHighLight();
	}
	
	highLight=(card_id)=>{
		this.props.highLight(card_id);
	}
	
	random=()=>{
		this.props.random();
	}
	openCard=(id)=>{
		this.props.openCard(id);
	}
	onResize=()=>{
		this.props.onResize();
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const {dataDetail, dataProfile,message,cardWidth,cardHeight,flippedArr,collapse,cardArr,
			dialogOpen,highLightCard,openSnack,snackVariant,dialogLoginOpen,dialogItemOpen,fontSize,dialogMoreTurnOpen,server }=this.props;

					
		const { classes } = this.props;
		const { fullScreen } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		var splayPoint=dataProfile.splayPoint;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}
		var _this = this;
		return (cardArr.length > 0) ? (
			<div className="lucky-detail-root" style={{ marginTop: "8px" }}>
				<Grid container spacing={8}>
					<Grid item xs={12} md={8}>
						<Grid container className="lucky-detail-root" spacing={8}>
							<Grid item xs={12}>
								<div className="lucky-wrap"
									style={{ margin: "auto", width: (cardWidth * 4) + "px", height: (cardHeight * 3) + "px", position: "relative" }}>
									{cardArr.map((obj, key) => {
										var top = "0px";
										var left = "0px";
										if (!collapse) {
											left = (key % 4) * cardWidth + "px";
											top = (Math.floor(key / 4)) * cardHeight + "px"
										}
										return (<div key={key} className="lucky-card lucky-card-collapse"
											style={{
												transition: "0.5s",
												WebkitTransition: "0.5s",
												width: cardWidth,
												height: cardHeight + "px",
												left: left,
												top: top
											}}>
											<ReactCardFlip style={{ height: '100%' }} isFlipped={flippedArr.find(x => x.id === obj.item.id).status}>
												<div key="front" style={{
													opacity: (highLightCard === null || highLightCard === obj.item.id) ? "1" : "0.5",
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardfront1.png)",
													width: "100%",
													height: cardHeight + "px",
													textAlign: "center"
												}}>
													<div style={{ paddingTop: cardHeight * 0.3 + "px" }}><img alt="just alt" style={{ width: (cardWidth * 0.5) + "px" }}
														src={obj.item.urlImage} /></div>
													<div style={{ fontSize: fontSize }}>{obj.item.name}</div>
												</div>
												<div key="back" onClick={() => this.pick(obj.item.id)} style={{
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
													backgroundImage: "url(../cardback1.png)",
													width: "100%",
													height: cardHeight + "px",
													textAlign: "center"
												}}>
												</div>
											</ReactCardFlip>
										</div>)
									}
									)}
								</div>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button className={classes.buttonGreen} onClick={this.start}>Chơi
              ({dataDetail.userSpinInfo.turnsBuy + dataDetail.userSpinInfo.turnsFree})</Button>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button className={classes.buttonOrange} onClick={this.showItem}>Phần thưởng</Button>
							</Grid>
							<Grid item xs={12} sm={4} className="lucky-button">
								<Button className={classes.buttonOrange} onClick={this.showBuyTurn}>Mua Lượt</Button>
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} md={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>

				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
				<Dialog
					fullScreen={false}
					open={dialogMoreTurnOpen}
					onClose={this.handleCloseMoreTurnDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Bạn đã hết lượt quay</span></DialogTitle>
					<DialogContent>
						<div style={{ color: "#fff" }}>
							Mua thêm lượt quay để tiếp tục
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<Button className={classes.buttonOrange} onClick={this.showBuyTurn}>
								Mua lượt
              </Button>
							<Button onClick={this.handleCloseMoreTurnDialog} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Dialog
					open={dialogOpen}
					onClose={this.handleCloseDialog}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Mua lượt</span></DialogTitle>
					<DialogContent>
						<List className="lucky-detail-root">
							{dataDetail.settings.map((obj, key) => (
								<ListItem key={key}>
									<ListItemText primary={obj.intValue + " Lượt"} secondary={(
										<span className="global-thit"><span style={{ color: "#fe8731" }} >{obj.intValue * dataDetail.luckyspin.pricePerSpin + " thịt"}</span> <img alt="just alt"
											src="../thit.png" /></span>)} />
									<div className="lucky-button">
										<Button className={classes.buttonGreen} onClick={() => this.buyTurn(obj.intValue)}>Mua</Button>
									</div>
								</ListItem>
							))}
						</List>
					</DialogContent>
					<DialogActions>
						<div><span className="global-thit"><span style={{ color: "#fe8731" }} >{splayPoint + " thịt"}</span> <img alt="just alt" src="../thit.png" /></span></div>
						<div>
							<Button onClick={this.handleCloseDialog} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<Dialog
					open={dialogItemOpen}
					onClose={this.handleCloseDialogItem}
					aria-labelledby="responsive-dialog-title"
					classes={{ paper: classes.paper }}
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main }} >Phần thưởng</span></DialogTitle>
					<DialogContent>
						<List className="lucky-detail-root">
							{dataDetail.itemOfSpin.map((obj, key) => (
								<ListItem key={key} style={{ minWidth: "120px" }}>
									<div>
										<img alt="just alt" className="lucky-item-img" src={obj.item.urlImage} />
									</div>
									<ListItemText primary={obj.item.name} />
								</ListItem>
							))}
						</List>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseDialogItem} style={{ color: "#fe8731" }}>
								Đóng
              </Button>
						</div>
					</DialogActions>
				</Dialog>
				<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
		) : (<div className="global-loading">
			{(server !== true) ? (												
					<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
					src="../baotri.png" />)}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

LuckyDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(LuckyDetailComponent)))
