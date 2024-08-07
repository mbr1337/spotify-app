import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AppBar, Avatar, Box, Container, Hidden, IconButton, Menu, MenuItem, SwipeableDrawer, Toolbar, Tooltip, Typography } from "@mui/material";
import { endpoints } from "../../endpoints";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserData, setRefreshToken } from '../../store';
import getApiConfig from "../../utils/axiosConfig";
import getRefreshToken from "../../utils/refreshToken";
import { Link } from "react-router-dom";
import theme from "../../theme/theme";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const settings = ['Profile', 'Logout'];


function UserHeader() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    // const [userData, setUserData] = useState(null);

    // const getNeffexData = async () => {
    //     try {
    //         const response = await axios.get("https://api.spotify.com/v1/artists/3z97WMRi731dCvKklIf2X6", getApiConfig(token));
    //         if (response.status === 200) {
    //             console.log(response.data);
    //         }
    //         if (response.status === 401) {
    //             // token = refreshToken();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(endpoints.user, getApiConfig(token));
                if (response.status === 200) {
                    // console.log(response.data);
                    dispatch(setUserData(response.data));
                }
                else {
                    console.error('Unexpected status code:', response.status);
                }
                if (response.status === 401) {
                    // getRefreshToken();
                }
            } catch (error) {
                console.error('Axios error:', error);
            }
        }
        // async function getneff() {
        //     const response = await axios.get(`https://api.spotify.com/v1/tracks/4Tk9smArBivB3ZQI8e0FXf`, getApiConfig(token));
        //     if (response.status === 200) {
        //         console.log('response.data', response.data);
        //     }
        // }
        getUserData();
        // getneff();
        // getNeffexData();
    }, [token, dispatch])


    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        dispatch(setToken('')); // Clear the token in the store
        // dispatch(setRefreshToken('')); 
        dispatch(setUserData(null));
        setAnchorElUser(null);
        window.location = '/login';
    };

    const [drawerState, setDrawerState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
    };

    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const items = [
        { icon: <PersonOutlinedIcon />, link: "/", text: "Home" },
        { icon: <PersonOutlinedIcon />, link: "./newReleases", text: "Made for You" },
        { icon: <MicNoneIcon />, link: "./favoriteArtists", text: "Favorite Artists" },
        { icon: <MusicNoteIcon />, link: "./favoriteSongs", text: "Favorite Songs" },
        { icon: <AlbumIcon />, link: "./albums", text: "Albums" },
    ];
    const items2 = [
        { icon: <QueueMusicIcon />, link: "./playlists", text: "Playlists" },
        { icon: <PodcastsIcon />, link: "./podcasts", text: "Podcasts" },
        { icon: <MicNoneIcon />, link: "./followedArtists", text: "Followed Artists" },
    ];

    return (
        <Box sx={{ p: 4, }}>
            {userData === null ?
                <p>Loading user data...</p>
                : (
                    <Box >
                        <AppBar sx={{ background: theme.palette.background.default, position: "absolute" }} >
                            <Container maxWidth={false} sx={{ overflow: "hidden" }}>
                                <Toolbar disableGutters sx={{ justifyContent: { xs: "space-between", lg: "flex-end" } }}>
                                    <Hidden lgUp>
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2 }}
                                            onClick={toggleDrawer('left', true)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <SwipeableDrawer
                                            PaperProps={{
                                                sx: {
                                                    backgroundColor: theme.palette.background.default,
                                                    width: "60%"

                                                }
                                            }}
                                            disableBackdropTransition={!iOS}
                                            disableDiscovery={iOS}
                                            anchor='left'
                                            open={drawerState.left}
                                            onClose={toggleDrawer('left', false)}
                                            onOpen={toggleDrawer('left', true)}
                                        >
                                            <Box>
                                                <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold", color: "white" }}>Discover</Typography>
                                                <Grid2 container>
                                                    {items.map((item, index) => (
                                                        <Grid2 key={index} xs={12} sx={{ marginLeft: 3, mt: 1 }} onClick={toggleDrawer('left', false)} >
                                                            <Grid2 container alignItems="center">
                                                                <Grid2 xs={1} sx={{ color: "white", m: 1 }}>
                                                                    {item.icon}
                                                                </Grid2>
                                                                <Grid2 p={1}>
                                                                    <Typography variant="h4">
                                                                        <Link to={item.link} className="hvr-underline-from-left">
                                                                            {item.text}
                                                                        </Link>
                                                                    </Typography>
                                                                </Grid2>
                                                            </Grid2>
                                                        </Grid2>
                                                    ))}
                                                </Grid2>
                                                <Typography variant="h3" sx={{ m: 2, fontWeight: "semi-bold", color: "white" }}>Library</Typography>
                                                <Grid2 container>
                                                    {items2.map((item, index) => (
                                                        <Grid2 key={index} xs={12} sx={{ marginLeft: 3, mt: 1 }} onClick={toggleDrawer('left', false)} >
                                                            <Grid2 container alignItems="center">
                                                                <Grid2 xs={1} sx={{ color: "white", m: 1 }}>
                                                                    {item.icon}
                                                                </Grid2>
                                                                <Grid2 p={1}>
                                                                    <Typography variant="h4">
                                                                        <Link to={item.link} className="hvr-underline-from-left">
                                                                            {item.text}
                                                                        </Link>
                                                                    </Typography>
                                                                </Grid2>
                                                            </Grid2>
                                                        </Grid2>
                                                    ))}
                                                </Grid2>
                                            </Box>
                                        </SwipeableDrawer>
                                    </Hidden>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                {userData.images && userData.images.length > 1 ? (
                                                    <Avatar alt={userData.display_name} src={userData.images[0].url} />
                                                ) : (
                                                    <Avatar alt={userData.display_name} />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {/* {settings.map((setting) => ( */}
                                            <MenuItem
                                                // key={setting}
                                                onClick={handleCloseUserMenu}>
                                                <Link style={{ color: "black" }} to='/profile'>
                                                    <Typography textAlign="center">{settings[0]}</Typography>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={logout}>
                                                <Typography textAlign="center">{settings[1]}</Typography>
                                            </MenuItem>
                                            {/* ))} */}
                                        </Menu>
                                    </Box>
                                </Toolbar>
                            </Container>
                        </AppBar>
                    </Box>
                )
            }
        </Box >
    );
}

export default UserHeader;