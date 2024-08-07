import React, { useEffect, useState } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { useSelector } from "react-redux";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
function SavedPodcasts() {

    const token = useSelector((state) => state.auth.token);
    const [shows, setShows] = useState(null);

    useEffect(() => {
        async function getEpisodes() {
            try {
                const response = await axios.get(endpoints.userShows, getApiConfig(token));
                if (response.status === 200) {
                    const allShows = [];
                    allShows.push(...response.data.items);
                    console.log(`First ${response.data.items.length} Shows:`, allShows);
                    let nextUrl = response.data.next;
                    while (nextUrl) {
                        const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                        if (nextResponse.status === 200) {
                            console.log(`Fetching next ${nextResponse.data.items.length} shows...`);
                            console.log(nextResponse.data.items);
                            allShows.push(...nextResponse.data.items);
                            nextUrl = nextResponse.data.next;
                        } else {
                            break;
                        }
                    }

                    // const uniqueEpisodes = allShows.filter((episode, index, self) => (
                    //     index === self.findIndex((e) => (
                    //         e.episode.show.id === episode.episode.show.id
                    //     ))
                    // ));
                    // console.log("unique shows: ", uniqueEpisodes)
                    console.log('allShows: ', allShows);
                    setShows(allShows);
                }
                if (response.status === 401) {

                }
            } catch (error) {
                console.error(error);
            }
        }
        getEpisodes();
    }, []);

    return (
        <>
            {shows ? (
                <>
                    <Zoom in={true} timeout={750}>
                        <Typography variant="h2" sx={{ textAlign: "center", p: 2 }}>Your Podcasts</Typography>
                    </Zoom>
                    <Grid2 container spacing={2} sx={{ p: 2 }}>
                        {shows.map(({ show }, index) => (
                            <Zoom
                                in={true}
                                timeout={500}
                                key={show.id}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                            >
                                <Grid2 xs={12} sm={6} md={4} lg={3} >
                                    <Box >
                                        <Link to={`/podcast/${show.id}`}>
                                            <img src={show.images[0].url} alt={show.name}
                                                className="playlistCards"
                                                loading="lazy"
                                            />
                                            <Typography variant="h4" sx={{ textAlign: "center" }}>{show.name}</Typography>
                                        </Link>
                                    </Box>
                                </Grid2>
                            </Zoom>
                        )
                        )}
                    </Grid2>
                </>
            ) : (
                <Skeleton></Skeleton>
            )}

        </>
    )

}

export default SavedPodcasts;
