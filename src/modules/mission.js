import axios from 'axios'
import Ultilities from '../Ultilities/global'

export const MISSION_REQUEST = 'mission/MISSION_REQUEST'
export const MISSION_RESPONSE = 'mission/MISSION_RESPONSE'
export const MISSION_FINISH = 'mission/MISSION_FINISH'
export const MISSION_RESPONSE_MORE = 'mission/MISSION_RESPONSE_MORE'
export const MISSION_RESPONSE_BY_ID_GAME='mission/MISSION_RESPONSE_BY_ID_GAME'
export const MISSION_RESPONSE_INFO='mission/MISSION_RESPONSE_INFO'

const initialState = {
  data: [],
  dataMission:[],
  waiting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MISSION_REQUEST:
      return {
        ...state,
        waiting: true
      }
    case MISSION_RESPONSE:
      return {
        ...state,
        data: action.data,
        totalRecords: action.totalRecords,
        waiting: false
      }
    case MISSION_FINISH:
      return {
        ...state,
        dataFinish: action.data
      }
    case MISSION_RESPONSE_MORE:
      return {
        ...state,
        data: state.data.concat(action.data),
        totalRecords: action.totalRecords,
        waiting: false
      }
      case MISSION_RESPONSE_BY_ID_GAME:
      return {
        ...state,
        dataMission: action.dataMission,
				totalRecords: action.totalRecords
      }
    default:
      return state
  }
}

export const getData = (limit, offset, token) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission?limit=" + limit + "&offset=" + offset;
    return axios.get(url, header).then(function (response) {
      dispatch({
        type: MISSION_RESPONSE,
        data: response.data.dataArr,
        totalRecords: response.data.totalRecords
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
}

export const finishData = (id, scoin, token) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission?missionId=" + id;
    return axios.post(url, {scoinToken: scoin}, header).then(function (response) {
      dispatch({
        type: MISSION_FINISH,
        data: response
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
}

export const getMoreData = (limit, offset, token) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
  return dispatch => {
    dispatch({
      type: MISSION_REQUEST
    })
    var url = Ultilities.base_url() + "mission?limit=" + limit + "&offset=" + offset;
    return axios.get(url, header).then(function (response) {
      dispatch({
        type: MISSION_RESPONSE_MORE,
        data: response.data.dataArr,
        totalRecords: response.data.totalRecords
      })
    }).catch(function (error) {
      console.log(error);
    })
  }
}


export const getMissionByGame = (gameId, token) => {
  var header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "bearer " + token,
    }
  }
	return dispatch => {
		dispatch({
			type: MISSION_REQUEST
		})
    var url = Ultilities.base_url() + "splayGame/mission?splayGameId=" + gameId;
		return axios.get(url,header).then(function (response) {
			dispatch({
				type: MISSION_RESPONSE_BY_ID_GAME,
				dataMission: response.data.dataArr,
				totalRecords: response.data.totalRecords
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}

export const getInfoMission = (missionId) => {
	return dispatch => {
		dispatch({
			type: MISSION_REQUEST
		})
    var url = Ultilities.base_url() + "getInfoMission?id=" + missionId;
		return axios.get(url).then(function (response) {
			dispatch({
				type: MISSION_RESPONSE_INFO,
				dataInfoMission: response.data.dataArr
			})
		}).catch(function (error) {
			console.log(error);
		})
	}
}