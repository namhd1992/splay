import axios from 'axios'
import Ultilities from '../Ultilities/global'
export const HOME_REQUEST = 'home/HOME_REQUEST'
export const HOME_RESPONSE = 'home/HOME_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case HOME_REQUEST:
			return {
				...state,
				waiting: true
			}
		case HOME_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (limit,offset) => {
	return dispatch => {
		dispatch({
			type: HOME_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/getFileCached";
		axios.get(url).then(function (response) {
			url = response.data;
			axios.get(url).then(function(contentResponse){
				dispatch({
					type: HOME_RESPONSE,
					data: contentResponse.data
				})
			}).catch(function(error){
				console.log(error);
			});
		}).catch(function (error) {
			console.log(error);
		})
	}
}