import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../endpoints";
import getApiConfig from "../../utils/axiosConfig";
import { Box, Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import UserPlaylists from "./userPlaylists";

function UserLeftsidePanel() {

    const [userPlaylists, setUserPlaylists] = useState([]);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        async function getUserPlaylists() {
            try {
                const response = await axios.get(endpoints.userPlaylists, getApiConfig(token));
                if (response.status === 200) {
                    setUserPlaylists(response.data.items);
                    console.log(response.data.items);
                }

            } catch (error) {
                console.error(error);
            }
        }

        getUserPlaylists();
    }, [])


    return (
        <Box
        // sx={{ pt: 20 }}
        >
            <Box>
                <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }} >Discover</Typography>
                <Grid2 container>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1} >
                                <PersonOutlinedIcon />
                            </Grid2>
                            <Grid2 p={1}>
                                <Link to="/" className="hvr-underline-from-left">Home</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1} >
                                <PersonOutlinedIcon />
                            </Grid2>
                            <Grid2 p={1}>
                                <Link to="./newReleases" className="hvr-underline-from-left">Made for You</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <MicNoneIcon />
                            </Grid2>
                            <Grid2 p={1} >
                                <Link to="./favoriteArtists" className="hvr-underline-from-left">Favorite Artists</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <MusicNoteIcon />
                            </Grid2>
                            <Grid2 p={1} >
                                <Link to="./favoriteSongs" className="hvr-underline-from-left">Favorite Songs</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <AlbumIcon />
                            </Grid2>
                            <Grid2 p={1}>
                                <Link to="./albums" className="hvr-underline-from-left">Albums</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }} >Library</Typography>
                <Grid2 container>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <QueueMusicIcon />
                            </Grid2>
                            <Grid2 p={1}>
                                <Link to="./playlists" className="hvr-underline-from-left">Playlists</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <PodcastsIcon />
                            </Grid2>
                            <Grid2 p={1}>
                                <Link to="./podcasts" className="hvr-underline-from-left">Podcasts</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12} sx={{ marginLeft: 3, mt: 1 }}>
                        <Grid2 container alignItems="center">
                            <Grid2 xs={1}>
                                <MicNoneIcon />
                            </Grid2>
                            <Grid2 p={1} >
                                <Link to="./followedArtists" className="hvr-underline-from-left">Followed Artists</Link>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold" }}>Playlists</Typography>
                <Box>
                    <Grid2 container>
                        {userPlaylists === null ? (
                            <p>Loading Playlists... </p>
                        ) :
                            (
                                <UserPlaylists playlists={userPlaylists.slice(0, 10)} />
                                /* userPlaylists.slice(0, 10).map((playlist) => (
                                    <Grid2 container key={playlist.id} xs={12} alignItems="center" sx={{ marginLeft: 3, mt: 1, mb: 1, p: 1 }}>
                                        <Grid2 xs={1}>
                                            <QueueMusicIcon />
                                        </Grid2>
                                        <Grid2 xs={11} sx={{ p: 1 }} >
                                            <a href={playlist.external_urls.spotify}>{playlist.name}</a>
                                        </Grid2>
                                    </Grid2>
                                )) */
                            )
                        }
                    </Grid2>
                </Box>
            </Box>
        </Box>
    )

}

export default UserLeftsidePanel;