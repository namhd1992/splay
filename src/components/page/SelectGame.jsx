import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { ListItem, ListItemText } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import '../../styles/imageServerError.css'
import '../../styles/selectGame.css'



class SelectGameComponent extends React.Component {

	constructor(){
        super();
        this.state = {
			value:"",
			data:[],
			listSearch:[],
        };
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		if(this.props.dataGame !== nextProps.dataGame){
			this.setState({data:nextProps.dataGame, listSearch:nextProps.dataGame});
		}
	}

	searchAction= () =>{
		var list=this.state.data.filter(v => v.name.toLowerCase().indexOf(this.state.value.toLowerCase())!==-1);
		this.setState({listSearch:list});
	}

	handleChange= name => event => {
		this.setState({value: event.target.value});
	}
	selectGame=(game)=>{
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("serviceId", game.scoinGameId);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
	}

	render() {
		const {dataGame, waiting,server}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0"}} spacing={8} justify="center">
                                <p style={{color:"#12cdd4"}}>Chọn Game cần đổi</p>
                                {/* <Grid item xs={12}>
									<input type="text" placeholder="Tên Game" style={{width:"100%", height:"40px",float:"left", backgroundColor:"#212933",border:"1px solid #e6e6e6", borderRadius:"5px", color:"#e6e6e6"}} onChange={this.handleChange('searchValue')}/>
									<div style={{ marginLeft: "-40px",  marginTop:"5px", float:"left"}} onClick={this.searchAction}><img style={{width:"32px", height:"32px"}} src="../search_blue.png"/></div>
									
								</Grid> */}
                                <Grid item xs={12}>
									{this.state.listSearch.map((obj, key) => (
										<Grid key={key} item xs={12}>
											<Link to={"./doi"} style={{ textDecoration: "none" }} onClick={()=>this.selectGame(obj)}>
												<ListItem style={{ padding: "8px 0px" }}>

													<div style={{
														backgroundImage: "url(" + obj.defaultImage + ")",
														backgroundSize: "contain",
														width: "50px",
														height: "50px",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat",
														position: "relative",
														overflow: "hidden"
													}}>
													</div>
													<ListItemText>
														<span style={{marginLeft: "20px", color:"#12cdd4"}}>{obj.name}</span>
													</ListItemText>
													
													<div>
														<img style={{float:"right"}} alt="just alt" src="../keyboard_arrow_right.png" />
													</div>
												</ListItem>
											</Link>
											<Divider />
										</Grid>
									))}
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
				</div>
		)
	}
}

export default connect()(SelectGameComponent)
