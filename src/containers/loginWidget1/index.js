import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	login,
} from '../../modules/login'
import Grid from 'material-ui/Grid'
// import TextField from 'material-ui/TextField'
// import Button from 'material-ui/Button'
// import { CircularProgress } from 'material-ui/Progress'

class LoginWidget1 extends React.Component {

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

	render() {
		return (
			<div>
				<Grid container justify="center" style={{ width: "100%", margin: "0px" }}>
					<Grid item sm={8} xs={12} >
						<div style={{ color: '#fff' }}>
							Bạn đã đăng nhập thành công
						</div>
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
)(LoginWidget1)