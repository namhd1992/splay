import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
} from '../../modules/help'
import Grid from 'material-ui/Grid'
import RightArea from '../../components/RightArea'
import { CircularProgress } from 'material-ui/Progress'
import Hidden from 'material-ui/Hidden'

class Help extends React.Component {

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
					<Grid item xs={12} md={8}>
						<Grid container className="help-root">
							<Grid item xs={12} style={{ color: "#fff", padding: "8px" }}>
								<div style={{padding:"8px"}} dangerouslySetInnerHTML={{ __html: this.props.data[0] }}>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		) : (<div className="global-loading"><CircularProgress
			size={50}
		/></div>)
	}
}

const mapStateToProps = state => ({
	data: state.help.data,
	waiting: state.help.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Help)