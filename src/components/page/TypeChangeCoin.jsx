import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import LoginRequired from '../../components/LoginRequired'
import '../../styles/imageServerError.css'
import '../../styles/typeChangeCoin.css'



class TypeChangeCoinComponent extends React.Component {

	constructor(){
        super();
        this.state = {
			value:"",
			idTopgame:false,
			data:[],
			idGame:''
        };
	}

	componentWillMount(){
		var scoinGameId=localStorage.getItem("serviceId");
		this.setState({idGame:scoinGameId});
		if(+scoinGameId===330281){
			this.setState({idTopgame:true});
		}
	}
	
	UNSAFE_componentWillReceiveProps(nextProps){
		var scoinGameId=localStorage.getItem("serviceId");
		if(this.props.dataGame !== nextProps.dataGame){
			var game=nextProps.dataGame.filter(v=>v.scoinGameId===+scoinGameId);
			var n=nextProps.dataGame.map(v=>{
				return v.scoinGameId
			}).indexOf(+scoinGameId);
			nextProps.dataGame.splice(n,1);
			nextProps.dataGame.unshift(game[0]);
		}
	}

    selectOptionCoin= (event) =>{
		var scoinGameId=localStorage.getItem("serviceId");
		this.setState({idGame:scoinGameId});
		if(+event.target.value===330281){
			this.setState({idTopgame:true});
		}else{
			this.setState({idTopgame:false});
		}
    }
    nextToCoin=(value)=>{
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("Coin", value);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
	}

	render() {
		const {data, dataGame, waiting,server,dialogLoginOpen}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0"}} spacing={8} justify="center">
                                <p style={{color:"#12cdd4"}}>Chọn hình thức đổi</p>
                                <Grid item xs={12}>
									<select className="listGame" onChange={(event)=>this.selectOptionCoin(event)}>
										{/* <option value="" selected disabled hidden>Chọn Game</option> */}
										{(dataGame !== undefined) ? dataGame.map((obj,key) => {
												return <option key={key}
												value={obj.scoinGameId}>{obj.name}</option>;
											}) : (<div></div>)}
									</select>
									{/* <select className="listGame" onClick={this.findGame()}>
										<option value="0">TOP GAME</option>
									</select> */}
								</Grid>
								{(this.state.idTopgame && this.state.idGame !=='')?(
									<Grid item xs={12} style={{width:"100%"}}>
										<Grid item xs={12} style={{margin:'10px 0px 20px 0px'}}>
											<Link to={"./chitiet"}>
												<button 
													style={{width:"100%", height:"45px",border:"1px solid #12cdd4", background:"#212933"}} 
													onClick={()=>this.nextToCoin(2)}>
														<span style={{color:"#12cdd4"}}>ĐỔI XO </span>
														<img src="../arrow_green.png" style={{ width: "24px", height:"20px", paddingTop:"10px"}}/>
														<span style={{color:"#12cdd4"}}> Xu</span>
														<img style={{float:"right"}} alt="just alt" src="../keyboard_arrow_right.png" />
												</button>
											</Link>
										</Grid>    
										<Grid item xs={12}>
											<Link to={"./chitiet"}>
												<button
													style={{width:"100%", height:"45px",border:"1px solid #12cdd4", background:"#212933"}}
													onClick={()=>this.nextToCoin(1)}>
														<span style={{color:"#12cdd4"}}>ĐỔI Xu </span>
														<img src="../arrow_green.png" style={{ width: "24px", height:"20px", paddingTop:"10px"}}/>
														<span style={{color:"#12cdd4"}}> XO</span>
														<img style={{float:"right"}} alt="just alt" src="../keyboard_arrow_right.png" />
												</button>						
											</Link>
										</Grid>
									</Grid>
								):(<Grid item xs={12}>
									<Link to={"#"}>
										<button style={{width:"100%", height:"45px",border:"1px solid #12cdd4", background:"#212933"}}>
											<span style={{color:"#12cdd4"}}>Nạp game từ ví Xu</span>
										</button>
									</Link>
								</Grid>)}
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

export default connect()(TypeChangeCoinComponent)
