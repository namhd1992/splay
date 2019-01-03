import React from 'react';
import { Route } from 'react-router-dom'
import Notification from '../../components/Notification'
import Home from '../home'
import About from '../about'
import Login from '../login'
import Game from '../game'
import Auction from '../auction'
import Giftcode from '../giftcode'
import Lucky from '../lucky';
import Game_detail from '../game_detail';
import Auction_detail from '../auction_detail';
import Lucky_detail from '../lucky_detail';
import Help from '../help';
import Dieukhoan from '../dieukhoan';
import Vip from '../vip';
import LoginWidget from '../loginWidget';
import LoginWidget1 from '../loginWidget1';
import History from '../shop_history';
import Mission from '../mission';
import Profile from '../profile';
import Article from '../article';
import Article_detail from '../article_detail';
import Item_giftcode_detail from '../item_giftcode_detail';
import Checkin from '../checkin';
import Inbox from '../inbox';
import Giftcode_detail from '../giftcode_detail';
import Giftcode_plugin from '../giftcode_plugin';
import Giftcode_plugin_login from '../giftcode_plugin_login';
import MenuAppBar from '../../components/MenuAppBar';
import Footer from '../../components/Footer';
import '../../styles/main.css';
import ScrollToTop from 'react-scroll-up';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import Avatar from 'material-ui/Avatar';
import Phone_card from '../phone_card';
import Coin from '../coin';
import TypeChangeCoin from '../type_change_coin';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			main: null,
			compact: false,
			scrolling: false,
			fullscreen: false,
			title: "",
			isMobile: false,
			scrollPos: 0,
			message:"Đã có lỗi từ hệ thống.",
			snackVariant: "info",
			server:null
		};
	}

	componentDidMount() {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0, 4))) {
			this.setState({ isMobile: true });
		}
		window.addEventListener('scroll', this.handleScroll);
		if (document.location.pathname === "/giftcodepluginlogin" || document.location.pathname === "/giftcodeplugin") {
			this.setState({ fullscreen: true });
		} else {
			this.setState({ fullscreen: false });
		}
	}

	componentWillUnmount() {
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {

		let supportPageOffset = window.pageXOffset !== undefined;
		let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
		let scroll = {
			x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
		};
		if (document.body.offsetWidth < 768) {
			this.setState({ compact: true });
		} else {
			this.setState({ compact: false });
		}

		if (document.body.getBoundingClientRect().top > this.state.scrollPos){
			// console.log("UP")
			this.setState({ scrolling: false });
		}else{
			// console.log('DOWN');
			this.setState({ scrolling: true });
		}
			
		this.setState({scrollPos: document.body.getBoundingClientRect().top});
		// if (scroll.y > 0) {
		// 	this.setState({ scrolling: true });
		// } else {
		// 	this.setState({ scrolling: false });
		// }
	}
	render() {
		return (
			<div style={{ backgroundColor: "#212933" }}>
				<div style={{ maxWidth: "1280px", margin: "auto", background: "#212933" }}>
					{(!this.state.fullscreen) ? (<MenuAppBar isMobile={this.state.isMobile} pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar>) : (<div></div>)}
					<main ref={(c) => this.main = c} style={(document.location.pathname === "/") ? { padding: "60px 8px 8px 8px" } : { padding: "60px 8px 8px 8px" }}>
						<Route exact path="/" component={Home} />
						<Route exact path="/about-us" component={About} />
						<Route exact path="/loginwidget" component={LoginWidget} />
						<Route exact path="/loginwidget1" component={LoginWidget1} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/history" component={History} />
						<Route exact path="/game" component={Game} />
						<Route exact path="/gamedetail/:id" component={Game_detail} />
						<Route exact path="/auction" component={Auction} />
						<Route exact path="/auctiondetail/:id" component={Auction_detail} />
						<Route exact path="/itemgiftcodedetail/:id" component={Item_giftcode_detail} />
						<Route exact path="/giftcode" component={Giftcode} />
						<Route exact path="/giftcodedetail/:id" component={Giftcode_detail} />
						<Route exact path="/lucky" component={Lucky} />
						<Route exact path="/help" component={Help} />
						<Route exact path="/dieu-khoan" component={Dieukhoan} />
						<Route exact path="/vip" component={Vip} />
						<Route exact path="/mission" component={Mission} />
						<Route exact path="/inbox" component={Inbox} />
						<Route exact path="/profile" component={Profile} />    
						<Route exact path="/article" component={Article} />
						<Route exact path="/article_detail/:id" component={Article_detail} />
						<Route exact path="/checkin" component={Checkin} />
						<Route exact path="/luckydetail/:id" component={Lucky_detail} />
						<Route exact path="/giftcodeplugin" component={Giftcode_plugin} />
						<Route exact path="/giftcodepluginlogin" component={Giftcode_plugin_login} />
						<Route exact path="/phonecard" component={Phone_card} />
						<Route exact path="/chitiet" component={Coin} />
						<Route exact path="/doi" component={TypeChangeCoin} />
					</main>
					{(!this.state.fullscreen) ? (<Footer></Footer>) : (<div></div>)}
					<ScrollToTop style={{ bottom: 90, right: "10px" }} showUnder={160}>
						<Avatar style={{ opacity: "0.6", background: "#23c9b6", border: "1px solid #23c9b6", width: "32px", height: "32px" }}><KeyboardArrowUp
							style={{ color: "#fff" }}></KeyboardArrowUp></Avatar>
					</ScrollToTop>
				</div>
			</div>
		)
	}
}


export default App;