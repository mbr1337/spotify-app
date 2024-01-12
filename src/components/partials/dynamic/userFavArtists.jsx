import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../endpoints";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, Fade, Skeleton, Tooltip, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import { HelpOutline } from "@mui/icons-material";

function UserFavArtists() {
    const [topArtists, setTopArtists] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        async function getUserTopArtists() {
            try {
                const response = await axios.get(endpoints.userTopArtists, getApiConfig(token));
                if (response.status === 200) {
                    // const sortedTopArtists = response.data.items.slice(0, 3).sort((a, b) => {
                    //     // Custom sorting function to place #1 in the middle
                    //     const indexA = response.data.items.indexOf(a);
                    //     const indexB = response.data.items.indexOf(b);
                    //     const middleIndex = Math.floor(response.data.items.slice(0, 3).length / 2);

                    //     if (indexA === middleIndex) return -1;
                    //     if (indexB === middleIndex) return 1;
                    //     return 0;
                    // });

                    // const remainingArtists = response.data.items.slice(3);
                    // setTopArtists([...sortedTopArtists, ...remainingArtists]);
                    setTopArtists(response.data.items);
                }
                if (response.status === 401) {
                    // refreshToken();
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUserTopArtists();
    }, [token])

    return (
        <>
            {!topArtists ? (
                <Box>
                    <Skeleton variant="text" height={40} width="25%" sx={{ mx: "auto" }} />
                    <Grid2 container spacing={2}>
                        {[...Array(9)].map((_, index) => (
                            <Fade in={true} timeout={700} key={index}>
                                <Grid2 xs={6} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Skeleton animation="wave" variant="rounded" width="75%" height={200} sx={{ borderRadius: "10%" }} />
                                    <Skeleton animation="wave" variant="text" width="40%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                    <Skeleton animation="wave" variant="text" width="30%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                </Grid2>
                            </Fade>
                        ))}
                    </Grid2>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title="Popularity is a 0-to-100 score that ranks how popular an artist is relative to other artists on Spotify.">
                            <HelpOutline />
                        </Tooltip>
                    </Box>
                    <Zoom in={true} timeout={750}>
                        <Typography variant="h2" sx={{ textAlign: "center", p: 2 }}>Favorite Artists:</Typography>
                    </Zoom>
                    <Grid2 container spacing={2} sx={{ pt: 5 }}>
                        {topArtists.map((artist, index) => (
                            <Zoom
                                in={true}
                                timeout={500}
                                key={artist.id}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                            >
                                <Grid2 xs={6} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <img
                                        className="topArtistCards"
                                        src={artist.images[0].url}
                                        alt={artist.name}
                                        loading="lazy"
                                        style={{
                                            // marginBottom: index === 0 ? "8px" : "4px",
                                            marginBottom: 8,
                                            border: index === 0 ? "4px solid gold" : index === 1 ? "4px solid silver" : index === 2 ? "4px solid #765341" : "none",
                                            // box-shadow: 0 0 20px rgba(218, 203, 5, 0.9);
                                            boxShadow: index === 0 ? "0 0 20px rgba(218, 203, 5, 0.9)" : "none"
                                        }}
                                    />
                                    <Typography variant="h4" style={{ textAlign: "center" }}>
                                        {artist.name}
                                    </Typography>
                                    <Typography variant="h6" style={{ textAlign: "center" }}>
                                        Popularity: {artist.popularity}
                                    </Typography>
                                </Grid2>
                            </Zoom>
                        ))}
                    </Grid2>
                </Box>
            )}
        </>
    )
}

export default UserFavArtists;