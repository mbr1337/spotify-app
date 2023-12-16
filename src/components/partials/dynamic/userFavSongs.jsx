import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../endpoints";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, Fade, Hidden, Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import ArtistPieChart from "./favArtistsPieChart";
import { setRefreshToken } from "../../../store";

function UserFavSongs() {
    const [topTracks, setTopTracks] = useState(null);
    const [artistCounts, setArtistCounts] = useState({});
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [artistsForChart, setArtistsForChart] = useState(null);


    useEffect(() => {
        async function getUserTopTracks() {
            try {
                const response = await axios.get(endpoints.userTopTracks, getApiConfig(token));
                if (response.status === 200) {
                    const tracks = response.data.items;
                    // console.log("tracks: ", response.data.items);

                    const counts = [];
                    response.data.items.forEach((track) => {
                        track.artists.forEach((artist) => {
                            const label = artist.name;
                            const existingArtist = counts.find((entry) => entry.label === label);
                            const href = artist.href;

                            if (existingArtist) {
                                existingArtist.value += 1;
                            } else {
                                counts.push({ value: 1, label, href });
                            }
                        });
                    });
                    const sortedCounts = counts.sort((a, b) => b.value - a.value);

                    setArtistCounts(sortedCounts);
                    console.log("sorted Counts array: ", sortedCounts);
                    setArtistsForChart(sortedCounts);
                    sortedCounts.forEach(async ({ href }, index) => {
                        console.log(index, 'link:', href);
                        const response = await axios.get(href, getApiConfig(token));
                        if (response.status === 200) {
                            if (response.data.genres) {
                                setArtistsForChart((prevArtistsForChart) => {
                                    return prevArtistsForChart.map((artist) => {
                                        if (artist.href === href) {
                                            return {
                                                ...artist,
                                                genres: response.data.genres,
                                            };
                                        }
                                        return artist;
                                    });
                                });
                            }
                        }
                    })
                    setTopTracks(tracks);

                }
                if (response.status === 401) {
                    // GetRefreshToken();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // async function GetRefreshToken() {
        //     try {
        //         const response = await fetch('/auth/refresh_token');
        //         const json = await response.json();
        //         dispatch(setRefreshToken(json.access_token));
        //     } catch (error) {
        //         console.error('Error fetching token:', error);
        //     }
        // }

        getUserTopTracks();
    }, [token])

    useEffect(() => {
        console.log("artistsForChart:", artistsForChart);
    }, [artistsForChart]);

    return (
        <>
            {/* <Zoom in={true} timeout={700}> */}
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <ArtistPieChart artistCounts={artistCounts} />
            </Box>
            {artistsForChart && artistsForChart.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <ArtistPieChart artistCounts={artistsForChart} useGenre arcLabel={false} />
                </Box>
            )}
            {/* </Zoom> */}
            <Box>
                <Zoom in={true} timeout={700}>
                    <Typography variant="h4" sx={{ textAlign: "center", m: 2 }}>
                        {!topTracks ? (
                            <Skeleton variant="text" width="50%" sx={{ bgcolor: 'grey.800', mx: "auto" }} />
                        ) : (
                            'Top Tracks'
                        )}
                    </Typography>
                </Zoom>
                {!topTracks ? (
                    <>
                        <Hidden mdDown>
                            <Fade in={true} timeout={500}  >

                                <Grid2 container spacing={2}>
                                    {[...Array(8)].map((_, index) => (
                                        <React.Fragment key={index}>
                                            {index % 2 === 0 ? (
                                                <>
                                                    <Grid2 xs={3}>
                                                        <Skeleton variant="rectangular" width="100%" height={180} sx={{ bgcolor: 'grey.900', borderRadius: "10%" }} />
                                                    </Grid2>
                                                    <Grid2 xs={3} sx={{ m: "auto" }}>
                                                        <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                                        <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                                        <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                                    </Grid2>
                                                </>
                                            ) : (
                                                <>
                                                    <Grid2 xs={3} sx={{ m: "auto" }}>
                                                        <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: 'grey.800', marginLeft: 'auto' }} />
                                                        <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800', marginLeft: 'auto' }} />
                                                        <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.800', marginLeft: 'auto' }} />
                                                    </Grid2>
                                                    <Grid2 xs={3}>
                                                        <Skeleton animation="wave" variant="rectangular" width="100%" height={180} sx={{ bgcolor: 'grey.900', borderRadius: "10%", ml: "auto" }} />
                                                    </Grid2>
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Grid2>
                            </Fade>

                        </Hidden>
                        <Hidden mdUp>
                            <Grid2 container spacing={2}>
                                {[...Array(9)].map((_, index) => (
                                    <Fade
                                        in={true}
                                        timeout={500}
                                        key={index}
                                    // style={{ transitionDelay: `${200 + index * 100}ms` }}
                                    >
                                        <Grid2 xs={12} md={6} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                                            <Skeleton variant="rectangular" width="80%" height={150} sx={{ bgcolor: 'grey.900', borderRadius: "10%" }} />
                                            <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                            <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                            <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                        </Grid2>
                                    </Fade>
                                ))}
                            </Grid2>
                        </Hidden>

                    </>
                ) : (
                    <Grid2 container spacing={2}>
                        {topTracks.map((track, index) => (
                            <React.Fragment key={track.id}>
                                <Hidden
                                    mdDown
                                >
                                    <Zoom
                                        in={true}
                                        timeout={850}

                                        style={{ transitionDelay: `${200 + index * 100}ms` }}
                                    >
                                        <Grid2 xs={6} sx={{ display: "flex", justifyContent: "center", flexDirection: index % 2 === 0 ? "row" : "row-reverse", textAlign: index % 2 === 0 ? "left" : "right", alignItems: "center" }} className="gridItem">
                                            <Grid2 xs={12} md={4}>
                                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                                    <a href={track.external_urls.spotify} target="_blank">
                                                        <img
                                                            className="topTrackCards"
                                                            src={track.album.images[0].url}
                                                            alt={track.name}
                                                            loading="lazy"
                                                            style={{ width: "100%" }}
                                                        />
                                                    </a>
                                                </Box>
                                            </Grid2>
                                            <Grid2 xs={12} md={8}>
                                                <Box style={{ display: "flex", flexDirection: "column", marginLeft: 'auto' }}>
                                                    <Typography variant="h4">
                                                        {track.name}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        {track.artists.map((artist, artistIndex) => (
                                                            <span key={artist.id}>
                                                                {artist.name}
                                                                {artistIndex < track.artists.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </Typography>
                                                    <Typography variant="button">
                                                        Track Popularity: {track.popularity}
                                                    </Typography>
                                                </Box>
                                            </Grid2>
                                        </Grid2>
                                    </Zoom>
                                </Hidden>
                                <Hidden mdUp>
                                    <Zoom
                                        in={true}
                                        timeout={850}

                                        style={{ transitionDelay: `${200 + index * 100}ms` }}
                                    >
                                        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", p: 2, m: 2 }}>
                                            <Grid2 xs={12} >
                                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                                    <a href={track.external_urls.spotify} target="_blank">
                                                        <img
                                                            className="topTrackCards"
                                                            src={track.album.images[0].url}
                                                            alt={track.name}
                                                            loading="lazy"
                                                            style={{ width: "100%" }}
                                                        />
                                                    </a>
                                                    <Typography variant="h4">
                                                        {track.name}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        {track.artists.map((artist, artistIndex) => (
                                                            <span key={artist.id}>
                                                                {artist.name}
                                                                {artistIndex < track.artists.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </Typography>
                                                    <Typography variant="button">
                                                        Track Popularity: {track.popularity}
                                                    </Typography>
                                                </Box>
                                            </Grid2>
                                        </Grid2>
                                    </Zoom>
                                </Hidden>
                            </React.Fragment>
                        ))}
                    </Grid2>
                )}
            </Box>
        </>
    )
}

export default UserFavSongs;
