import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import LoginRequired from '../../components/LoginRequired'
import '../../styles/imageServerError.css'
import '../../styles/coin.css'



class CoinComponent extends React.Component {
	constructor(){
		super();
		this.state = {
			value:"",
			from:"",
			to:"",
			pakage:null,
			srcImg:null,
			type:""
		};
	}
	componentWillMount(){
		var coin=localStorage.getItem("Coin");
		if(coin===1){
			this.setState({value:"Số XO tương ứng nhận được",from:"Xu", to:"XO",srcImg:"../Xu.png"})
		}else if(coin===2){
			this.setState({value:"Số Xu tương ứng nhận được",from:"XO", to:"Xu",srcImg:"../Xu.png"})
		}else{
			this.setState({value:"Số Xu tương ứng nhận được",from:"XO", to:"Xu",srcImg:"../Xu.png"})
		}
	}

	selectGame=()=>{
		
	}

	selectOptionCoin= (event) =>{
		var coin=event.target.value
		this.setState({pakage:event.target.value, value:coin});
	}

	verifyPhone=()=>{

	}
	verifyNow=()=>{
		
	}
	changeCoin=()=>{
		var coin=localStorage.getItem("Coin");
		if(coin===1){
			this.setState({type:"scoinToGame"})
		}else if(coin===2){
			this.setState({type:"gameToScoin"})
		}else{
			this.setState({type:"gameToScoin"})
		}
		// this.props.changeCoin(type);
	}

	render() {
		const {data, waiting,server,dialogLoginOpen, dataProfile}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0"}} spacing={8} justify="center">
								<Grid item xs={12}>
									<p style={{textAlign:"center", color:"#fff", paddingRight:"40px"}}><span style={{color:"#12cdd4"}}>ĐỔI {this.state.from} </span><img src="../arrow_green.png" style={{ width: "24px", height:"20px", paddingTop:"5px"}}/><span style={{color:"#12cdd4"}}> {this.state.to}</span></p>
								</Grid>
								<Grid item xs={12}>
									<select className="selectGame" onClick={this.selectGame()}>
										<option value="0">TOP GAME</option>
									</select>
								</Grid>
								<Grid item xs={12}>
									<div style={{ overflow: "hidden", height:"100px"}}>
										<div className="infoUser">
											<div className="titleUser">
												<p>Topgame ID:</p>
												<p>Số dư XO:</p>
											</div>
											<div className="contentUser">
												<p>@abc123</p>
												<p>{data.userBalance} XO</p>
											</div>
										</div>
										<div className="imgGame">
											<img src="../lg-topgame.png" style={{ width: "100%"}}/>
										</div>
									</div>
								</Grid>
								<Grid item xs={12}>
									<select className="selectOptionCoin" onChange={(event)=>this.selectOptionCoin(event)}>
										<option value="" selected disabled hidden>Chọn số XO chuyển đổi</option>
										{(data.packageExchangeXUs !== undefined) ? data.packageExchangeXUs.map((obj,key) => {
												return <option key={key}
												value={obj}>{obj}</option>;
											}) : (<div></div>)}
									</select>
								</Grid>
								<Grid item xs={12}>
									<div style={{ overflow: "hidden",width:"100%", borderRadius:"5px", height:"40px", border:"1px solid #808080", color:"#808080", margin:"20px 0px 40px 0px"}}>
										<img src="../Xu.png" style={{ width: "24px", height:"24px",margin: "6px 0px 0px 6px"}}/>
										<p className="valueXu">{this.state.value}</p>
									</div>
									
								</Grid>
								<Grid item xs={12}>
									{(dataProfile.phoneNumber!=="" || dataProfile.phoneNumber!==undefined || dataProfile.phoneNumber!==null)?(<div></div>):(<div><div>
										<button className="verifyPhone" onClick={this.verifyPhone()}>Chưa xác thực số điện thoại</button>
										<button className="verifyNow" onClick={this.verifyNow()}>Xác thực ngay</button>
									</div>
									<p><span style={{color:"red"}}>(*)</span> <span style={{color:"#fff"}}>Bạn cần xác thực để chuyển ra Xu</span></p></div>)}
									
								</Grid>
								<Grid item xs={12}>
									<button className="btnChange" onClick={this.changeCoin()}>ĐỔI</button>
								</Grid>
								{(waiting) ? (<Grid item xs={12} md={8}>
									<div className="global-loadmore">
									{(server !== true) ? (												
									<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
									src="../baotri.png" />)}
									</div>
								</Grid>) : (<div></div>)}
							</Grid>
						</Grid>
						<Hidden smDown>
							<Grid item xs={4}>
								<RightArea></RightArea>
							</Grid>
						</Hidden>
					</Grid>
					<LoginRequired open={dialogLoginOpen}></LoginRequired>
				</div>
		)
	}
}

export default connect()(CoinComponent)
