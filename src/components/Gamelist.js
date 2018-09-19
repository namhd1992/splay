import React from 'react'
import PropTypes from 'prop-types'
import '../styles/gamelist.css'

class Gamelist extends React.Component {

	static propTypes = {
		data: PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {
			canClick: true
		}
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className='game-root'>
				{this.props.data.map((item, key) => {
					return (<div key={key} className="game-item"><a href={item.urlView} ><div className="game-item-inside" style={{ backgroundImage: "url(" + item.urlImage + ")" }}>abc</div></a></div>)
				})}
			</div>
		);
	}
}


export default Gamelist
