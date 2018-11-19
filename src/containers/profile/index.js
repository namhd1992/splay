import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData, updateProfile
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import axios from 'axios'
import ProfileComponent from '../../components/page/Profile'

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogUpdateOpen: false,
			phone: "",
			email: "",
			fullname: "",
			avatar: "",
			openSnack: false,
			message: "",
			snackVariant: "info",
			dialogLoginOpen: false,
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
				_this.props.changeTitle("Hồ sơ cá nhân");
				_this.setState({
					phone: _this.props.data.phoneNumber,
					fullname: _this.props.data.fullName,
					email: _this.props.data.email,
				});
			});
			_this.props.changeTitle("Hồ sơ cá nhân");
			_this.setState({
				phone: _this.props.data.phoneNumber,
				fullname: _this.props.data.fullName,
				email: _this.props.data.email,
			});
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	responseFacebook = (response) => {
		var url = "https://graph.facebook.com/v2.12/171101406584460_624717134556216/sharedposts?fields=privacy&access_token=" + response.accessToken;
		axios.get(url).then(function (res) {
			console.log(res.data);
		}).catch(function (error) {
			console.log(error);
		});
	}

	handleChange = (name,event) => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleUpdateProfile = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var data = { "phoneNumber": this.state.phone, "email": this.state.email, "fullname": this.state.fullname };
		if (this.state.avatar !== "") {
			data.avatar = this.state.avatar
		}
		this.props.updateProfile(user.access_token, data).then(function () {
			_this.setState({
				openSnack: true,
				message: _this.props.dataUpdateProfile.data.onlyMessage,
				snackVariant: "success"
			});
		}).then(function () {
			_this.props.getData(user.access_token, user.scoinAccessToken).then(function () {
				_this.setState({
					phone: _this.props.data.phoneNumber,
					fullname: _this.props.data.fullName,
					email: _this.props.data.email,
					dialogUpdateOpen: false
				});
				localStorage.setItem("user_info", JSON.stringify(_this.props.data));
			});
		});
	}

	handleCloseDialogUpdate = () => {
		this.setState({ dialogUpdateOpen: false });
	}

	showUpdate = () => {
		window.open("https://scoin.vn/thong-tin-ca-nhan", '_blank');
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	handleOpenDialog = () => {
		this.setState({ dialogOpen: true });
	};

	handleChangeFile = (FileList) => {
		this.setState({ avatar: FileList[0] });
	}
	

	render() {
		
		return (
			<div>
				<ProfileComponent
					handleChangeFile={this.handleChangeFile}
					handleOpenDialog={this.handleOpenDialog}
					handleCloseSnack={this.handleCloseSnack}
					showUpdate={this.showUpdate}
					handleCloseDialogUpdate={this.handleCloseDialogUpdate}
					handleUpdateProfile={this.handleUpdateProfile}
					handleChange={this.handleChange}
					responseFacebook={this.responseFacebook}

					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					dataUpdateProfile={this.props.dataUpdateProfile}
					dialogUpdateOpen={this.state.dialogUpdateOpen}
					email={this.state.email}
					openSnack={this.state.openSnack}
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					dialogLoginOpen={this.state.dialogLoginOpen}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.profile.data,
	waiting: state.profile.waiting,
	dataUpdateProfile: state.profile.dataUpdate,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	updateProfile,
	changeTitle
}, dispatch)



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)