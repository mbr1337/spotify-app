import { Box, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../endpoints";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
function UserAlbums() {

    const token = useSelector((state) => state.auth.token);
    const [userAlbums, setUserAlbums] = useState([]);
    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }

    useEffect(() => {
        async function getUserAlbums() {
            try {
                const response = await axios.get(endpoints.userAlbums, config);
                if (response.status === 200) {
                    console.log(response.data.items);
                    setUserAlbums(response.data.items);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUserAlbums();
    }, [])


    return (
        <Container maxWidth={false}>
            <Typography variant="h2" sx={{ display: "flex", justifyContent: "center" }}>Saved albums</Typography>
            <Box >
                {/* <ImageList cols={4} gap={50}>
                    {userAlbums.map((album) => (
                        <ImageListItem key={album.id} >
                            <Box style={{ overflow: "hidden" }}>
                                <Grid2 container spacing={2} >
                                    <Grid2 xs={12} >
                                        <a href={album.external_urls.spotify} target="_blank">
                                            <img
                                                // className="topCards"
                                                src={album.images[1].url}
                                                // alt={item.name}
                                                loading="lazy"
                                                style={{ width: "100%" }}
                                            />
                                        </a>
                                    </Grid2>
                                    <Grid2 xs={12} style={{}}>
                                        <Box style={{ display: "flex", flexFlow: "column" }}>
                                            <Typography variant="h6">
                                                {item.name}
                                            </Typography>
                                            {item.artists.map((artist) => (
                                                <Box key={artist.id}>
                                                    <Typography variant="h5">
                                                        Artists: {artist.name}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </ImageListItem>
                    ))}
                </ImageList> */}
            </Box>
        </Container>
    )
}

export default UserAlbums;