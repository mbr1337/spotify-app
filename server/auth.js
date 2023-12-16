// auth.js
const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const { generateRandomString } = require('./utils/genRandomString');

const authRouter = express.Router();

let access_token = '';
let refresh_token = '';

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

authRouter.get('/login', (req, res) => {
    const scope = "streaming user-read-email user-read-private user-follow-read user-library-read user-read-playback-position user-read-playback-state user-top-read user-read-currently-playing user-modify-playback-state playlist-read-private playlist-read-collaborative user-library-read";
    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: spotify_redirect_uri,
        state: state
        // show_dialog: true
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

authRouter.get('/callback', (req, res) => {
    const code = req.query.code;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: spotify_redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            return res.status(500).send('Error refreshing token');
        }
        access_token = body.access_token;
        refresh_token = body.refresh_token;
        res.redirect('/');
    });
});

authRouter.get('/token', (req, res) => {
    res.json(
        {
            access_token: access_token
        });
});

authRouter.get('/refresh_token', (req, res) => {
    res.json(
        {
            refresh_token: refresh_token
        });
});

function getAccessToken() {
    return access_token;
}

module.exports = { authRouter, getAccessToken };