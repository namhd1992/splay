import React from 'react'
import { CircularProgress } from 'material-ui/Progress'

const Home = props => (
	<div>
		<div className="global-loading"><CircularProgress
			size={50}
		/></div>
	</div>
)

export default Home