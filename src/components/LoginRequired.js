import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

class LoginRequired extends React.Component {

	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	handleCloseDialogLogin = () => {
		// this.setState({ dialogLoginOpen: false });
	};

	render() {
		return (
			<Dialog
				fullScreen={false}
				open={this.props.open}
				onClose={this.handleCloseDialogLogin}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }}>Đăng nhập</span></DialogTitle>
				<DialogContent style={{ color: "#fff" }}>
					Tính năng yêu cầu đăng nhập
        </DialogContent>
				<DialogActions>
					<div>
						<Link to="../">
							<Button onClick={this.handleCloseDialogLogin} style={{ color: "#fe8731" }}>
								Đóng
                </Button>
						</Link>
					</div>
					<div>
						<Button onClick={this.loginAction}
							style={{
								borderRadius: "20px",
								background: "linear-gradient(90deg,#22cab5,#3fe28f)",
								color: "#fff",
								padding: "10px",
								fontSize: "0.8em",
								whiteSpace: "nowrap",
								minWidth: "auto",
								minHeight: "auto",
							}}
						>
							Đăng nhập
              </Button>
					</div>
				</DialogActions>
			</Dialog>
		);
	}
}


export default LoginRequired
