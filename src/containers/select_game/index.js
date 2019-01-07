import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getDataGame
} from '../../modules/coin'

import { withRouter } from 'react-router-dom'
import SelectGameComponent from '../../components/page/SelectGame'


class SelectGame extends React.Component {

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
		this.props.getDataGame(50, 0, '', '', '');
	}

	render() {
		return (
			<div>
				<SelectGameComponent
					dataGame={this.props.dataGame}
					server={this.props.server}
					waiting={this.props.waiting}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	dataGame: state.coin.dataGame,
	waiting: state.coin.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataGame
}, dispatch)


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectGame))