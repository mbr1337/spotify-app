import { Box, Container } from "@mui/material";
import React from "react";
import UserHeader from "./userHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserLeftsidePanel from "./userLeftsidePanel";
import { useLocation } from 'react-router-dom';
import WelcomeComponent from "./dynamic/welcomeComponent";

function UserPanelLayout({ children }) {
    const location = useLocation();
    const isMainRoute = location.pathname === '/';
    return (
        <Container maxWidth={false} disableGutters>
            <UserHeader />
            <Grid2 container sx={{ p: 2 }}>
                <Grid2 xs={3} sx={{ background: "rgb(35 35 35)", borderRadius: 5, boxShadow: 10 }}>
                    <UserLeftsidePanel />
                </Grid2>
                <Grid2 xs={1}></Grid2>
                <Grid2 xs={8} sx={{ background: "rgb(35 35 35)", borderRadius: 5, boxShadow: 10, p: 3, height: "100%" }}>
                    {isMainRoute && <WelcomeComponent />}
                    {children}
                </Grid2>
            </Grid2>
        </Container>
    );
    {/* 
    TODO:
        Strona powitalna 
        Podcasts jsx + fetch na next. Pokazanie wszystkich podcastów, bez konkretnych odcinków, tylko obrazek + nazwa. Po kliknieciu wejscie na podcast + zapisane odcinki
        inny wygląd na mobilkach 1/2 TODO: hamburger zamiast leftsidepanel
        refresh token
        Favorite artists - top 3 "karty" na podium + zabezpieczenie przed brakiem
        followedArtists - fetch na next
        wytlumaczenie popularity - pytajnik który wyjasnia termin po najechaniu / kliknięciu
        podrasowac user profile
        column chart - ile albumów w każdym miesiącu ktoś dodał - 12 miesięcy wstecz oraz drugi chart który pokazuje podsumowanie roczne-wieloroczne
        Albums jsx - bubble chart - na X jest od 1 do 12 (miesiące), 
        ----
        albums jsx -> album jsx z konkretnymi trackami z albumu?
        favorite artists -> favorite artist jsx z jego danymi?
        SEO


    DONE: 
        instalacja redux'a 
        Dynamiczne i statyczne renderowanie komponentów 
        userFavTracks - layout zdjęć 
        userFavTracks, userAlbums - obsługa wielu imion artystów (,) 
        Albums jsx 
        zamiana imagelist na grid 
        zamienic na grid 2 - new releases 
        skeleton 
        hover na playlistach i utworach
        user profile jsx
        logout
        playlists jsx
        dynamiczne dopasowanie wysokosci komponentu z dynamicznymi dziećmi 
        top songs - dodać statystyki - 2/2 DONE i zabezpieczyc gdyby nie było tracków
        playlist i top songs - jak nie ma genre to nie wyswietlaj charta
        Favorite songs - pie chart z gatunkami 
        skeleton dla playlists
        podcasts jsx 1/2 
        refactor backendu
        testy
    
     */}
}

export default UserPanelLayout;