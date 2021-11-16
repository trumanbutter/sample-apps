const MyFlixReducer = (prevState, action) => {
	switch (action.type) {
		case 'searchString':
			return {
				...prevState,
				searchString: action.value
			}
		case 'movieData':
			return {
				...prevState,
				movieData: action.value,
				pageCount: parseInt(action.value.totalResults / 10)
			}
		case 'error':
			return {
				...prevState,
				error: action.value
			}
		case 'inProgress':
			return {
				...prevState,
				inProgress: action.value
			}
		default:
			return prevState
	}
}

export {
	MyFlixReducer
}