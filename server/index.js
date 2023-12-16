// index js
// preparing for production
// ----------------
// npm run build
// npm install -g serve
// serve -s build
// app.use(express.static(path.join(__dirname, '../build')));
// ----------------

const express = require('express');
const dotenv = require('dotenv');
const { authRouter, access_token } = require('./auth');
const spotifyRouter = require('./spotifyApi');

dotenv.config();

const port = 5000;
const app = express();

app.use('/auth', authRouter);
app.use('/spotify', spotifyRouter);

app.listen(port, () => {
    console.info(`Listening at http://localhost:${port}`)
})

module.exports = app;