import React from 'react'
import { CircularProgress } from 'material-ui/Progress'
import Ultilities from '../../Ultilities/global'
import axios from 'axios'

class Giftcode_plugin_login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var code = Ultilities.parse_query_string("code", window.location.href);
		var id = Ultilities.parse_query_string("id", window.location.href);
		if (code) {
			var url = Ultilities.base_url() + "/anonymous/loginScoin";
			var redirect = `http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/giftcodepluginlogin?id=${id}`;
			var params = {
				"code": code,
				"redirect_uri": redirect
			};
			axios.post(url, params).then(function (response) {
				console.log(response.data.data);
				window.location.replace(`${window.location.protocol}//${window.location.host}/giftcodeplugin?id=${id}&scointoken=${response.data.data.scoinAccessToken}`)
			}).catch(function (error) {
				console.log(error);
			})
		}
	}
	render() {
		return (
			<div>
				<div className="global-loading"><CircularProgress
					size={50}
				/></div>
			</div>
		)
	}
}

export default Giftcode_plugin_login