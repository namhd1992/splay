import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'



class PopupMission extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			openBonus:false
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
	handleReceiveBonus=()=>{
		this.setState({openBonus:true});
		// this.props.handleReceiveBonus();
	}

	render() {
		// const {dataMission}=this.props.dataMission;
		return (
			<div>
				<Dialog
					fullScreen={false}
					open={this.props.openPopupMission}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }}>Chi tiết nhiệm vụ</span></DialogTitle>
					<DialogContent style={{ color: "#fff" }}>
						<div>
							description
						</div>
						<div>

						</div>
							<span>Phần thưởng: </span>
						<div>
							
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleClosePopupMission} style={{ color: "#fe8731" }}>
								Đóng
							</Button>
						</div>
						<div>
							<Button onClick={this.handleReceiveBonus}
								style={{
									borderRadius: "20px",
									background: "linear-gradient(90deg,#22cab5,#3fe28f)",
									color: "#fff",
									padding: "10px",
									fontSize: "0.8em",
									whiteSpace: "nowrap",
									minWidth: "auto",
									minHeight: "auto",
								}}>Nhận
							</Button>
						</div>
					</DialogActions>
				</Dialog>

				<Dialog
					fullScreen={false}
					open={this.state.openBonus}
					aria-labelledby="responsive-dialog-title">
					<DialogContent style={{ color: "#fff" }}>
						Rất tiếc bạn không đủ điều kiện nhận thưởng.
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
