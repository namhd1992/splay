import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR, SERVER_ERROR_OTHER} from './server'
export const COIN_REQUEST = 'coin/COIN_REQUEST'
export const COIN_RESPONSE = 'coin/COIN_RESPONSE'
export const CHANGE_COIN_RESPONSE = 'coin/CHANGE_COIN_RESPONSE'

const initialState = {
	data: [],
	waiting: false,
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
		case CHANGE_COIN_RESPONSE:
			return {
				...state,
				status:action.data.status,
				totalRecords: action.data.totalRecords,
			}
		case SERVER_ERROR_OTHER:
			return {
				...state,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (token, coin) => {
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
		var url = Ultilities.base_url() + "scoin/exchange/info?action="+coin;
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

export const changeCoin = (token, packageXO, packageXu, coin) => {
	var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	var body = {
		packageExchangeXO: packageXO,
		packageExchangeXU: packageXu,
		action: coin
	}
	return dispatch => {
		dispatch({
			type: COIN_REQUEST
		})
		var url = Ultilities.base_url() + "scoin/exchange/exchange";
		return axios.post(url, body, header).then(function (response) {
			dispatch({
				type: CHANGE_COIN_RESPONSE,
				data: response.data
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR_OTHER
			})
		})
	}
}