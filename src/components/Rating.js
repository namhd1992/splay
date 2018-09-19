import React from 'react'
import Star from 'material-ui-icons/Star'
import StarBorder from 'material-ui-icons/StarBorder'
import StarHalf from 'material-ui-icons/StarHalf'

class Rating extends React.Component {

	render() {
		var component = [1, 2, 3, 4, 5];
		return (
			<span style={{lineHeight:"1em"}}>
				{component.map((obj, key) => {
					if(this.props.point <= obj-1){
						return (<StarBorder key={key} style={{width:"16px", height:"16px",marginTop:"2px"}}></StarBorder>)
					}else if(this.props.point < obj){
						return (<StarHalf key={key} style={{width:"16px", height:"16px"}}></StarHalf>)
					}else{
						return (<Star key={key} style={{width:"16px", height:"16px"}}></Star>)
					}
				})}
			</span>
		);
	}
}


export default Rating
