import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ScrollToTop from './core/scrollToTop';
import { LightTheme } from './core/light-theme';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import ListingProfilePage from './pages/listingProfile';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <React.Suspense fallback={<CircularProgress />}>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path={''} element={<Navigate to='home' replace/>}/>
            <Route path={'/home'} element={<HomePage/>}></Route>
            <Route path={'/building/:id'} element={<ListingProfilePage/>}></Route>
          </Routes>
        </Router>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default React.memo(App);