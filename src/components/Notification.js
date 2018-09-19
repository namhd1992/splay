import React from 'react'
import amber from 'material-ui/colors/amber'
import CheckCircleIcon from 'material-ui-icons/CheckCircle'
import ErrorIcon from 'material-ui-icons/Error'
import InfoIcon from 'material-ui-icons/Info'
import IconButton from 'material-ui/IconButton'
import WarningIcon from 'material-ui-icons/Warning'
import CloseIcon from 'material-ui-icons/Close'
import green from 'material-ui/colors/green'
import PropTypes from 'prop-types'
import Snackbar, { SnackbarContent } from 'material-ui/Snackbar'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 3,
	},
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
});


function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class Notification extends React.Component {

	
	render() {
		return (
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={this.props.openSnack}
				onClose={this.props.closeSnackHandle}
				autoHideDuration={2000}
			>
				<MySnackbarContentWrapper
					onClose={this.props.closeSnackHandle}
					variant={this.props.variant}
					message={<span id="message-id">{this.props.message}</span>}
				/>
			</Snackbar>
		);
	}
}

export default Notification
