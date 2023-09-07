import React from 'react'
import { IconButton, Dialog, DialogActions, Grid, DialogContent, Typography } from '@mui/material';
import { MyFlixContext } from '../Context/MyFlixContext'
import CloseIcon from '@mui/icons-material/Close';
import { isEmpty } from '../utilities';
import posterPlaceholder from '../images/poster-placeholder.png';


const prefix = 'movie-details';
const MovieDetail = () => {
	const { dispatch, state } = React.useContext(MyFlixContext)

	const handleClose = React.useCallback(() => {
		dispatch({
			type: 'movieDetail',
			value: {}
		})
	}, [dispatch]);

	return (
		<Dialog
			fullWidth
			maxWidth={'md'}
			open={!isEmpty(state.movieDetail)}
			className={`${prefix}-dialog`}
			onClose={handleClose}
		>
			<DialogActions className="movie-detail-dialog-actions">
				<IconButton onClick={handleClose} aria-label="delete" size="large">
					<CloseIcon fontSize="inherit" />
				</IconButton>
			</DialogActions>
			<DialogContent>
			<Grid container spacing={2}>
				<Grid item xs={12} md={5} >
					<div className="image-poster">
						<img src={state.movieDetail.Poster === "N/A" ? `${posterPlaceholder}`: `${state.movieDetail.Poster}`} alt={`${state.movieDetail.Title} poster`} maxWidth={"300"} />
					</div>
				</Grid>
				<Grid item xs={12} md={7} className={`${prefix}-title`}>
					<Typography variant="h4">
						{state.movieDetail.Title}
						<Typography variant="subtitle1" display="inline" marginLeft={3}>({state.movieDetail.Year})</Typography>
					</Typography>
					<Typography marginTop={2} variant={"subtitle2"}>
						Cast: {state.movieDetail.Actors}
					</Typography>
					<Typography variant={"subtitle2"}>
						Genres: {state.movieDetail.Genre}
					</Typography>
					<Typography variant={"subtitle2"}>
						Runtime: {state.movieDetail.Runtime}
					</Typography>
					<Typography variant={"subtitle2"}>
						Rated: {state.movieDetail.Rated}
					</Typography>
					<Typography variant="h5" marginTop={2} marginBottom={1} fontWeight={400} >Synopsis</Typography>
					<Typography >
						{state.movieDetail.Plot}
					</Typography>
					<Typography marginTop={2} variant={"subtitle2"}>
						Director: {state.movieDetail.Director}
					</Typography>
				</Grid>
			</Grid>
			</DialogContent>
		</Dialog>
	)
}
export {
	MovieDetail
}