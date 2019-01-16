import React from 'react'
import '../../styles/event.css'



class EventComponent extends React.Component {

	constructor(props){
		super(props);
		this.state={
			status:'',
			statusColor:'#12cdd4',
			point:'0'
		}
	}

	selectOptionCoin= (event) =>{
        var pakageXu=+event.target.value;
        this.setState({point: pakageXu/1000, status:''})
    }

	changeCoin=()=>{
		this.setState({status:'Đổi thành công, Xu được cộng vào tài khoản'})
	}

	render() {
		var arr=[20000,50000,100000,200000,500000]
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
				<button className="btnChangePoint" onClick={this.changeCoin}>ĐỔI</button>
				<p className="statusChangePoint" style={{ color:this.state.statusColor}}>{this.state.status}</p>
            </div>
		)
	}
}

export default EventComponent
