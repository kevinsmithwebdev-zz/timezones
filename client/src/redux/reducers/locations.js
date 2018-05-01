const locationsInit = [
	{
		locStr: "Oakland, CA, USA",
		lat: 37.8043637,
		lon: -122.2711137,
		dstOffset: 1,
		rawOffset: -8,
		timeZoneId: 'America/Los_Angeles',
		timeZoneName: "Pacific Daylight Time"
	},
	{
		locStr: "Barcelona, Spain",
		lat: 41.3850639,
		lon: 2.1734035,
		dstOffset: 1,
		rawOffset: 1,
		timeZoneId: 'Europe/Madrid',
		timeZoneName: "Central European Summer Time"
	}
]


const locationsReducer = (state = locationsInit, action) => {
	let newLocs
	switch (action.type) {
		case 'SET_LOCATION':
			newLocs = [...state]
			newLocs[action.payload.locSlot] = action.payload.locObj
			return newLocs
		case 'SWAP_LOCATIONS':
			return [state[1], state[0]]
		default:
			return state
	}
}

export default locationsReducer
