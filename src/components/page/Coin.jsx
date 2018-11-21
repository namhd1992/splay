import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import LoginRequired from '../../components/LoginRequired'
import Notification from '../../components/Notification'
import '../../styles/imageServerError.css'
import '../../styles/coin.css'



class CoinComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            value:"",
            from:"",
            to:"",
            packageXO:null,
            packageXU:null,
            srcImg:null,
            type:"",
			price:null,
			message: "",
			openSnack: false,
			snackVariant: "info",
        };
    }
    componentWillMount(){
        var coin=localStorage.getItem("Coin");
        if(+coin===1){
            this.setState({value:"Chọn gói XO muốn nhận",from:"Xu", to:"XO",srcImg:"../Xu.png"})
        }else if(+coin===2){
            this.setState({value:"Chọn gói Xu muốn nhận",from:"XO", to:"Xu",srcImg:"../XO.png"})
        }else{
            this.setState({value:"Chọn gói Xu muốn nhận",from:"XO", to:"Xu",srcImg:"../XO.png"})
        }
    }

    selectGame=()=>{
        
    }

    selectOptionCoin= (event) =>{
		var coin=localStorage.getItem("Coin");
		var pakageCoin=event.target.value;
        var ratioExchange=this.props.data.ratioExchange;
        if(+coin===1){
            this.setState({pakage:pakageCoin, value:pakageCoin, price:(pakageCoin/ratioExchange), type:"scoinToGame",packageXO:pakageCoin, packageXU:(pakageCoin/ratioExchange)});
        }else if(+coin===2){
            this.setState({pakage:pakageCoin, value:pakageCoin, price:ratioExchange*pakageCoin, type:"gameToScoin",packageXU:pakageCoin, packageXO:pakageCoin*ratioExchange});
        }else{
			this.setState({pakage:pakageCoin, value:pakageCoin, price:ratioExchange*pakageCoin, type:"gameToScoin",packageXU:pakageCoin, packageXO:pakageCoin*ratioExchange});
        }
    }

    verifyPhone=()=>{

    }
    verifyNow=()=>{
        
    }
    changeCoin=()=>{
		if(this.state.price!==null){
			this.props.changeCoin(this.state.packageXO, this.state.packageXU, this.state.type);
		}else{
			this.setState({ openSnack: true, message: "Bạn chưa chọn gói", snackVariant: "success" });
		}
        
	}
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	closeSnack=()=>{
		this.setState({ openSnack: false });
	}

    render() {
        const {data, waiting,server,dialogLoginOpen, dataProfile,message, snackVariant, openSnack}=this.props;
        var pakageCoin;
        if(data!==null && data.packageExchangeXUs !== undefined && data.packageExchangeXUs!==null){
            if(this.state.from==="Xu"){
                pakageCoin=data.packageExchangeXUs.map(v=>{
                    return v*data.ratioExchange
                });
            }else if(this.state.from==="XO"){
                pakageCoin=data.packageExchangeXUs;
            }else{

            }
        }
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
									{(data!==null)?(<div className="infoUserCoin">
											<div className="titleUser">
												<p>Topgame ID:</p>
												<p>Số dư XO:</p>
											</div>
											<div className="contentUser">
												<p>@abc123</p>
												<p><img src="../XO.png" style={{ width: "24px", height:"24px",margin:"0px 5px -4px 0px"}}/>{this.props.data.userBalance ? this.props.data.userBalance.toLocaleString(): "0"} XO</p>
											</div>
										</div>):(<div></div>)}
                                </Grid>
                                <Grid item xs={12}>
									<div style={{height:"40px"}}>
										<div className="divOptionCoin">
											<select className="selectOptionCoin" onChange={(event)=>this.selectOptionCoin(event)}>
												<option value="" selected disabled hidden>{this.state.value}</option>
												{(pakageCoin !== undefined) ? pakageCoin.map((obj,key) => {
														return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													}) : (<div></div>)}
											</select>
										</div>
										<div className="divPrice">
											<span>Giá:</span> <div style={{display:"inline"}}><img src={this.state.srcImg} style={{ width: "24px", height:"24px", margin:"0px 5px -5px 8px"}}/></div> <span>{this.state.price ? this.state.price.toLocaleString(): ""} {this.state.from}</span>
										</div>
									</div>
                                    
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <div style={{ overflow: "hidden",width:"100%", borderRadius:"5px", height:"40px", border:"1px solid #808080", color:"#808080", margin:"20px 0px 40px 0px"}}>
                                        <img src="../Xu.png" style={{ width: "24px", height:"24px",margin: "6px 0px 0px 6px"}}/>
                                        <p className="valueXu">{this.state.price}</p>
                                    </div>
                                    
                                </Grid> */}
                                <Grid item xs={12}>
                                    {(dataProfile.phoneNumber!=="" || dataProfile.phoneNumber!==undefined || dataProfile.phoneNumber!==null)?(<div></div>):(<div><div>
                                        <button className="verifyPhone" onClick={this.verifyPhone()}>Chưa xác thực số điện thoại</button>
                                        <button className="verifyNow" onClick={this.verifyNow()}>Xác thực ngay</button>
                                    </div>
                                    <p><span style={{color:"red"}}>(*)</span> <span style={{color:"#fff"}}>Bạn cần xác thực để chuyển ra Xu</span></p></div>)}
                                    
                                </Grid>
                                <Grid item xs={12} style={{marginTop:"20px"}}>
                                    <button className="btnChange" onClick={this.changeCoin}>ĐỔI</button>
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
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
					<Notification message={this.state.message} variant={this.state.snackVariant} openSnack={this.state.openSnack} closeSnackHandle={this.closeSnack} ></Notification>
                    <LoginRequired open={dialogLoginOpen}></LoginRequired>
                </div>
        )
    }
}

export default connect()(CoinComponent)
