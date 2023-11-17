import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../endpoints";
import { useSelector } from "react-redux";

function ApiPlayer() {

    const token = useSelector((state) => state.auth.token);


    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const [playback, setPlayback] = useState("");
    const [player, setPlayer] = useState(undefined);


    // useEffect(() => {
    //     async function getPlaybackState() {
    //         try {
    //             const response = await axios.get(endpoints.userPlayer, config);
    //             console.log(response.data);
    //             setPlayback(response.data.device.id);
    //             if (response.status === 401) {
    //                 // refreshToken();
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     getPlaybackState();
    // }, [])


    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();

        };
    }, []);


    return (
        <>
            <div className="container">
                <div className="main-wrapper">

                </div>
            </div>
        </>
        // <div>
        //     <h2>Playback device Id: </h2>
        //     {playback}
        // </div>
    )


}

export default ApiPlayer;