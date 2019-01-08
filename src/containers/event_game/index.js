import React from 'react'
import EventComponent from '../../components/page/Event'


class EventGame extends React.Component {

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

	render() {
		return (
			<div>
				<EventComponent />
			</div>
		)

	}
}

export default EventGame