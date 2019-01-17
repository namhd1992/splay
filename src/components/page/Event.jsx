import React from 'react'
import '../../styles/event.css'



class EventComponent extends React.Component {

	constructor(props){
		super(props);
		this.state={
			point:0,
		}
	}

	selectOptionCoin= (event) =>{
        var pakageXu=+event.target.value;
		this.setState({point: pakageXu/1000})
		this.props.selectPackage()
    }

	changePoint=()=>{
		var scoinToken=this.getScoinToken('token');
		this.props.changePoint(scoinToken,this.state.point)
	}
	getScoinToken=(paramName)=>{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('='); //split key and value
			if (pArr[0] == paramName) 
				return pArr[1]; //return value
		}
		return '';
	}

	render() {
		var arr=[20000,50000,100000,200000,500000]
		const {status, statusColor}=this.props;
		return (
			<div>
                <div className="xu_event">
					<div className="divOptionXu">
						<select className="selectOptionXu" onChange={(event)=>this.selectOptionCoin(event)}>
							<option value="" selected disabled hidden>Chọn gói Xu muốn nhận</option>
								{arr.map((obj,key) => {
										return <option key={key}
										value={obj}>{obj.toLocaleString()}</option>;
									})}
                        </select>
					</div>
					<div className="divPrice">
						<span style={{marginRight:"20px"}}>Giá:</span><span>{this.state.point.toLocaleString()} điểm</span> 
					</div>
				</div>
				<button className="btnChangePoint" onClick={this.changePoint}>ĐỔI</button>
				<p className="statusChangePoint" style={{ color:statusColor}}>{status}</p>
            </div>
		)
	}
}

export default EventComponent
