import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/head_menu.css'
import Grid from 'material-ui/Grid'
import ReactResizeDetector from 'react-resize-detector'
import { withRouter } from 'react-router-dom'

class HeadMenu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"fontSize": "1",
			"iconWidth": "48",
			"compact": true
		};
	}

	onResize = () => {
		if (window.innerWidth <= 480) {
			this.setState({ fontSize: "0.6", iconWidth: 32, "compact": true });
		}
		if (window.innerWidth > 480) {
			this.setState({ fontSize: "1", iconWidth: 48, "compact": true });
		}
		if (window.innerWidth > 768 && window.location.pathname === "/") {
			this.setState({ fontSize: "1", iconWidth: 48, "compact": false });
		}
	}

	render() {
		return (
			<div className={(!this.state.compact) ? 'head-menu-root' : 'head-menu-root compact'}>
				<Grid container spacing={0} style={{ maxWidth: "640px", margin: "auto" }} justify="center">
					<Grid item xs={3} sm={2} className={(window.location.pathname === "/") ? "head-menu-active" : ""}>
						<Link style={{ fontSize: this.state.fontSize + "em" }}
							className={"link"} to='/'>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<img alt="home icon" className="head-menu-icon"
										style={{ width: (window.location.pathname === "/") ? this.state.iconWidth + 10 : this.state.iconWidth + "px", height: (window.location.pathname === "/") ? this.state.iconWidth + 10 : this.state.iconWidth + "px" }} src="../home_new.png" />
								</Grid>
								{(window.location.pathname === "/") ? (<span></span>) : (<Grid item xs={12}><div className="head-menu-text">HOME</div></Grid>)}
							</Grid>
						</Link>
					</Grid>
					<Grid item xs={3} sm={2} className={(window.location.pathname === "/game") ? "head-menu-active" : ""}>
						<Link style={{ fontSize: this.state.fontSize + "em" }}
							className={"link"} to='/game'>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<img alt="home game icon" className="head-menu-icon"
										style={{ width: (window.location.pathname === "/game") ? this.state.iconWidth + 10 : this.state.iconWidth + "px", height: (window.location.pathname === "/game") ? this.state.iconWidth + 10 : this.state.iconWidth + "px" }} src="../game_new.png" />
								</Grid>
								{(window.location.pathname === "/game") ? (<span></span>) : (<Grid item xs={12}><div className="head-menu-text">GAME</div></Grid>)}
							</Grid>
						</Link>
					</Grid>
					<Grid item xs={3} sm={2} className={(window.location.pathname === "/auction") ? "head-menu-active" : ""}>
						<Link style={{ fontSize: this.state.fontSize + "em" }}
							className={"link"} to='/auction'>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<img alt="home auction icon" className="head-menu-icon"
										style={{ width: (window.location.pathname === "/auction") ? this.state.iconWidth + 10 : this.state.iconWidth + "px", height: (window.location.pathname === "/auction") ? this.state.iconWidth + 10 : this.state.iconWidth + "px" }} src="../shop_new.png" />
								</Grid>
								{(window.location.pathname === "/auction") ? (<span></span>) : (<Grid item xs={12}><div className="head-menu-text">SHOP</div></Grid>)}
							</Grid>
						</Link>
					</Grid>
					<Grid item xs={3} sm={2} className={(window.location.pathname === "/giftcode") ? "head-menu-active" : ""}>
						<Link style={{ fontSize: this.state.fontSize + "em" }}
							className={"link"} to='/giftcode'>
							<Grid container spacing={0}>
								<Grid item xs={12}>
									<img alt="home giftcode icon" className="head-menu-icon"
										style={{ width: (window.location.pathname === "/giftcode") ? this.state.iconWidth + 10 : this.state.iconWidth + "px", height: (window.location.pathname === "/giftcode") ? this.state.iconWidth + 10 : this.state.iconWidth + "px" }}
										src="../gift_new.png" />
								</Grid>
								{(window.location.pathname === "/giftcode") ? (<span></span>) : (<Grid item xs={12}><div className="head-menu-text">GIFTCODE</div></Grid>)}
							</Grid>
						</Link>
						{/*<Link style={{fontSize: this.state.fontSize + "em"}}*/}
						{/*className={(window.location.pathname === "/lucky") ? "link head-menu-active" : "link"} to='/lucky'>*/}
						{/*<Grid container spacing={0}>*/}
						{/*<Grid item xs={12}>*/}
						{/*<img alt="home lucky icon" className="head-menu-icon"*/}
						{/*style={{width: this.state.iconWidth + "px", height: this.state.iconWidth + "px"}} src="../lucky_icon.png"/>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={12}>*/}
						{/*<div className="head-menu-text">MAY MẮN</div>*/}
						{/*</Grid>*/}
						{/*</Grid>*/}
						{/*</Link>*/}
					</Grid>
				</Grid>
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
			</div>
		);
	}
}

export default withRouter(HeadMenu);