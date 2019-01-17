import axios from 'axios'
import Ultilities from '../Ultilities/global'
import {SERVER_ERROR} from './server'
export const EVENT_REQUEST = 'event/EVENT_REQUEST'
export const EVENT_ACTION = 'event/EVENT_ACTION'


const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case EVENT_REQUEST:
			return {
				...state,
				waiting: true
			}
		case EVENT_ACTION:
			return {
				...state,
				data: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const changePoint = (scoinToken, eventGameId, giftValue) => {
	return dispatch => {
		dispatch({
			type: EVENT_REQUEST
		})
		var data = {
			"scoinToken": scoinToken,
			"eventGameId": eventGameId,
			"giftValue": giftValue
		}
		var url = Ultilities.base_url() + "/anonymous/event-game/exchange-gift";
		return axios.post(url, data).then(function (response) {
			dispatch({
				type: EVENT_ACTION,
				data: response
			})
		}).catch(function (error) {
			dispatch({
				type: SERVER_ERROR
			})
		})
	}
}