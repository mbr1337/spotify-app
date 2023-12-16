import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function WelcomeComponent() {

    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData)
    const routes = [
        "/followedArtists",
        "/favoriteArtists",
        "/favoriteSongs",
        "/newReleases",
        "/playlists",
        "/albums",
        "/podcasts",
    ];

    const getRandomRoute = () => {
        const randomIndex = Math.floor(Math.random() * routes.length);
        return routes[randomIndex];
    };

    return (
        <>
            {userData.length === 0 ?
                <p>loading</p>
                : (
                    <Box sx={{ textAlign: "center" }}>
                        <Typography>
                            Welcome, {userData.display_name}
                        </Typography>
                        <Button><Link className="btn-spotify hvr-underline-from-left" to={getRandomRoute()}>Let's get started</Link></Button>
                    </Box>

                )}
        </>
    );
}

export default WelcomeComponent;