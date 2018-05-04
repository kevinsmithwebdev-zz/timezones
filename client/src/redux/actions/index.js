import { API_LOCATION, API_SUGGEST } from '../../common/constants/routes'

export const setLocation = (locSlot, locObj) => {
  return {
    type: 'SET_LOCATION',
    payload: { locSlot, locObj }
  }
}

export const clearLocation = (locSlot) => {
  return {
    type: 'CLEAR_LOCATION',
    payload: { locSlot }
  }
}

export function checkLocation(locSlot, str) {
  const url = API_LOCATION + str
  return (dispatch) => {
    dispatch(clearLocation(locSlot))

    fetch(url, { method: 'GET' }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      if (json)
        dispatch(setLocation(locSlot, json))
    })
    .catch(error => console.error(error))
  }
}

//***

export const swapLocations = () => {
  return {
    type: 'SWAP_LOCATIONS'
  }
}

//***

export const setSuggest = (locSlot, suggestions) => {
  return {
    type: 'SET_SUGGEST',
    payload: { locSlot, suggestions }
  }
}

export const clearSuggest = (locSlot) => {
  return {
    type: 'CLEAR_SUGGEST',
    payload: { locSlot}
  }
}

export function getSuggest(locSlot, str) {
  const url = API_SUGGEST + str

  return (dispatch) => {
    fetch(url, { method: 'GET' }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      let pred = json.data.predictions.map(l => l.description)
      if (pred)
        dispatch(setSuggest(locSlot, pred))
    })
    .catch(error => console.error(error))
  }
}
