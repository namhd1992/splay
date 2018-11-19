import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const COIN_REQUEST = 'coin/COIN_REQUEST'
export const COIN_RESPONSE = 'coin/COIN_RESPONSE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case COIN_REQUEST:
			return {
				...state,
				waiting: true
			}
		case COIN_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (token) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: COIN_REQUEST
		})
		var url = Ultilities.base_url() + "scoin/deposit";
		return axios.get(url, header).then(function (response) {
			dispatch({
				type: COIN_RESPONSE,
				data: response.data.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}