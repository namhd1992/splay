import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'

class LoginWidget extends React.Component {

	loginAction = () => {
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
				<DialogContent>
					login
        </DialogContent>
			</Dialog>
		);
	}
}

export default LoginWidget