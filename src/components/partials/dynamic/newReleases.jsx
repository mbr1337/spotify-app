import React, { useEffect, useState } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { Box, Container, Typography } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";

function NewReleases() {

    const token = useSelector((state) => state.auth.token);

    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const [releases, setReleases] = useState([]);



    useEffect(() => {
        async function getReleases() {
            try {
                const response = await axios.get(endpoints.newReleases, config);
                if (response.status === 200) {
                    // console.log(response.data.albums.items);
                    setReleases(response.data.albums.items);
                }
                if (response.status === 401) {

                }
            } catch (error) {
                console.error(error);
            }
        }
        getReleases();
    }, []);

    return (
        <Container maxWidth={false}>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>New Releases</Typography>
            <Box >
                <ImageList cols={4} gap={50}>
                    {releases.map((release) => (
                        <ImageListItem key={release.id} >
                            <Box style={{ overflow: "hidden" }}>
                                <Grid2 container spacing={2} >
                                    <Grid2 xs={12} >
                                        <a href={release.external_urls.spotify} target="_blank">
                                            <img
                                                // className="topCards"
                                                src={release.images[1].url}
                                                alt={release.name}
                                                loading="lazy"
                                                style={{ width: "100%" }}
                                            />
                                        </a>
                                    </Grid2>
                                    <Grid2 xs={12} style={{}}>
                                        <Box style={{ display: "flex", flexFlow: "column" }}>
                                            <Typography variant="h6">
                                                {release.name}
                                            </Typography>
                                            {release.artists.map((artist) => (
                                                <Box key={artist.id}>
                                                    <Typography variant="h5">
                                                        Artists: {artist.name}
                                                    </Typography>

                                                </Box>
                                            ))}
                                            <Typography variant="button">
                                                Release Date: {release.release_date}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </ImageListItem>
                    ))}
                </ImageList>
                {/* {releases === null ? <p>Loading...</p> : (

                    releases.map((release) => (
                        <div key={release.id} className="release-card">
                            <a href={release.external_urls.spotify} target="_blank">
                                <img src={release.images[1].url} alt={release.name} />
                            </a>
                            {release.artists.map((artist) => (
                                <p key={artist.id}>
                                    Artists: {artist.name}
                                </p>
                            ))}
                            <p>Name: {release.name}</p>
                            <p>Release Date: {release.release_date}</p>
                        </div>
                    ))
                )} */}
            </Box>
        </Container>
    )

}

export default NewReleases;