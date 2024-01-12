import { Box, Typography, Zoom, useMediaQuery } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { endpoints } from '../../endpoints';
import getApiConfig from '../../utils/axiosConfig';
import { NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import theme from '../../theme/theme';

function UserProfile() {
    const userData = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.auth.token);
    console.log(userData);
    const [artistsCounts, setArtistsCounts] = useState(null);
    const [userPlaylistCounts, setUserPlaylistsCounts] = useState(null);
    useEffect(() => {
        async function getFollowedArtists() {
            try {
                const response = await axios.get(endpoints.userFollowedArtists, getApiConfig(token));
                if (response.status === 200) {


                    setArtistsCounts(response.data.artists.total);
                }
                if (response.status === 401) {
                }
            } catch (error) {
                console.error(error);
            }
        }
        async function getUserPlaylists() {
            try {
                const response = await axios.get(endpoints.userPlaylists, getApiConfig(token));
                if (response.status === 200) {
                    console.log(response.data);
                    setUserPlaylistsCounts(response.data.total);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getFollowedArtists();
        getUserPlaylists();
    }, [token]);
    const isMediumScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Typography textAlign={'center'} p={1} pb={3} variant='h2'>Profile</Typography>
            {userData.length !== 0 ? (
                <Zoom in={true} timeout={500}>
                    <Box>
                        <Grid2 container>
                            <Grid2 item xs={12} md={3}>
                                <Box sx={{ textAlign: "center" }} >
                                    <img className='responsiveIMG' src={userData.images[1].url} alt={userData.display_name}></img>
                                </Box>
                            </Grid2>
                            <Grid2 item xs={12} md={9} container>
                                <Grid2 xs={12} md={12}>
                                    <Typography sx={{
                                        textAlign: 'center',
                                        '@media (min-width:600px)': {
                                            textAlign: 'left',
                                        },
                                    }} variant='h3' p={1}>{userData.display_name}</Typography>
                                </Grid2>
                                <Grid2 item xs={4} md={12}>
                                    <Typography variant='h5' p={1}>Followers: {userData.followers.total}</Typography>
                                </Grid2>
                                <Grid2 item xs={4} md={12}>
                                    <Link to="/followedArtists">
                                        <Typography variant='h5' p={1}>Followed artists: {artistsCounts ? artistsCounts : ""} <NavigateNext /></Typography>
                                    </Link>
                                </Grid2>
                                <Grid2 item xs={4} md={12}>
                                    <Link to="/playlists">
                                        <Typography variant='h5' p={1}>Playlists: {userPlaylistCounts ? userPlaylistCounts : ""} <NavigateNext /></Typography>
                                    </Link>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Zoom>
            ) : (
                <>Loading...</>
            )}
        </>
    )
}

export default UserProfile