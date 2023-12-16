import React, { useState, useEffect } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { Box, Typography, Skeleton, Fade, Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import getApiConfig from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";

function FollowedArtistList() {
    const token = useSelector((state) => state.auth.token);
    const [artists, setArtists] = useState(null);

    useEffect(() => {
        async function getFollowedArtists() {
            try {
                const response = await axios.get(endpoints.userFollowedArtists, getApiConfig(token));
                if (response.status === 200) {
                    setArtists(response.data.artists.items);
                }
                if (response.status === 401) {
                    // refreshToken();
                }
            } catch (error) {
                console.error(error);
            }
        }
        getFollowedArtists();
    }, [token]);

    return (
        <>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>Followed Artists</Typography>
            <Grid container spacing={2}>
                {!artists ? (
                    [...Array(9)].map((_, index) => (
                        <Fade in={true} timeout={300} key={index}>
                            <Grid item xs={12} sm={12} md={6} lg={4} >
                                <Box style={{ overflow: "hidden" }}>
                                    <Grid2 container>
                                        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                            <Skeleton variant="rounded" width="100%" height={200} sx={{borderRadius: "45%"}} />
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
                        <Grid item key={artist.id} xs={12} sm={12} md={6} lg={4}>
                            <Box sx={{ overflow: "hidden", textAlign: "center", display: "flex", flexFlow: "column" }}>
                                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <img
                                        className="avatarW"
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        loading="lazy"
                                    />
                                </a>
                                <Typography variant="h4">{artist.name}</Typography>
                                <Typography variant="h5">Popularity: {artist.popularity}</Typography>
                                <Typography variant="h6">Genres: {artist.genres.join(", ")}</Typography>
                            </Box>
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
}

export default FollowedArtistList;
