import React from 'react'
import { MyFlixContext } from '../Context/MyFlixContext'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const MovieList = () => {
	const {state, fetchFlixById} = React.useContext(MyFlixContext);

	const handleClick = React.useCallback((imdbID) => {
		fetchFlixById(imdbID);
	}, [fetchFlixById]);

	return (
		<Grid container spacing={3}>
			{state.movieData.Search.map((movie) => (
				<Grid key={movie.imbID} item xs={12} md={6} lg={3}>
					<Card key={movie.imbID}>
						<CardActionArea onClick={() => handleClick(movie.imdbID)}>
							<CardMedia
								component="img"
								image={movie.Poster}
								alt={`${movie.title} Poster`}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{movie.Title}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}

export {
	MovieList
}