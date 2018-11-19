import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	login,
} from '../../modules/login'
import Grid from 'material-ui/Grid'
// import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
// import { CircularProgress } from 'material-ui/Progress'

class LoginWidget extends React.Component {

	state = {
		username: "",
		password: "",
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
	}

	handleChange = field => event => {
		this.setState({
			[field]: event.target.value,
		});
	}

	loginAction = () => {
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/loginwidget?fbmessid=1234`);
	}

	render() {
		return (
			<div>
				<Grid container justify="center" style={{ width: "100%", margin: "0px" }}>
					<Grid item sm={8} xs={12}>
						<Button style={{
							borderRadius: "20px",
							background: "linear-gradient(90deg,#22cab5,#3fe28f)",
							color: "#fff",
							padding: "10px",
							fontSize: "0.8em",
							whiteSpace: "nowrap",
							minWidth: "auto",
							minHeight: "auto",
							margin: "20px 0px"
						}} onClick={this.loginAction}>Đăng ký nhận code</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.login.data,
	waiting: state.login.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	login,
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginWidget)