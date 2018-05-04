const locationsInit = [
	{},
	{}
]


const locationsReducer = (state = locationsInit, action) => {
	let newLocs
	switch (action.type) {
		case 'SET_LOCATION':
			newLocs = [...state]
			newLocs[action.payload.locSlot] = action.payload.locObj
			return newLocs
		case 'CLEAR_LOCATION':
			newLocs = [...state]
			newLocs[action.payload.locSlot] = []
			return newLocs
		case 'SWAP_LOCATIONS':
			return [state[1], state[0]]
		default:
			return state
	}
}

export default locationsReducer
