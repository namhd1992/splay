import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData
} from '../../modules/coin'

import { withRouter } from 'react-router-dom'
import CoinComponent from '../../components/page/TypeChangeCoin'


class TypeChangeCoin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
			// this.props.getData(user.access_token, user.scoinAccessToken)
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	render() {
		return (
			<div>
				<CoinComponent
					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	data: state.coin.data,
	waiting: state.coin.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData
}, dispatch)


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(TypeChangeCoin))