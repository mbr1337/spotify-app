import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../endpoints";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, Fade, Hidden, Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import UserAlbumsBubbleChart from "./userAlbumsBubbleChart";

function UserAlbums() {
    const token = useSelector((state) => state.auth.token);
    const [userAlbums, setUserAlbums] = useState([]);

    useEffect(() => {
        async function getUserAlbums() {
            try {
                const response = await axios.get(endpoints.userAlbums, getApiConfig(token));
                if (response.status === 200) {
                    console.log('response.data', response.data.items)
                    const allAlbums = [];
                    if (response.data.items) {
                        allAlbums.push(...response.data.items);
                        let nextUrl = response.data.next;
                        while (nextUrl) {
                            const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                            if (nextResponse.status === 200) {
                                console.log(`fetching next ${response.data.items.length} albums...`);
                                console.log("next albums: ", nextResponse.data.items);
                                allAlbums.push(...nextResponse.data.items);
                                nextUrl = nextResponse.data.next;
                            } else {
                                break;
                            }
                        }
                    }
                    setUserAlbums(allAlbums);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUserAlbums();
    }, [token])

    return (
        <>
            {Array.isArray(userAlbums) && userAlbums.length === 0 ? (
                <Grid2 container spacing={2}>
                    {[...Array(9)].map((_, index) => (
                        <Fade
                            in={true}
                            timeout={500}
                            key={index}
                        // style={{ transitionDelay: `${200 + index * 100}ms` }}
                        >
                            <Grid2 xs={12} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Skeleton animation="wave" variant="rectangular" width="65%" height={200} sx={{ bgcolor: 'grey.900', borderRadius: "10%" }} />
                                <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: 'grey.800' }} />
                            </Grid2>
                        </Fade>
                    ))}
                </Grid2>
            ) : (
                <Box>
                    <Zoom in={true} timeout={750}>
                        <Typography variant="h2" sx={{ textAlign: "center", p: 2 }}>Saved albums:</Typography>
                    </Zoom>
                    <Hidden lgDown>
                        <UserAlbumsBubbleChart userAlbums={userAlbums} />
                    </Hidden>
                    <Grid2 container spacing={2}>
                        {userAlbums.map(({ added_at, album }, index) => {
                            const formattedDate = added_at.slice(0, 10);
                            return (
                                <Zoom
                                    in={true}
                                    timeout={500}
                                    key={album.id}
                                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                                >
                                    <Grid2 xs={12} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <img
                                            className="topArtistCards"
                                            src={album.images[0].url}
                                            alt={album.name}
                                            loading="lazy"
                                            style={{
                                                marginBottom: 8,
                                            }}
                                        />
                                        <Typography variant="h4">
                                            {album.name}
                                        </Typography>
                                        {album.artists && (
                                            <Typography variant="h6" style={{ textAlign: "center" }}>
                                                {album.artists.map((artist, artistIndex) => (
                                                    <span key={artist.id}>
                                                        {artist.name}
                                                        {artistIndex < album.artists.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </Typography>
                                        )}
                                        <Typography variant="h6">
                                            Added at: {formattedDate}
                                        </Typography>
                                    </Grid2>
                                </Zoom>
                            );
                        })}
                    </Grid2>
                </Box>
            )}
        </>
    );
}

export default UserAlbums;
