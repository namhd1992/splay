import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'

class Home extends React.Component{
	render() {
		return(
			<div>
				<div className="global-loading">
				{(this.props.server !== true) ? (												
					<CircularProgress style={{ color: "#fff" }} size={50} />):(<img alt="just alt"
					src="../baotri.png" />)}
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	server:state.server.serverError
})
export default connect(
	mapStateToProps
)(Home)