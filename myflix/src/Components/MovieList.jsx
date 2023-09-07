import React from 'react'
import { MyFlixContext } from '../Context/MyFlixContext'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import posterPlaceholder from '../images/poster-placeholder.png';
import { debounce } from 'lodash'

// Hook
const useEventListener = (eventName, handler, element = window) => {
	// Create a ref that stores handler
	const savedHandler = React.useRef();
	React.useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	React.useEffect(
		() => {
			const isSupported = element && element.addEventListener;
			if(!isSupported) return;
			const eventListener = (event) => savedHandler.current(event);
			element.addEventListener(eventName, debounce(eventListener, 1000));
			return () => {
				element.removeEventListener(eventName, eventListener);
			};
		}, [eventName, element]);
}


const MovieList = () => {
	const { state, fetchFlixById, fetchFlix, currentPage } = React.useContext(MyFlixContext);

	const scrollHandler = React.useCallback(() => {
		if((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
			if(currentPage < state.pageCount) {
				fetchFlix(state.searchString, true)
			}
		}
	}, [fetchFlix, currentPage, state.pageCount, state.searchString]);

	useEventListener('scroll', scrollHandler);

	const handleClick = React.useCallback((imdbID) => {
		fetchFlixById(imdbID);
	}, [fetchFlixById]);

	return (
		<>
			<Grid container spacing={3} sx={{ mb: 10 }}>
				{state.movieData.Search.map((movie) => (
					<Grid key={movie.imbID} item xs={12} md={4} lg={3}>
						<Card key={movie.imbID}>
							<CardActionArea onClick={() => handleClick(movie.imdbID)}>
								<CardMedia
									component="img"
									image={movie.Poster === "N/A" ? posterPlaceholder : movie.Poster}
									alt={`${movie.title} Poster`}
								/>
								<CardContent>
									<Typography gutterBottom variant="h6" component="div">
										{movie.Title}
									</Typography>
									<Typography variant="subtitle2">({movie.Year})</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	)
}

export {
	MovieList
}