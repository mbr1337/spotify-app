import { Container, Typography } from "@mui/material";
import React from "react";
import UserHeader from "./userHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserLeftsidePanel from "./userLeftsidePanel";
import { useLocation } from 'react-router-dom';
import WelcomeComponent from "./dynamic/welcomeComponent";
import { useSelector } from "react-redux";

function UserPanelLayout({ children }) {
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    const isMainRoute = location.pathname === '/';
    return (
        <Container maxWidth={false} disableGutters>
            <UserHeader />
            <Grid2 container sx={{ m: 2 }}>
                <Grid2 xs={3} sx={{ background: "rgb(30 30 30)", borderRadius: 5, boxShadow: 10, height: "50%" }}>
                    <UserLeftsidePanel />
                </Grid2>
                <Grid2 xs={1}></Grid2>
                <Grid2 xs={8} sx={{ background: "rgb(30 30 30)", borderRadius: 5, boxShadow: 10, p: 3 }}>
                    {isMainRoute &&  <WelcomeComponent />}
                    {children}
                </Grid2>
            </Grid2>
        </Container>
    );
    {/* TODO:
    testy 
    Strona powitalna 
    instalacja redux'a - DONE
    Dynamiczne i statyczne renderowanie komponentów - DONE
    Top artists i top songs - dodać statystyki - 1/2
    skeleton
    userFavTracks - layout zdjęć
    font nie działa na typography - theme
    Albums jsx
    Podcasts jsx
    playlists jsx
    SEO
    inny wygląd na mobilkach

    https://create-react-app.dev/docs/running-tests/

    
     */}

    {/* <WebPlayback token={token} /> */ }
    {/* <FollowedArtistList token={token} /> */ }
    {/* <NewReleases token={token} /> */ }
    {/* <SavedEpisodes token={token} /> */ }
}

export default UserPanelLayout;