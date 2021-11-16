import './Styles/App.scss'
import { SearchBar, MovieList, MovieDetail } from './Components'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CircularProgress } from '@mui/material';
import React from 'react';
import { MyFlixContext } from './Context/MyFlixContext'

function App() {
  const context = React.useContext(MyFlixContext)
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme} >
      {context.state.inProgress && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      <Container maxWidth="xl">
        <div className="App">
          <SearchBar />
        </div>
        {context.state.movieData &&(<MovieList />)}
        {context.state.movieDetail && (
          <MovieDetail />
        )}
      </Container>

    </ThemeProvider>
  );
}

export default App;
