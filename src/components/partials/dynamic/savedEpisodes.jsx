import React, { useEffect, useState } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { useSelector } from "react-redux";
import getApiConfig from "../../../utils/axiosConfig";
import { Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
function SavedEpisodes() {

    const token = useSelector((state) => state.auth.token);
    const [episodes, setEpisodes] = useState(null);

    useEffect(() => {
        async function getEpisodes() {
            try {
                const response = await axios.get(endpoints.userEpisodes, getApiConfig(token));
                if (response.status === 200) {
                    const allEpisodes = [];
                    allEpisodes.push(...response.data.items);
                    console.log("First 50 Episodes:", allEpisodes);
                    let nextUrl = response.data.next;
                    while (nextUrl) {
                        const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                        if (nextResponse.status === 200) {
                            console.log(`Fetching next ${nextResponse.data.items.length} episodes...`);
                            console.log(nextResponse.data.items);
                            allEpisodes.push(...nextResponse.data.items);
                            nextUrl = nextResponse.data.next;
                        } else {
                            break;
                        }
                    }

                    const uniqueEpisodes = allEpisodes.filter((episode, index, self) => (
                        index === self.findIndex((e) => (
                            e.episode.show.id === episode.episode.show.id
                        ))
                    ));
                    console.log("unique episodes: ", uniqueEpisodes)
                    setEpisodes(uniqueEpisodes);
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
            {episodes ? (
                <>
                    <Zoom in={true} timeout={750}>
                        <Typography variant="h2" sx={{ textAlign: "center", p: 2 }}>Your Podcasts</Typography>
                    </Zoom>
                    <Grid2 container spacing={2}>
                        {episodes.map(({ episode }, index) => (
                            <Zoom
                                in={true}
                                timeout={500}
                                key={episode.show.id}
                                style={{ transitionDelay: `${300 + index * 100}ms` }}
                            >
                                <Grid2 xs={12} sm={6} md={4} lg={3} >
                                    <Link to={`/singularEpisode/${episode.show.id}`}>
                                        <img src={episode.show.images[0].url} alt={episode.show.name}
                                            className="playlistCards"
                                            loading="lazy"
                                        />
                                    </Link>
                                    <Typography variant="h4" sx={{ textAlign: "center" }}>{episode.show.name}</Typography>
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

export default SavedEpisodes;
