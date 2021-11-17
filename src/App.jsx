import './Styles/App.scss'
import { SearchBar, MovieList, MovieDetail, Header } from './Components'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Alert, Backdrop, Container, CircularProgress } from '@mui/material';
import React from 'react';
import { MyFlixContext } from './Context/MyFlixContext';

function App() {
  const { loading, state } = React.useContext(MyFlixContext)
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme} >
      <div className="App">
        {loading && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Container maxWidth="xl">
          <Header />
          <SearchBar />
          {state.movieData.Search && (
            <div id={"myflix-list-container"}>
              <MovieList />
            </div>
          )}
          {state.error && (
            <Alert severity="warning">{state.error}</Alert>
          )}
          <MovieDetail />
        </Container>

      </div>
    </ThemeProvider>
  );
}

export default App;
