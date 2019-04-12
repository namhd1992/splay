import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button';
import Table, {
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'

const actionsStyles = theme => ({
	root: {
	  flexShrink: 0,
	  color: theme.palette.text.secondary,
	  marginLeft: theme.spacing.unit * 2.5,
	},
  });
  
  class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
	  this.props.onChangePage(event, 0);
	};
  
	handleBackButtonClick = event => {
	  this.props.onChangePage(event, this.props.page - 1);
	};
  
	handleNextButtonClick = event => {
	  this.props.onChangePage(event, this.props.page + 1);
	};
  
	handleLastPageButtonClick = event => {
	  this.props.onChangePage(
		event,
		Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
	  );
	};
  
	render() {
	  const { classes, count, page, rowsPerPage, theme } = this.props;
  
	  return (
				<div className={classes.root}>
					<IconButton
						onClick={this.handleFirstPageButtonClick}
						disabled={page === 0}
						aria-label="First Page"
					>
						{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
					</IconButton>
					<IconButton
						onClick={this.handleBackButtonClick}
						disabled={page === 0}
						aria-label="Previous Page"
					>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
					</IconButton>
					<IconButton
						onClick={this.handleNextButtonClick}
						disabled={page >= Math.ceil(count / rowsPerPage) - 1}
						aria-label="Next Page"
					>
						{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</IconButton>
					<IconButton
						onClick={this.handleLastPageButtonClick}
						disabled={page >= Math.ceil(count / rowsPerPage) - 1}
						aria-label="Last Page"
					>
						{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
					</IconButton>
				</div>
			);
		}
  }
  
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
	TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class PopupTruyKich extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			rowsPerPageOptions:[10,20,30],
			page: 0,
			rowsPerPage: 10,
			value: 0,
		};
	}

	handleCloseBonus=()=>{
		this.props.handleCloseBonus();
	}

	handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
	render() {
		var rows;
		var length;
		var emptyRows;
		const { classes } = this.props;
		const {rowsPerPage, page, rowsPerPageOptions, value } = this.state; 
		const {userChildents, isOpenListUser}=this.props;
		if(userChildents !==undefined && userChildents.length>0){
			rows=userChildents;
			length=rows.length;
			emptyRows = rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage);
		}
		return (userChildents !==undefined && userChildents.length>0)?(
			<div>
				<Dialog
					fullScreen={false}
					onBackdropClick={this.props.handleCloseBonus}
					open={isOpenListUser}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#23c9b6" }}>Danh Sách Triệu Hồi</span></DialogTitle>

					<DialogContent style={{ color: "#fff" }}>
						<div>
							<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell style={{textAlign:'left'}}>Stt</TableCell>
									<TableCell style={{textAlign:'center'}}>Đã triệu hồi</TableCell>
									<TableCell style={{textAlign:'center'}}>Đã chơi game</TableCell>
								</TableRow>
							</TableHead>
									{(rows!==undefined)?(<TableBody>{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
									return (
									<TableRow key={index}>
										<TableCell style={{textAlign:'left'}}>{index+1}</TableCell>
										<TableCell style={{textAlign:'center'}}>{row.userName}</TableCell>
										<TableCell style={{textAlign:'center'}}>{(row.finishMission)?(<div><img alt="just alt" src="./check_circle.png" /></div>):(<div>-</div>)}</TableCell>
									</TableRow>
									);
								})}
								{emptyRows > 0 && (
									<TableRow style={{ height: 48 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}</TableBody>):(<TableBody></TableBody>)}
								<TableFooter>
									<TableRow>
										<TablePagination
											colSpan={3}
											count={rows.length}
											rowsPerPage={rowsPerPage}
											page={page}
											rowsPerPageOptions={rowsPerPageOptions}
											onChangePage={this.handleChangePage}
											onChangeRowsPerPage={this.handleChangeRowsPerPage}
											ActionsComponent={TablePaginationActionsWrapped}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</div>
					</DialogContent>
					<DialogActions>
						<div>
							<Button onClick={this.handleCloseBonus} style={{ color: "#888787", borderRadius:"20px" }}>
								Đóng
							</Button>
						</div>
					</DialogActions>
				</Dialog>
			</div>):(<div></div>);
	}
}


export default withStyles(styles)(PopupTruyKich)
