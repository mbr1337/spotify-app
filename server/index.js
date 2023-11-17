// preparing for production
// ----------------
// npm run build
// npm install -g serve
// serve -s build
// app.use(express.static(path.join(__dirname, '../build')));
// ----------------

const express = require('express');
const request = require('request');
const dotenv = require('dotenv');
const port = 5000;
let access_token = '';
let refresh_token = '';



dotenv.config();

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
let spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI

let generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let app = express();

// const { setAccessToken } = proxy(app);
// zamienic lety na consty
// eslint
// podzielic na kilka modułów

app.get('/auth/login', (req, res) => {

    let scope = "streaming user-read-email user-read-private user-follow-read user-library-read user-read-playback-position user-read-playback-state user-top-read user-read-currently-playing user-modify-playback-state playlist-read-private playlist-read-collaborative user-library-read"
    let state = generateRandomString(16);

    let auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: spotify_redirect_uri,
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

    let code = req.query.code;

    let authOptions = {
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
        res.redirect('/')
    });
})

app.get('/auth/token', (req, res) => {
    res.json(
        {
            access_token: access_token
        })
})

app.get('/refresh_token', function (req, res) {

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            return res.status(500).send('Error refreshing token');
        }
        refresh_token = body.refresh_token;
        res.redirect('/')
    });
});

app.get('/auth/refresh_token', (req, res) => {
    res.json(
        {
            refresh_token: refresh_token
        })
})

app.get('/me', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me';

    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/me/topTracks', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/top/tracks';

    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/me/topArtists', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/top/artists';

    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/me/followedArtists', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/following?type=artist&limit=20';
    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/browse/new-releases', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/browse/new-releases';
    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/me/episodes', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/episodes';
    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});

app.get('/me/playlists', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/playlists';
    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});
app.get('/me/albums', (req, res) => {
    const apiUrl = 'https://api.spotify.com/v1/me/albums';
    request.get({
        url: apiUrl,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        json: true,
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        } else {
            res.status(response.statusCode).json({ error: 'Failed to fetch user data' });
        }
    });
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

