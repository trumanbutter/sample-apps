import React from 'react';
import { MyFlixReducer } from './MyflixReducer';
import axios from 'axios';

const API_KEY = '8fefea02';

const MyFlixContext = React.createContext();
const myFlixInitialState = {
	searchString: '',
	error: false,
	movieData: {
		Search: []
	}
}
const Provider = ({children}) => {
	const [state, dispatch] = React.useReducer(MyFlixReducer, myFlixInitialState);
	const [page, setPage] = React.useState(1);
	const fetchFlix = React.useCallback(async (searchString) => {
		const response = await axios(
      `https://www.omdbapi.com/?apikey=${API_KEY}&page=${page}&s=${searchString}`
    )
		const data = response.data;
		if(data.Search) {
			dispatch({
				type: 'movieData',
				value: data
			})
		}
	}, [dispatch, page])

	const fetchFlixById = React.useCallback(async (imdbID) => {
		const response = await axios(
			`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
		)
		const data = response.data;
		if(data.Response){
			dispatch({
				type: 'movieDetail',
				value: data
			})
		}

	}, [dispatch]);

	return <MyFlixContext.Provider value={{state, dispatch, fetchFlix, fetchFlixById}}>{children}</MyFlixContext.Provider>
}

export {MyFlixContext, Provider, myFlixInitialState}