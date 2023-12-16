import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { endpoints } from "../../endpoints";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserData, setRefreshToken } from '../../store';
import getApiConfig from "../../utils/axiosConfig";
import getRefreshToken from "../../utils/refreshToken";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
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
        getUserData();
        // getNeffexData();
    }, [dispatch])


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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

    return (
        <Box sx={{ p: 4, }}>
            {userData === null ?
                <p>Loading user data...</p>
                : (
                    <Box >
                        <AppBar sx={{ background: "rgb(30, 30, 30)", position: "absolute" }} >
                            <Container maxWidth={false} sx={{ overflow: "hidden" }}>
                                <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
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

                )}

        </Box>
    );
}

export default UserHeader;