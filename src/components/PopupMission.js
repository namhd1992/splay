import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { ListItemText } from 'material-ui/List'
import '../styles/mission.css'



class PopupMission extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			openBonus:false,
			message:""
		};
	}
	handleClosePopupMission=()=>{
		this.props.handleClosePopupMission();
	}
	handleCloseBonus=()=>{
		this.setState({openBonus:false});
	}
	handleOpenBonus=()=>{
		this.setState({openBonus:true});
	}
	handleReceiveBonus=(id)=>{
		this.setState({openBonus:true, message:"Rất tiếc phần thưởng đã được nhận hết."});
		// this.props.handleReceiveBonus();
	}
	doMission=(action, id, value, scoinGameId)=>{
		this.setState({openBonus:true, message:"Rất tiếc bạn không đủ điều kiện nhận thưởng."});
		// this.props.doMission(action, id, value, scoinGameId);
	}

	render() {
		const {dataMission,openPopupMission}=this.props;
		return (
			<div>
				<Dialog
					fullScreen={false}
					open={openPopupMission}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }}>Chi tiết nhiệm vụ</span></DialogTitle>
					<DialogContent style={{ color: "#fff" }}>
					{(dataMission !==undefined) ? (
						<div>		
							<div>
								{dataMission.description}
							</div>
							{(dataMission.actionName === "4" || dataMission.actionName === "5" || dataMission.actionName === "9") ? (
								<div>
									<div style={{background:"#2b313b", marginTop:"15px", marginBottom:"15px", height:"50px"}}>
										<div style={{padding:"15px"}}>
											<div style={{width:"18px", height:"18px", border:"1px solid #779796", float:"left", marginRight:"15px"}}></div>
											<span>0/5</span>
										</div>
										{/* <div style={{padding:"15px"}}>
											<img style={{background:"#47ac2c", marginRight:"15px"}} src="../check.png"
													alt="just alt"/>
											<span>5/5</span>
										</div> */}
									</div>
									<div>
										<div style={{float:"left", paddingRight:"15px"}}>Phần thưởng: </div>
										<div>
											{(dataMission.award === "Thịt") ? (
											<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
												secondary={(
													<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
														src="../thit.png" /> <span className="valueBonus">{dataMission.valueAward}</span></span>)} />) : (<div></div>)}
											{(dataMission.award === "giftcode") ? (
											<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
												secondary={(
													<span className="global-thit" style={{ color: "#fe8731" }}><span className="valueBonus">Giftcode</span></span>)} />) : (<div></div>)}
											{(dataMission.award === "XO") ? (
											<ListItemText style={{width:"50%", padding:"0 7px"}} disableTypography={true}
												secondary={(
													<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
														src="../XO.png" /> <span className="valueBonus">{dataMission.valueAward}</span></span>)} />) : (<div></div>)}
										</div>
									</div>
										
									<div>
										
									</div>
								</div>):(<div></div>)}
						</div>
					):(<div></div>)}
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleClosePopupMission} style={{ color: "#fe8731" }}>
								Đóng
							</Button>
						</div>
						{(dataMission !==undefined) ? (
						<div>
							{(dataMission.finish && !dataMission.received && dataMission.awardAvailable !=0 && dataMission.missionStatus ==="active") ? (
											<button onClick={() => this.handleReceiveBonus(dataMission.missionId)}
												className="buttonFull"
													>Nhận</button>) : (<div></div>)}
							{(!dataMission.finish && !dataMission.received && dataMission.missionStatus ==="active") ? (
											<button
												className="buttonGhost"
												onClick={() => this.doMission(dataMission.actionName, dataMission.objectId, dataMission.objectValue, dataMission.scoinGameId)}>Thực hiện</button>
										) : (<div></div>)}
							{(dataMission.finish && dataMission.received && dataMission.missionStatus ==="active") ? (
												<button className="received" disabled>Đã nhận</button>
											) : (<div></div>)}
							{(dataMission.finish && !dataMission.received && dataMission.awardAvailable ===0 && dataMission.missionStatus ==="active") ? (
							<button className="received" disabled>Đã hết</button>
							) : (<div></div>)}
							{(dataMission.missionStatus ==="inactive") ? (
											<button className="received" disabled>Hết hạn</button>
										) : (<div></div>)}
						</div>):(<div></div>)}
					</DialogActions>
				</Dialog>
				<Dialog
					fullScreen={false}
					open={this.state.openBonus}
					aria-labelledby="responsive-dialog-title">
					<DialogContent style={{ color: "#fff" }}>
						{this.state.message}
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseBonus} style={{ color: "#fe8731" }}>
								Đóng
							</Button>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}


export default PopupMission
