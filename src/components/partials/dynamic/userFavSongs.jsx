import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../endpoints";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import ArtistPieChart from "./favArtistsPieChart";
import { GetRefreshToken } from "../../../utils/refreshToken";
import { setRefreshToken } from "../../../store";
function UserFavSongs() {
    const [topTracks, setTopTracks] = useState([]);
    const [artistCounts, setArtistCounts] = useState({});
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    useEffect(() => {

        async function getUserTopTracks() {
            try {
                const response = await axios.get(endpoints.userTopTracks, getApiConfig(token));
                if (response.status === 200) {
                    console.log(response.data.items);
                    setTopTracks(response.data.items);
                    // console.log("dostan sie do artist name");
                    // console.log(response.data.items[0].artists[0].name);

                    const counts = {};
                    response.data.items.forEach((track) => {
                        track.artists.forEach((artist) => {
                            const artistName = artist.name;
                            counts[artistName] = (counts[artistName] || 0) + 1;
                        });
                    });
                    setArtistCounts(counts);
                    // console.log(artistCounts);
                }
                if (response.status === 401) {
                    // GetRefreshToken();
                }
            } catch (error) {
                // Check if the error is due to an expired token
                // if (error.response && error.response.status === 401 && error.response.data.error === 'Failed to fetch user data') {
                // console.log("Token expired. Refreshing...");
                // GetRefreshToken();
                // Retry the original request after refreshing the token
                // getUserTopTracks();
                // } else {
                // Handle other errors or log them as needed
                console.error('Error:', error);
                // }
            }
        }

        async function GetRefreshToken() {
            try {
                const response = await fetch('/auth/refresh_token');
                const json = await response.json();
                dispatch(setRefreshToken(json.access_token));
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        }

        getUserTopTracks();
        GetRefreshToken();
    }, [])



    return (
        <Box>
            <Typography variant="h4" style={{ textAlign: "center" }}>Top Tracks:</Typography>
            <ImageList cols={2} gap={50}>
                {topTracks.map((track) => (
                    <ImageListItem key={track.id} >
                        <Box style={{ overflow: "hidden" }}>
                            <Grid2 container spacing={2} >
                                <Grid2 xs={4} >
                                    <a href={track.external_urls.spotify} target="_blank">
                                        <img
                                            className="topCards"
                                            src={track.album.images[1].url}
                                            alt={track.name}
                                            loading="lazy"
                                            style={{ width: "100%" }}
                                        />
                                    </a>
                                </Grid2>
                                <Grid2 xs={8} style={{ margin: "auto" }}>
                                    <Box style={{ display: "flex", flexFlow: "column" }}>
                                        <Typography variant="h6">
                                            {track.name}
                                        </Typography>
                                        {track.artists.map((artist) => (
                                            <Box key={artist.id}>
                                                <Typography variant="h5">
                                                    {artist.name + " "}
                                                </Typography>
                                                <Typography variant="button">
                                                    Track Popularity: {track.popularity}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Typography variant="h4" style={{ textAlign: "center" }}>
                                Artist Distribution:
                            </Typography>
                            <ArtistPieChart artistCounts={artistCounts} />
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )

}

export default UserFavSongs;