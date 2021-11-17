import * as React from "react";
import Paper from "@mui/material/Paper";
import {InputBase, Divider, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {MyFlixContext} from '../Context/MyFlixContext'


const SearchBar = () => {
  const {fetchFlix, dispatch, state, setPage} = React.useContext(MyFlixContext)

  const handleClick = React.useCallback((event) => {
      event.preventDefault();
      fetchFlix(state.searchString, false);

    }, [state, fetchFlix]);

    React.useEffect(() => {
      if(state.searchString === '') {
        setPage(1)
        return;
      }
    }, [state.searchString, setPage]);

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
    <div className='myflix-search'>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center"}}
      >
        <InputBase
          // ref={searchRef}
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
    </div>
  );
}

export {
	SearchBar
}
