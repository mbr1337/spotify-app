import React, { useState, useEffect } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { Box, Typography, Skeleton, Fade, Grid, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import getApiConfig from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";
import { HelpOutline } from "@mui/icons-material";

function FollowedArtistList() {
    const token = useSelector((state) => state.auth.token);
    const [artists, setArtists] = useState(null);

    useEffect(() => {
        async function getFollowedArtists() {
            try {
                const response = await axios.get(endpoints.userFollowedArtists, getApiConfig(token));
                if (response.status === 200) {
                    const allFollowedArtists = [];
                    allFollowedArtists.push(...response.data.artists.items);
                    console.log("First 50 Artists:", allFollowedArtists);
                    let nextUrl = response.data.next;
                    while (nextUrl) {
                        const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                        if (nextResponse.status === 200) {
                            console.log(`fetching next ${nextResponse.data.artists.items.length} artists...`);
                            console.log(nextResponse.data.artists.items);
                            allFollowedArtists.push(...nextResponse.data.items);
                            nextUrl = nextResponse.data.next;
                        } else {
                            break;
                        }
                    }

                    setArtists(allFollowedArtists);
                }
                if (response.status === 401) {
                }
            } catch (error) {
                console.error(error);
            }
        }
        getFollowedArtists();
    }, [token]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Popularity is a 0-to-100 score that ranks how popular an artist is relative to other artists on Spotify.">
                    <HelpOutline />
                </Tooltip>
            </Box>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>Followed Artists</Typography>
            <Grid container spacing={2}>
                {!artists ? (
                    [...Array(9)].map((_, index) => (
                        <Fade in={true} timeout={300} key={index}>
                            <Grid item xs={12} sm={12} md={6} lg={4} >
                                <Box style={{ overflow: "hidden" }}>
                                    <Grid2 container>
                                        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                            <Skeleton variant="rounded" width="100%" height={200} sx={{ borderRadius: "45%" }} />
                                        </Grid2>
                                        <Grid2 xs={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                            <Skeleton variant="text" width="50%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                            <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            </Grid>
                        </Fade>
                    ))
                ) : (
                    artists.map((artist) => (
                        <Grid item key={artist.id} xs={6} sm={6} md={6} lg={4}>
                            <Box sx={{ overflow: "hidden", textAlign: "center", display: "flex", flexFlow: "column", p: 1 }}>
                                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <img
                                        className="avatarW"
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        loading="lazy"
                                    />
                                </a>
                                <Typography variant="h4">{artist.name}</Typography>
                                <Typography variant="h5" sx={{ p: 1 }}>Popularity: {artist.popularity} </Typography>
                                <Typography variant="h6">{artist.genres.length !== 0 ? `Genres: ${artist.genres.join(", ")}` : ""}</Typography>
                            </Box>
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
}

export default FollowedArtistList;
