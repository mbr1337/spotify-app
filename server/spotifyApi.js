const express = require('express');
const request = require('request');
const auth = require('./auth');

const apiUrl = 'https://api.spotify.com/v1';

const spotifyRouter = express.Router();

spotifyRouter.get('/me', (req, res) => {
    makeApiRequest('/me', auth.getAccessToken(), res);
});

spotifyRouter.get('/topTracks', (req, res) => {
    makeApiRequest('/me/top/tracks', auth.getAccessToken(), res);
});

spotifyRouter.get('/topArtists', (req, res) => {
    makeApiRequest('/me/top/artists', auth.getAccessToken(), res);
});

spotifyRouter.get('/followedArtists', (req, res) => {
    makeApiRequest('/me/following?type=artist&limit=20', auth.getAccessToken(), res);
});

spotifyRouter.get('/newReleases', (req, res) => {
    makeApiRequest('/browse/new-releases', auth.getAccessToken(), res);
});

spotifyRouter.get('/shows', (req, res) => {
    makeApiRequest('/me/shows?limit=50', auth.getAccessToken(), res);
});
spotifyRouter.get('/shows/:show_id/', (req, res) => {
    makeApiRequest(`/shows/${req.params.show_id}/episodes?limit=50`, auth.getAccessToken(), res);
});

spotifyRouter.get('/playlists', (req, res) => {
    makeApiRequest('/me/playlists?limit=50', auth.getAccessToken(), res);
});

spotifyRouter.get('/playlist/:playlist_id', (req, res) => {
    makeApiRequest(`/playlists/${req.params.playlist_id}`, auth.getAccessToken(), res);
});

spotifyRouter.get('/albums', (req, res) => {
    makeApiRequest('/me/albums?limit=50', auth.getAccessToken(), res);
});

spotifyRouter.get('/checkSavedEpisode/:episode_id', (req, res) => {
    makeApiRequest(`/me/episodes/contains?ids=${req.params.episode_id}`, auth.getAccessToken(), res);
});



function makeApiRequest(endpoint, access_token, res) {
    const url = apiUrl + endpoint;

    request.get({
        url: url,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: `Failed to fetch data for ${endpoint}` });
        }
    });
}

module.exports = spotifyRouter;
