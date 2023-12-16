import React, { useEffect, useState } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { Fade, Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import getApiConfig from "../../../utils/axiosConfig";

function NewReleases() {

    const token = useSelector((state) => state.auth.token);
    const [releases, setReleases] = useState(null);

    useEffect(() => {
        async function getReleases() {
            try {
                const response = await axios.get(endpoints.newReleases, getApiConfig(token));
                if (response.status === 200) {
                    setReleases(response.data.albums.items);
                }
                if (response.status === 401) {
                    // Handle unauthorized access
                }
            } catch (error) {
                console.error(error);
            }
        }
        getReleases();
    }, [token]);

    return (
        <>
            {releases ? (
                <Zoom in={true} timeout={300}>
                    <Typography variant="h2" sx={{ display: "flex", justifyContent: "center", p: 2 }}>New Releases</Typography>
                </Zoom>
            ) : (
                <Skeleton animation="wave" variant="text" height={40} width="25%" sx={{ m: "auto", p: 2, bgcolor: 'grey.800' }} />
            )}
            <>
                <Grid2 container spacing={2}>
                    {releases ? releases.map((release, index) => (
                        <Zoom in={true} timeout={500} key={release.id} style={{ transitionDelay: `${500 + index * 100}ms` }}>
                            <Grid2 xs={12} md={6} lg={4} sx={{ textAlign: "center" }}>
                                <a href={release.external_urls.spotify} target="_blank">
                                    <img
                                        src={release.images[0].url}
                                        alt={release.name}
                                        loading="lazy"
                                        style={{ width: "100%" }}
                                    />
                                </a>
                                <Typography variant="h4">
                                    {release.name}
                                </Typography>
                                <Typography variant="h5">
                                    {release.artists.map((artist, artistIndex) => (
                                        <span key={artist.id}>
                                            {artist.name}
                                            {artistIndex < release.artists.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </Typography>
                                <Typography variant="h6">
                                    Release Date: {release.release_date || <Skeleton />}
                                </Typography>
                            </Grid2>
                        </Zoom>
                    )) : (
                        <>
                            {[...Array(9)].map((_, index) => (
                                <Fade in={true}
                                    // style={{ transitionDelay: `${300 + index * 100}ms` }}
                                    timeout={700}
                                    key={index}
                                >
                                    <Grid2 xs={12} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <Skeleton animation="wave" variant="rectangular" width="100%" height={200} sx={{ bgcolor: 'grey.900', borderRadius: "10%" }} />
                                        <Skeleton width="75%" sx={{ bgcolor: 'grey.800' }} />
                                        <Skeleton width="60%" sx={{ bgcolor: 'grey.800' }} />
                                        <Skeleton width="50%" sx={{ bgcolor: 'grey.800' }} />
                                    </Grid2>
                                </Fade>

                            ))}
                        </>
                    )}
                </Grid2>
            </>
        </>
    );
}

export default NewReleases;
