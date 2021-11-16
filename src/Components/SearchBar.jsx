import * as React from "react";
import Paper from "@mui/material/Paper";
import {InputBase, Divider, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {MyFlixContext} from '../Context/MyFlixContext'


const SearchBar = () => {
  const {fetchFlix, dispatch, state} = React.useContext(MyFlixContext)

  const handleClick = React.useCallback((event) => {
      event.preventDefault();
      fetchFlix(state.searchString);
    }, [state, fetchFlix]);

  const handleSearchString = React.useCallback(
    (event) => {
      event.preventDefault();
      dispatch({
        type: 'searchString',
        value: event.target.value
      });
    },
    [dispatch]
  );
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center"}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search movie titles"
        inputProps={{ "aria-label": "Movie titles" }}
        onChange={handleSearchString}
        value={state.searchString}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleClick}
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export {
	SearchBar
}
