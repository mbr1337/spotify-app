import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FollowedArtistList from './components/partials/dynamic/followedArtistList';
import NewReleases from './components/partials/dynamic/newReleases';
import UserPlaylists from './components/partials/dynamic/userPlaylists';
import UserAlbums from './components/partials/dynamic/userAlbums';
import UserFavArtists from './components/partials/dynamic/userFavArtists';
import UserFavSongs from './components/partials/dynamic/userFavSongs';
import WebPlayback from './components/partials/dynamic/WebPlayback';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@mui/material';
import Playlist from './components/partials/dynamic/playlist';
import UserProfile from './components/partials/userProfile';
import Login from './components/Login';
import SavedPodcasts from './components/partials/dynamic/savedPodcasts';
import PodcastEpisodes from './components/partials/dynamic/podcastEpisodes';
import theme from './theme/theme';
import WelcomeComponent from './components/partials/dynamic/welcomeComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <WelcomeComponent />
      },
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
        path: "/playlist/:playlist_id",
        element: <Playlist />
      },
      {
        path: "/albums",
        element: <UserAlbums />
      },
      {
        path: "/podcasts",
        element: <SavedPodcasts />
      },
      {
        path: "/podcast/:podcast_id",
        element: <PodcastEpisodes />
      },
      {
        path: "/profile",
        element: <UserProfile />
      },
      {
        path: "/logout",
        element: <Playlist />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default router;