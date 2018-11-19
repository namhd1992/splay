import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
} from '../../modules/help'
import Grid from 'material-ui/Grid'
import RightArea from '../../components/RightArea'
import { CircularProgress } from 'material-ui/Progress'
import Hidden from 'material-ui/Hidden'

class Dieukhoan extends React.Component {

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		this.props.getData();
	}

	render() {
		return (this.props.data.length === 1) ? (
			<div>
				<Grid container className="help-root">
					<Grid item xs={12} md={8}>
						<Grid container className="help-root">
							<Grid item xs={12} style={{ color: "#fff", padding: "8px" }}>
								{/* <div style={{padding:"8px"}} dangerouslySetInnerHTML={{ __html: this.props.data[0] }}>
								</div> */}
								<div style={{ padding: "8px" }} >
									<h3>ĐIỀU KHOẢN SỬ DỤNG</h3>
									<h4>1. Các thuật ngữ trong thỏa thuận</h4>
									<ul>
										<li>Splay là dịch vụ cổng game do Công ty Cổ phần VTC dịch vụ di động (VTC Mobile) làm chủ quản.</li>
										<li>“Game” là trò chơi điện tử, “Game online” là trò chơi điện tử trực tuyến.</li>
										<li>“Thịt” là đơn vị đồng điểm được tặng thưởng vào tài khoản của khách hàng trên hệ thống Splay.</li>
										<li>“Thịt” có thể được sử dụng để tham gia một số hoạt động hoặc sự kiện trên hệ thống Splay.</li>
										<li>“Thịt” không thể quy đổi trực tiếp thành tiền mặt.</li>
										<li>Người sử dụng dịch vụ gọi tắt là "Người chơi" hoặc "Khách hàng".	</li>
										<li>Người sử dụng: là chủ tài khoản, sở hữu hợp pháp tài khoản Splay.</li>
										<li>“Người sử dụng dịch vụ” là một cá nhân hoặc tổ chức sử dụng Hệ thống để thực hiện nhiệm vụ.</li>
										<li>Thông tin cá nhân:  là thông tin gắn liền với việc xác định danh tính, nhân thân của cá nhân bao gồm tên, tuổi, địa chỉ, số chứng minh nhân dân, số điện thoại, địa chỉ thư điện tử, tài khoản ngân hàng của Người Sử Dụng và một số thông tin khác theo quy định của pháp luật.</li>
									</ul>
									<h4>2. Các nội dung dịch vụ</h4>
									<ul>
										<li>Splay tập hợp nhiều ứng dụng game với các thể loại khác nhau. Khách hàng có thể sử dụng và trải nghiệm. Tùy vào từng thể loại và phát triển trò chơi trên ứng dụng khác nhau, khách hàng có thể sử dụng trên wesite hoặc trên các thiết bị di động.</li>
										<li>Splay cung cấp thông tin về các game mới nhất được phát hành bởi VTC Mobile.</li>
										<li>Splay phát triển hệ thống nhiệm vụ cho phép khách hàng trải nghiệm các chức năng trên Splay.</li>
										<li>Splay cung cấp các hoạt động & sự kiện để khách hàng tham gia quy đổi lấy các phần quà miễn phí.</li>
									</ul>
									<h4>3. Các điều khoản dành cho người chơi</h4>
									<ul>
										<li>Tất cả mọi đối tượng đều tham gia đăng ký thành viên Splay, không phân biệt độ tuổi, giới tính.</li>
										<li>Trong quá trình tham gia hệ thống, có thể sẽ xuất hiện những ngôn từ hoặc những tình huống không phù hợp với một số đối tượng nhỏ tuổi. Splay không đảm bảo rằng những người chơi khác sẽ không cung cấp các nội dung mà có thể cho là không thích hợp với lứa tuổi đó.</li>
										<li>Khi tham gia trải nghiệm các tính năng trên Splay, khách hàng cần phải tuân theo yêu cầu về cách chơi và các thông tin được công bố.</li>
										<li>Một số tính năng có yêu cầu cung cấp thông tin liên hệ như tên, giới tính, số điện thoại...khách hàng có thể lựa chọn không tham gia để bảo mật thông tin.</li>
									</ul>
									<h4>3. Quy định khi đăng ký tài khoản</h4>
									<ul>
										<li>Khi đăng ký tài khoản, bạn phải cung cấp đầy đủ, chính xác thông tin về tên tuổi, số điện thoại, địa chỉ email, … và thực hiện xác thực tài khoản để bảo vệ quyền lợi của bạn.
									Lưu ý:
Đây không phải là những thông tin bắt buộc, nhưng khi có những rủi ro, mất mát sau này, Splay chỉ tiếp nhận những trường hợp điền đúng và đầy đủ những thông tin trên. Những trường hợp điền thiếu thông tin hoặc thông tin sai sự thật sẽ không được giải quyết. Những thông tin này sẽ được dùng làm căn cứ để hỗ trợ giải quyết.</li>
									</ul>
									<h4>3.1 Quy định về cách đặt tên tài khoản</h4>
									<ul>
										<li>Không được đặt tên và tạo biểu tượng liên quan đến các danh nhân, tên của các vị lãnh đạo Đảng và Nhà Nước.</li>
										<li>Không được đặt tên và tạo biểu tượng có nội dung phản động, bài xích tôn giáo, khiêu dâm, bạo lực, đi ngược lại thuần phong mỹ tục, truyền thống và văn hóa Việt Nam.</li>
										<li>Không được đặt tên và tạo biểu tượng có nội dung xúc phạm, khích bác đến người khác dưới bất kỳ hình thức nào.</li>
										<li>Không được đặt tên và tạo biểu tượng có nội dung phá rối hay làm mất uy tín của các dịch vụ do Splay cung cấp.</li>
										<li>Ngoài ra cách đặt tên còn phải tuân theo sự giám sát của bộ lọc với hơn 30,000 từ và đội ngũ quản trị nội dung theo dõi ghi nhận tố giác để xử lý các tình huống vi phạm.</li>
									</ul>
									<h4>3.2 Mật khẩu (Password)</h4>
									<ul>
										<li>Trong phần quản lý tài khoản, đối với một tài khoản, người chơi sẽ có một mật khẩu. Mật khẩu được sử dụng để đăng nhập vào game và các website. Người chơi có trách nhiệm phải tự mình bảo quản mật khẩu và mã game, nếu mật khẩu bị lộ ra ngoài dưới bất kỳ hình thức nào, Chúng tôi sẽ không chịu trách nhiệm về mọi tổn thất phát sinh.</li>
									</ul>
									<h4>3.3 Những hành vi sau bị tuyệt đối nghiêm cấm</h4>
									<ul>
										<li>Tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can thiệp vào hệ thống để can thiệp vào số dư tài khoản điểm Thịt (hack, cheat, bots…). Mọi vi phạm khi bị phát hiện sẽ bị xử lý theo quy định của pháp luật.</li>
										<li>Khi phát hiện ra lỗi của hệ thống hoặc tính năng, hãy thông báo ngay cho chúng tôi thông qua các kênh hỗ trợ chúng tôi cung cấp thường trực suốt thời gian hoạt động của Splay.</li>
									</ul>
									<h4>4. Các thỏa thuận chung</h4>
									<h4>4.1 Các thay đổi về nội dung của hệ thống Splay</h4>
									<ul>
										<li>Splay có thể bổ sung, sửa đổi hay xóa bỏ bất kỳ thông tin nào cũng như thay đổi sự trình bày, thành phần hoặc chức năng của hệ thống mà không cần báo trước. Nếu khách hàng  không đồng ý với những thay đổi đó, có thể ngưng sử dụng dịch vụ. Việc khách hàng tiếp tục sử dụng dịch vụ đồng nghĩa với việc đồng ý với những thay đổi đó.</li>
									</ul>
									<h4>4.2 Thay đổi quy định</h4>
									<ul>
										<li>Splay có toàn quyền thay đổi những điều khoản không còn phù hợp trong Quy định mà không cần báo trước. Nếu khách hàng không đồng ý với những thay đổi đó, có thể ngưng sử dụng dịch vụ. Việc khách hàng tiếp tục sử dụng dịch vụ đồng nghĩa với việc đồng ý với những thay đổi đó.</li>
									</ul>
									<h4>4.3 Sự gián đoạn của dịch vụ</h4>
									<ul>
										<li>Splay có quyền ngừng cung cấp dịch vụ trong một khoảng thời gian nhất định để sửa chữa, bảo trì máy móc và sẽ có thông báo trước cho khách hàng trên trang Web chính thức của hệ thống. Splay không bảo đảm với khách hàng việc kết nối vào dịch vụ của Splay vào bất kỳ lúc nào.</li>
										<li>Khách hàng thừa nhận dịch vụ của Splay có thể bị gián đoạn bởi các lý do nằm ngoài tầm kiểm soát như: Chập điện, thiên tai, hỏa hoạn…. Splay sẽ không chịu trách nhiệm đối với việc gián đoạn dịch vụ, trì hoãn hay không thể cung cấp dịch vụ bởi các lý do trên.</li>
									</ul>

									<h4>4.4 Cấm truy cập</h4>
									<ul>
										<li>Splay có toàn quyền, vào bất cứ thời điểm nào, cấm hoặc từ chối truy cập của khách hàng vào Splay hoặc bất kỳ phần nào của hệ thống ngay lập tức và không cần báo trước nếu cho rằng khách hàng đã vi phạm bất cứ điều khoản nào trong bản Quy định hoặc sự cấm đoán hay từ chối đó phù hợp và cần thiết.</li>
										<li>Trong những trường hợp nghiêm trọng, Splay có thể phối hợp với nhà chức trách để truy cứu trách nhiệm hình sự với những đối tượng vi phạm.</li>
									</ul>
									<h4>4.5 Quy định về bồi thường</h4>
									<ul>
										<li>Splay có trách nhiệm điều tra và hoàn trả điểm Thịt khi khách hàng gặp sự cố hệ thống do Splay gây ra.</li>
									</ul>
									<h4>4.6 Kết thúc dịch vụ</h4>
									<ul>
										<li>Khách hàng có thể ngưng sử dụng tài khoản bất cứ lúc nào mà không cần báo trước với Splay và không phải chịu trách nhiệm nào. Công ty có quyền tạm ngưng tài khoản của bạn để điều tra hoặc hủy bỏ để xử lý vi phạm. Nếu dịch vụ bị hủy bỏ, bạn phải chấp nhận những điều khoản sau đây:<br/>
										Splay có quyền ngưng tài khoản của bạn ngay lập tức và sẽ thông báo trước nếu bạn vi phạm bất cứ điều khoản nào trong Bản thỏa thuận này hoặc vi phạm các quy định trong hệ thống.</li>
									</ul>
									<h4>4.7 Thông tin của bên thứ ba</h4>
									<ul>
										<li>Thông tin được cung cấp tại hệ thống Splay có thể chứa thông tin từ bên thứ ba hoặc được chọn lọc từ các nguồn khác. Những thông tin đó không được coi là khuyến nghị hoặc xác thực của Splay cho bất kỳ người, sản phẩm hoặc dịch vụ nào.</li>
										<li>Splay không độc lập thẩm định thông tin và không chịu trách nhiệm nếu thông tin của bên thứ ba không cập nhật; Theo đó, Splay không nhận bất cứ trách nhiệm nào về các thông tin ấy. Khách hàng sử dụng hoặc đặt niềm tin vào những thông tin đó sau khi tự tìm hiểu trách nhiệm và các rủi ro.</li>
									</ul>
									<h4>4.8 Quyền sở hữu trí tuệ</h4>
									<ul>
										<li>Tất cả quyền sở hữu trí tuệ tồn tại trong hệ thống Splay đều thuộc về Splay hoặc đơn vị cấp phép hợp pháp cho Splay sử dụng tại hệ thống này. Theo đó, tất cả các quyền hợp pháp đều được đảm bảo. Trừ phi được sự đồng ý bằng văn bản của Splay, bạn không được phép tải lên, gửi, xuất bản, tái sản xuất, truyền hoặc phân phát bằng bất cứ hình thức nào bất cứ thành phần nào của hệ thống Game online hoặc tạo ra những bản sửa đổi của nội dung cung cấp trong Game online.</li>
										<li>Khách hàng đồng ý để Splay tự do sử dụng, công bố, áp dụng và sửa đổi bất kỳ ý tưởng, khái niệm, cách thức, đề xuất, gợi ý, bình luận hoặc liên lạc nào khác và thông tin được do khách hàng cung cấp một cách hoàn toàn miễn phí. Khách hàng từ bỏ và đồng ý từ bỏ bất kỳ quyền và sự đòi hỏi với bất kỳ khoản tiền thưởng, phí, nhuận bút, lệ phí và/ hoặc các kiểu chi trả khác liên quan đến việc Splay sử dụng, công bố, áp dụng, và/hoặc chỉnh sửa bất kỳ thành phần hoặc tất cả Phản hồi của khách hàng.</li>
									</ul>
									<h4>4.10 Thông tin người dùng</h4>
									<ul>
										<li>Với một số dịch vụ, hệ thống Splay yêu cầu người dùng phải đăng ký thông tin cá nhân. Splay có thể dùng thông tin này để gửi thông báo cho cá nhân đó về các sản phẩm và dịch vụ hoặc chương trình khuyến mại thông qua thư điện tử hoặc thư bưu chính. Splay cũng có thể sử dụng các thông tin này để tiến hành các cuộc điều tra (Ví dụ: thông báo thay đổi dịch vụ trong hệ thống, thông báo về các chương trình khuyến mại hay các hành động nhân đạo và xã hội khác). Splay duy trì chính sách "KHÔNG GỬI THƯ RÁC" và không chia sẻ, bán hay để lọt email của khách hàng cho các bên thứ ba khi không có sự chấp thuận của bạn.</li>
										<li>Splay sẽ chỉ đưa ra các thông tin cá nhân và/hoặc địa chỉ IP của người dùng khi được luật pháp Việt Nam yêu cầu và để làm các việc thực sự cần thiết như sau:<br/>
									Phối hợp với cơ quan điều tra để tìm ra những hoạt động bất hợp pháp liên quan đến việc phát tán thông tin và an ninh mạng.<br/>
										Bảo vệ quyền và tài sản liên quan đến hệ thống Splay & khách truy cập Splay. Nhận dạng những người cố tình vi phạm luật thông tin và an ninh mạng.</li>
									</ul>
									<h4>4.11 Thỏa mãn yêu cầu của bản thân người dùng</h4>
									<ul>
										<li>Splay chỉ chịu trách nhiệm khi thông tin đang được cam kết giữ kín. Khi thông tin đã được chuyển qua bên thứ ba đúng theo các thỏa thuận trên của bản Quy định, việc bảo mật thông tin là nằm ngoài khả năng và hoàn toàn không phải là trách nhiệm của phía Splay.</li>
									</ul>
									<h4>4.12 Giới hạn trách nhiệm pháp lý và bảo đảm</h4>
									<ul>
										<li>Khách hàng hành xử và tin tưởng hoàn toàn vào kỹ năng và khả năng đánh giá bản thân đối với việc sử dụng và hiểu thông tin trong hệ thống Splay. Khách hàng chịu trách nhiệm đảm bảo rằng việc sử dụng thông tin của cá nhân tuân thủ tất cả các yêu cầu của pháp luật hiện hành.</li>
										<li>Giới hạn nghĩa vụ pháp lý trong Quy định sẽ được áp dụng với quy mô đầy đủ nhất được pháp luật hiện hành cho phép.</li>
									</ul>
									<h4>4.13 Luật áp dụng</h4>
									<ul>
										<li>Quy định trên đây được thực thi theo pháp luật của nước Cộng hòa Xã hội Chủ Nghĩa Việt Nam. Khi sử dụng dịch vụ trong Splay, khách hàng đã mặc nhiên chấp nhận điều khoản trong bản Quy định này. Splay hoạt động hoàn toàn trong khuôn khổ luật pháp Việt Nam và cam kết tuân thủ các pháp chế của Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Các điều khoản trên là phù hợp với luật pháp hiện hành và đảm bảo quyền lợi cao nhất cho người sử dụng dịch vụ.</li>
										<li>Những điều khoản bổ sung sẽ được cập nhật ngay khi có hiệu lực phù hợp với tình hình hiện tại của Splay.</li>
									</ul>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item xs={4}>
							<RightArea></RightArea>
						</Grid>
					</Hidden>
				</Grid>
			</div>
		) : (<div className="global-loading"><CircularProgress
			size={50}
		/></div>)
	}
}

const mapStateToProps = state => ({
	data: state.help.data,
	waiting: state.help.waiting
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dieukhoan)