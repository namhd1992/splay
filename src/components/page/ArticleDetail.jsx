import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import '../../styles/imageServerError.css'



class ArticleDetailComponent extends React.Component {

	render() {
		const {data, waiting,server}=this.props;
		return (data!== undefined && data.length > 0) ? (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0" }} spacing={8} justify="center">
								<Grid item xs={12}>
									<h2 style={{ color: "#fff" }}>{data[0].title}</h2>
								</Grid>
								<Grid item xs={12} style={{ overflow: "hidden" }}>
									<div className={"article_content"} style={{ color: "#fff" }}
										dangerouslySetInnerHTML={{ __html: data[0].content }}>
									</div>
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
			) : (<div style={{ width: "100%", textAlign: "center", color: "#fff" }}>Không tìm thấy tin tức</div>)
	}
}

export default connect()(ArticleDetailComponent)
