import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../endpoints";
import getApiConfig from "../../../utils/axiosConfig";
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function UserFavArtists({ token }) {
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {

        async function getUserTopArtists() {
            try {
                const response = await axios.get(endpoints.userTopArtists, getApiConfig(token));
                if (response.status === 200) {
                    console.log(response.data.items);
                    setTopArtists(response.data.items);
                    // const artistsHrefs = response.data.items.map(item => {
                    //     return {
                    //         id: item.id,
                    //         externalUrl: item.external_urls && item.external_urls.spotify ? item.external_urls.spotify : null
                    //     };
                    // });
                    // setArtistsHrefs(artistsHrefs);
                    // console.log(artistsHrefs);
                }
                if (response.status === 401) {
                    // refreshToken();
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUserTopArtists();
    }, [])


    return (
        <Box>
            {topArtists === null ? <p>Loading...</p> : (
                <div>
                    <Typography variant="h4" style={{ textAlign: "center" }}>Top Artists:</Typography>
                    <ImageList cols={3} gap={20}>
                        {topArtists.map((artist) => (
                            <ImageListItem key={artist.id}>
                                {/* <a href={artist.external_urls.spotify} target="_blank"> */}
                                <img
                                    className="topCards"
                                    src={artist.images[1].url}
                                    alt={artist.name}
                                    loading="lazy"
                                />
                                {/* </a> */}
                                <ImageListItemBar sx={{ textAlign: "center" }}
                                    title={artist.name}
                                    subtitle={<span>Popularity: {artist.popularity}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            )}
        </Box>

    )

}

export default UserFavArtists;