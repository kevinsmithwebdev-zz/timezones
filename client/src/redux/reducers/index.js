import { combineReducers } from 'redux'

import locations from './locations'
import suggest from './suggest'

const reducers = combineReducers({
	locations,
	suggest
})

export default reducers
