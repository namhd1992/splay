import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
} from '../../modules/vip'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'


class Vip extends React.Component {

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		this.props.getData();
	}

	render() {
		return (this.props.data.length === 1) ? (
			<div>
				<Grid container className="help-root">
					<Grid item xs={12}>
						<div dangerouslySetInnerHTML={{ __html: this.props.data[0] }}>
						</div>
					</Grid>
				</Grid>
			</div>
		) : (<div className="global-loading"><CircularProgress
		size={50}
	/></div>)
	}
}

const mapStateToProps = state => ({
	data: state.vip.data,
	waiting: state.vip.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Vip)