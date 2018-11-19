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
			value:"Số Xu tương ứng nhận được",
		};
	}

	findGame=()=>{
		
    }
    next=()=>{
		
	}

	render() {
		const {data, waiting,server,dialogLoginOpen}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0"}} spacing={8} justify="center">
                                <p>Chọn Game cần đổi</p>
                                <input placeholder="Tên Game"></input>
                                {data.map((obj, key) => {
                                    <div key={key}>
                                        <img src="../arrow_green.png" style={{ width: "24px", height:"24px"}}/>
                                    </div>
                                })}				
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
