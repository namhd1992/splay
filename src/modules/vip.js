import axios from 'axios'
import Ultilities from '../Ultilities/global'
export const VIP_REQUEST = 'vip/VIP_REQUEST'
export const VIP_RESPONSE = 'vip/VIP_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case VIP_REQUEST:
			return {
				...state,
				waiting: true
			}
		case VIP_RESPONSE:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = () => {
	return dispatch => {
		dispatch({
			type: VIP_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/vipSplay";
		return axios.get(url).then(function (response) {
			dispatch({
				type: VIP_RESPONSE,
				data: [response.data.dataObj]
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}