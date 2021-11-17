import {myFlixInitialState} from './MyFlixContext'
const MyFlixReducer = (prevState, action) => {
	switch (action.type) {
		case 'searchString':
			return {
				...prevState,
				searchString: action.value,
			}
		case 'movieData':
			return {
				...prevState,
				movieData: {
					...prevState.movieData,
					Response: action.value.Response,
					Search: action.value.scrolled ? [...prevState.movieData.Search, ...action.value.Search] : action.value.Search,
					totalResults: action.value.totalResults
				},
				pageCount: Math.ceil(parseInt(action.value.totalResults / 10))
			}
		case 'movieDetail':
			return {
				...prevState,
				movieDetail: action.value
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
		case 'reset':
			return myFlixInitialState
		default:
			return prevState
	}
}

export {
	MyFlixReducer
}