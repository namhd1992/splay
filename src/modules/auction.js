import axios from 'axios'
import Ultilities from '../Ultilities/global'
export const AUCTION_REQUEST = 'auction/AUCTION_REQUEST'
export const AUCTION_ACTION = 'auction/AUCTION_ACTION'
export const AUCTION_RESPONSE = 'auction/AUCTION_RESPONSE'
export const AUCTION_RESPONSE_HISTORY = 'auction/AUCTION_RESPONSE_HISTORY'
export const AUCTION_RESPONSE_HISTORY_MORE = 'auction/AUCTION_RESPONSE_HISTORY_MORE'
export const AUCTION_RESPONSE_MORE = 'auction/AUCTION_RESPONSE_MORE'

const initialState = {
	data: [],
	waiting: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case AUCTION_REQUEST:
			return {
				...state,
				waiting: true
			}
		case AUCTION_RESPONSE:
			return {
				...state,
				data: action.data,
				totalRecords: action.totalRecords,
				waiting: false
			}
		case AUCTION_RESPONSE_MORE:
			return {
				...state,
				data: state.data.concat(action.data),
				totalRecords: action.totalRecords,
				waiting: false
			}
		case AUCTION_RESPONSE_HISTORY:
			return {
				...state,
				dataHistory: action.dataHistory,
				totalHistoryRecords: action.totalRecords,
				waiting: false
			}
		case AUCTION_RESPONSE_HISTORY_MORE:
			return {
				...state,
				dataHistory: state.dataHistory.concat(action.dataHistory),
				totalHistoryRecords: action.totalRecords,
				waiting: false
			}
		case AUCTION_ACTION:
			return {
				...state,
				dataAuction: action.data,
				waiting: false
			}
		default:
			return state
	}
}

export const getData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/auction?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: AUCTION_RESPONSE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const getMoreData = (limit, offset) => {
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/auction?limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: AUCTION_RESPONSE_MORE,
				data: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const getHistoryData = (id, limit, offset) => {
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/auctionHistory?auctionEventId=" + id + "&limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: AUCTION_RESPONSE_HISTORY,
				dataHistory: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const getMoreHistoryData = (id, limit, offset) => {
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/auctionHistory?auctionEventId=" + id + "&limit=" + limit + "&offset=" + offset;
		return axios.get(url).then(function (response) {
			dispatch({
				type: AUCTION_RESPONSE_HISTORY_MORE,
				dataHistory: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const getDataId = (id) => {
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var url = Ultilities.base_url() + "/anonymous/auction?auctionId=" + id;
		return axios.get(url).then(function (response) {
			dispatch({
				type: AUCTION_RESPONSE,
				data: [response.data.dataArr[0]]
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const auction = (token, scoinToken, id, price) => {
	var header = {
		headers: {
			"content-type": "application/json",
			"Authorization": "bearer " + token,
		}
	}
	return dispatch => {
		dispatch({
			type: AUCTION_REQUEST
		})
		var data = {
			"scoinToken": scoinToken,
			"auctionEventId": id,
			"price": price
		}
		var url = Ultilities.base_url() + "/auction";
		return axios.post(url, data, header).then(function (response) {
			dispatch({
				type: AUCTION_ACTION,
				data: response
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}