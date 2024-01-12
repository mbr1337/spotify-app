import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../endpoints";
import getApiConfig from "../../utils/axiosConfig";
import { Box, Fade, Grid, Skeleton, Typography } from "@mui/material";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import PlaylistList from "./playlistList";

function UserLeftsidePanel() {

    const [userPlaylists, setUserPlaylists] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        async function getUserPlaylists() {
            try {
                const response = await axios.get(endpoints.userPlaylists, getApiConfig(token));
                if (response.status === 200) {

                    const allPlaylists = [];
                    allPlaylists.push(...response.data.items);
                    // console.log("First 50 Playlists:", allPlaylists);
                    let nextUrl = response.data.next;
                    while (nextUrl) {
                        const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                        if (nextResponse.status === 200) {
                            // console.log(`fetching next ${nextResponse.data.items.length} playlists...`);
                            // console.log(nextResponse.data.items);
                            allPlaylists.push(...nextResponse.data.items);
                            nextUrl = nextResponse.data.next;
                        } else {
                            break;
                        }
                    }
                    setUserPlaylists(allPlaylists);

                }


            } catch (error) {
                console.error(error);
            }
        }
        getUserPlaylists();
    }, [token])


    return (
        <>
            <Fade in={true} timeout={2000} data-testid="user-playlists">
                <Box>
                    <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }}>Discover</Typography>
                    <Grid container>
                        {[
                            { icon: <PersonOutlinedIcon />, link: "/home", text: "Home" },
                            { icon: <PersonOutlinedIcon />, link: "./newReleases", text: "Made for You" },
                            { icon: <MicNoneIcon />, link: "./favoriteArtists", text: "Favorite Artists" },
                            { icon: <MusicNoteIcon />, link: "./favoriteSongs", text: "Favorite Songs" },
                            { icon: <AlbumIcon />, link: "./albums", text: "Albums" },
                        ].map((item, index) => (
                            <Grid key={index} item xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={1}>
                                        {item.icon}
                                    </Grid>
                                    <Grid item p={1}>
                                        <Typography variant="h4">
                                            <Link to={item.link} className="hvr-underline-from-left">
                                                {item.text}
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }}>Library</Typography>
                    <Grid container>
                        {[
                            { icon: <QueueMusicIcon />, link: "./playlists", text: "Playlists" },
                            { icon: <PodcastsIcon />, link: "./podcasts", text: "Podcasts" },
                            { icon: <MicNoneIcon />, link: "./followedArtists", text: "Followed Artists" },
                        ].map((item, index) => (
                            <Grid key={index} item xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={1}>
                                        {item.icon}
                                    </Grid>
                                    <Grid item p={1}>
                                        <Typography variant="h4">
                                            <Link to={item.link} className="hvr-underline-from-left">
                                                {item.text}
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Fade>
            <Fade in={true} timeout={2000}>
                <Box>
                    <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }}>Playlists</Typography>
                    <Grid container>
                        {!userPlaylists ? (
                            <>
                                {[...Array(15)].map((_, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography>
                                            <Skeleton data-testid="loading-skeleton" width={`${Math.round(Math.random() * (75 - 20 + 1)) + 20}%`} sx={{ m: 2, bgcolor: 'grey.800' }} />
                                        </Typography>
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <PlaylistList playlists={userPlaylists} />
                        )}
                    </Grid>
                </Box>
            </Fade>
        </>
    );
}

export default UserLeftsidePanel;