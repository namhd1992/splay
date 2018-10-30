export const SERVER_ERROR = 'server/SERVER_ERROR'

const initialState = {
	serverError: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SERVER_ERROR:
			return {
				...state,
				serverError: true
			}
		default:
			return state
	}
}

export const setStatusServer = () => {
	return dispatch => {
		dispatch({
			type: SERVER_ERROR
		})
	}
}