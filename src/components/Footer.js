import React from 'react'
import '../styles/footer.css'
import Grid from 'material-ui/Grid'

class Footer extends React.Component {

	render() {
		return (
			<div className='footer-root'>
				<Grid container spacing={0}>
					<Grid item xs={12} md={3} style={{ padding: "10px" }}>
						<div className='footer-icon'><img alt="logo vtc" src="/../logo_vtc.png" /></div>
					</Grid>
					<Grid item xs={12} md={9} style={{ paddingLeft: "20px", borderLeft: "1px solid #fff" }}>
						<div className='footer-content'>
							Copright 2015 VTC Mobile. All rights reserved. <br />
							Công ty cổ phần VTC dịch vụ di động - Tầng 11 - Tòa nhà VTC Online, số 18 Tam Trinh phường Minh Khai, quận Hai Bà Trưng, Hà Nội
            </div>
						<div className='footer-content'>
							<a href="/gioi-thieu">Giới thiệu</a> - <a href="/help">Hướng dẫn</a> - <a href="/dieu-khoan">Điều khoản</a>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}


export default Footer
