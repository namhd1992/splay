import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getData,
	takeGiftcode
} from '../../modules/giftcodePlugin'
import Grid from 'material-ui/Grid'
import { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Ultilities from '../../Ultilities/global'
import Bookmark from 'react-bookmark'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'

class Giftcode_plugin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			saveUrlStatus: false,
			dialogTitle: "",
			dialogContent: ""
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var id = Ultilities.parse_query_string("id", window.location.href);
		var user = JSON.parse(localStorage.getItem("user"));
		if(user === null){
			window.location.replace(`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/giftcodepluginlogin?id=${id}&agencyid=0`)
		}
		this.props.getData(id);
	}

	onTakeGiftcode = (id, action_text) => {
		var _this = this;
		var token = Ultilities.parse_query_string("scointoken", window.location.href);
		if (action_text === "Lưu") {
			if (this.state.saveUrlStatus) {
				this.props.takeGiftcode(id, token).then(function () {
					_this.setState({ dialogLoginOpen: true, dialogTitle: "Nhận giftcode", dialogContent: _this.props.dataTake.data.onlyMessage });
				});
			} else {
				this.setState({ dialogLoginOpen: true, dialogTitle: "Nhận giftcode", dialogContent: "Lưu địa chỉ trang vào trình duyệt của bạn để nhận" });
			}
		} else {
			this.props.takeGiftcode(id, token).then(function () {
				_this.setState({ dialogLoginOpen: true, dialogTitle: "Nhận giftcode", dialogContent: _this.props.dataTake.data.onlyMessage });
			});;
		}
	}

	showBookmark = (link) => {
		this.setState({ dialogLoginOpen: true, dialogTitle: "Bookmark", dialogContent: (<Bookmark className="coolClass" href={link} title="Splay" />) });
		setTimeout(() => {
			this.setState({ saveUrlStatus: true });
		}, 5000);
	}

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	}

	render() {
		return (
			<div style={{ marginTop: "-55px", "backgroundColor": "rgba(0,0,0,0.8)" }}>
				<div style={{ color: "#ec971f", fontSize: "1.3rem", textAlign: "center" }}>HOÀN THÀNH NHIỆM VỤ ĐỂ NHẬN GIFTCODE</div>
				<Grid container className="giftcode-root" style={{ padding: "0px 5px" }}>
					{this.props.data.map((obj, key) => {
						var action_text = "";
						var action_url = "";
						if (obj.giftcodeEvent.giftcodeCondition[0].name === "Login Game") {
							action_text = "Đăng nhập";
							action_url = obj.giftcodeEvent.scoinGameObject.website;
						} else if (obj.giftcodeEvent.giftcodeCondition[0].name === "Update profile") {
							action_text = "Cập nhật";
							action_url = "https://www.splay.vn";
						} else if (obj.giftcodeEvent.giftcodeCondition[0].name === "Save game") {
							action_text = "Lưu"
							action_url = "https://www.splay.vn";
						}
						return (
							<Grid key={key} item xs={12} md={6} style={{ borderBottom: "#ec971f solid 1px" }}>
								<ListItem style={{ padding: "0px" }}>
									<div className="giftcode-item-image"><img src={obj.defaultImage} alt="just alt" /></div>
									<ListItemText primary={(<span style={{ color: "#ec971f", fontSize: "1.2rem", fontWeight: "bold	" }}>{obj.title}</span>)} secondary={(<span style={{ color: "white" }}>{obj.content}</span>)} />
								</ListItem>
								<ListItem style={{ padding: "2px" }}>
									<div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
										{(action_text === "Lưu") ? (
											<Button onClick={() => this.showBookmark(action_url)} style={{ backgroundColor: "#ec971f", border: "none", borderRadius: "10px", color: "white" }}>{action_text}</Button>
										) : (<a href={action_url} target="_blank" >
											<Button style={{ backgroundColor: "#ec971f", border: "none", borderRadius: "10px", color: "white" }}>{action_text}</Button>
										</a>)}
										<Button onClick={() => this.onTakeGiftcode(obj.giftcodeEvent.id, action_text)} style={{ backgroundColor: "#dcdcdc", border: "none", borderRadius: "10px", color: "#4a4a4a" }}>Nhận Giftcode</Button>
									</div>
								</ListItem>
							</Grid>
						)
					})}
					{(this.props.waiting) ? (<div className="global-loading"><CircularProgress
						size={50}
					/></div>) : (<div></div>)}
				</Grid>
				<Dialog
					fullScreen={false}
					open={this.state.dialogLoginOpen}
					onClose={this.handleCloseDialogLogin}
					aria-labelledby="responsive-dialog-title"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
					<DialogContent style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white", padding: "20px" }}>
						{this.state.dialogContent}
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseDialogLogin} style={{color:"primary", borderRadius:"20px"}}>
								Đóng
            	</Button>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.giftcode.data,
	dataTake: state.giftcode.dataTake,
	waiting: state.giftcode.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	takeGiftcode
}, dispatch)

Giftcode_plugin.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(Giftcode_plugin))