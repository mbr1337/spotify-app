import React, { useState, useEffect } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { Box, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function FollowedArtistList(props) {

    const token = props.token;
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function getFollowedArtists() {
            try {
                const response = await axios.get(endpoints.userFollowedArtists, config);
                if (response.status === 200) {
                    // console.log(response.data);
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
    }, []);


    return (
        <Container maxWidth={false}>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>Followed Artists</Typography>
            <Box>
                <ImageList cols={3} gap={50} >
                    {artists === null ? <p>Loading data...</p> : (
                        artists.map((artist) => (
                            <ImageListItem key={artist.id} >
                                <Box style={{ overflow: "hidden" }}>
                                    <Grid2 container>
                                        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                            <a href={artist.external_urls.spotify} target="_blank" >
                                                <img
                                                    className="avatarW"
                                                    src={artist.images[1].url}
                                                    alt={artist.name}
                                                    loading="lazy
                                                    " />
                                            </a>
                                        </Grid2>
                                        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                            <Box style={{ display: "flex", flexFlow: "column", textAlign: "center" }}>
                                                <Typography>Name: {artist.name}</Typography>
                                                <Typography>Popularity: {artist.popularity}</Typography>
                                                <Typography>Genres: {artist.genres.join(", ")}</Typography>
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                </Box>

                            </ImageListItem>
                        ))
                    )}
                </ImageList>
            </Box>
        </Container>
    );
}

export default FollowedArtistList;