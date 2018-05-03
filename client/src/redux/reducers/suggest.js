const suggestInit = [
	[] ,[]
]

const suggestReducer = (state = suggestInit, action) => {
	let newState
	switch (action.type) {
		case 'SET_SUGGEST':
			newState = [...state]
			newState[action.payload.locSlot] = action.payload.suggestions
			return newState
		case 'SET_LOCATION':
			newState = [...state]
			newState[action.payload.locSlot] = []
			return newState
		default:
			return state
	}
}

export default suggestReducer
