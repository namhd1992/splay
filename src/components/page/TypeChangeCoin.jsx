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

	findGame=()=>{
		
    }
    nextToCoin=(value)=>{
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("Coin", value);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
	}

	render() {
		const {data, waiting,server,dialogLoginOpen}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0"}} spacing={8} justify="center">
                                <p style={{color:"#12cdd4"}}>Chọn hình thức đổi</p>
                                <Grid item xs={12}>
									<select className="listGame" onClick={this.findGame()}>
										<option value="0">TOP GAME</option>
									</select>
								</Grid>
                                <Grid item xs={12}>
                                    <Link to={"./coin"}>
                                        <button style={{width:"100%", height:"45px",border:"1px solid #12cdd4", background:"#212933"}} onClick={()=>this.nextToCoin(2)}><span style={{color:"#12cdd4"}}>ĐỔI XO </span><img src="../arrow_green.png" style={{ width: "24px", height:"20px", paddingTop:"10px"}}/><span style={{color:"#12cdd4"}}> Xu</span><img style={{float:"right"}} alt="just alt"
									src="../keyboard_arrow_right.png" /></button>
                                    </Link>
                                </Grid>    
                                <Grid item xs={12}>
                                    <Link to={"./coin"}>
                                        <button style={{width:"100%", height:"45px",border:"1px solid #12cdd4", background:"#212933"}} onClick={()=>this.nextToCoin(1)}><span style={{color:"#12cdd4"}}>ĐỔI Xu </span><img src="../arrow_green.png" style={{ width: "24px", height:"20px", paddingTop:"10px"}}/><span style={{color:"#12cdd4"}}> XO</span><img style={{float:"right"}} alt="just alt"
									src="../keyboard_arrow_right.png" /></button>						
                                    </Link>
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

export default connect()(TypeChangeCoinComponent)
