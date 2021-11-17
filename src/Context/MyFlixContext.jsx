import React from 'react';
import { MyFlixReducer } from './MyflixReducer';
import axios from 'axios';

const API_KEY = '8fefea02';

const MyFlixContext = React.createContext();
const myFlixInitialState = {
	searchString: '',
	movieData: {
		Search: []
	},
	movieDetail: {}
}

const pageCount = (totalResults) => { return Math.ceil(parseInt(totalResults / 10)) };

const Provider = ({ children }) => {
	const [state, dispatch] = React.useReducer(MyFlixReducer, myFlixInitialState);
	const [currentPage, setPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);

	const clearList = React.useCallback(() => {
		dispatch({ type: 'reset' });
	}, [dispatch]);

	const fetchFlix = React.useCallback(async (searchString, scrolled) => {
		let hasScrolled = scrolled || false;

		if(searchString === '') {
			clearList()
			return;
		}

		setLoading(true);
		const response = await axios(
			`https://www.omdbapi.com/?apikey=${API_KEY}&page=${currentPage}&s=${searchString}`
		)

		const data = response.data;
		if(data.Response === "False") {
			dispatch({
				type: 'error',
				value: data.Error
			});
		} else {
			dispatch({
				type: 'movieData',
				value: { ...data, scrolled: hasScrolled }
			});

			if(currentPage < pageCount(data.totalResults)) {
				setPage(currentPage + 1);
			}
		}

		setLoading(false);

	}, [dispatch, setLoading, setPage, currentPage, clearList]);

	const fetchFlixById = React.useCallback(async (imdbID) => {
		setLoading(true);
		const response = await axios(
			`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
		)
		const data = response.data;
		if(data.Response) {
			dispatch({
				type: 'movieDetail',
				value: data
			})
		}
		setLoading(false);
	}, [dispatch, setLoading]);

	const contextValue = {
		state,
		dispatch,
		fetchFlix,
		fetchFlixById,
		loading,
		setPage,
		currentPage
	}

	return <MyFlixContext.Provider value={{ ...contextValue }}>{children}</MyFlixContext.Provider>
}

export { MyFlixContext, Provider, myFlixInitialState }