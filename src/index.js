import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet
} from "react-router-dom";
import FollowedArtistList from './components/partials/dynamic/followedArtistList';
import NewReleases from './components/partials/dynamic/newReleases';
import UserPlaylists from './components/partials/dynamic/userPlaylists';
import UserAlbums from './components/partials/dynamic/userAlbums';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material';
import UserFavArtists from './components/partials/dynamic/userFavArtists';
import UserFavSongs from './components/partials/dynamic/userFavSongs';
import SavedEpisodes from './components/partials/dynamic/savedEpisodes';
import WebPlayback from './components/partials/dynamic/WebPlayback';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/followedArtists",
        element: <FollowedArtistList />
      },
      {
        path: "/favoriteArtists",
        element: <UserFavArtists />
      },
      {
        path: "/favoriteSongs",
        element: <UserFavSongs />
      },
      {
        path: "/newReleases",
        element: <NewReleases />
      },
      {
        path: "/player",
        element: <WebPlayback />
      },
      {
        path: "/playlists",
        element: <UserPlaylists />
      },
      {
        path: "/albums",
        element: <UserAlbums />
      },
      {
        path: "/podcasts",
        element: <SavedEpisodes />
      },
    ],
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: 'AileronThin',
  },
  // Add other theme customizations here
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();