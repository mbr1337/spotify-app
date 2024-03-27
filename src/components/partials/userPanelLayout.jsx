import { Hidden } from "@mui/material";
import React from "react";
import UserHeader from "./userHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserLeftsidePanel from "./userLeftsidePanel";
import { useLocation } from 'react-router-dom';
import WelcomeComponent from "./dynamic/welcomeComponent";
import theme from "../../theme/theme";

function UserPanelLayout({ children }) {
    const location = useLocation();
    const isMainRoute = location.pathname === '/';
    return (
        <>
            <UserHeader />
            <Grid2 container sx={{ p: 2 }}>
                <Hidden lgDown>
                    <Grid2 xs={0} lg={3} sx={{ background: theme.palette.background.dimmed, borderRadius: 5, boxShadow: 10, height: "90vh", overflowY: 'auto' }}>
                        <UserLeftsidePanel />
                    </Grid2>
                </Hidden>
                <Grid2 xs={0} lg={1}></Grid2>
                <Grid2 xs={12} lg={8} sx={{ background: theme.palette.background.dimmed, borderRadius: 5, boxShadow: 10, p: 3, height: "90vh", overflowY: 'auto' }}>
                    {isMainRoute && <WelcomeComponent />}
                    {children}
                </Grid2>
            </Grid2>
        </>
    );
    {/* 
    TODO:
        podcasts skeletons + podcasT skeletons
        made for you za duże
        saved albums bubble chart za duże bubble, pominąc na mobilkach ? + zmniejszyć bąbelki algorytmem
        Podcasts - wiadomość gdy użytkownik widział już wszystkie odcinki podcastu 
        top tracks - jesli nie bedzie genre to lg = 12 :v
        hover effect jak na playlsitach do podcastow 

        https://developer.spotify.com/documentation/web-api/reference/save-episodes-user
        refresh token
        odświeżanie linku pojedynczej playlisty wywala błąd cannot GET /playlist/id
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
        Podcasts jsx + fetch na next. Pokazanie wszystkich podcastów, bez konkretnych odcinków, tylko obrazek + nazwa. Po kliknieciu wejscie na podcast + zapisane odcinki
        endpoint na spotify shows/show oraz playlist - endpoints.js
        https://developer.spotify.com/documentation/web-api/reference/check-users-saved-episodes 
        inny wygląd na mobilkach 2/2 TODO: hamburger zamiast leftsidepanel - app bar https://mui.com/material-ui/react-app-bar/
        playlist imgs - stały rozmiar 
        Strona powitalna - Home - dashboard - top 3 artystci, top 3 kawalki, top 3 polecane nowe kawalki, najnowsze 3 playlisty, 3 najnowsze zapisane podcasty
        top 3 "karty" na podium
        zabezpieczenie przed brakiem - na home
        home - responsywność na mobilkach (grid)
        followedArtists - fetch na next
        wytlumaczenie popularity - pytajnik który wyjasnia termin po najechaniu / kliknięciu https://mui.com/material-ui/react-tooltip/
        mniejsza czcionka
        podrasowac user profile - ilość playlist, ilość obserwowanych artystów, ilość obserwujących, - layout
        na mobilkach top three artists bez efektów, reorder, tylko glow
        albums jsx fetch na next
        Albums jsx - bubble chart - na X jest od 1 do 12 (miesiące), na Y nazwa albumu i rozmiar bąbelka zależy od artist popularity - https://react-chartjs-2.js.org/components/bubble https://codesandbox.io/p/devbox/reactchartjs-react-chartjs-2-default-ml3qo?file=%2FApp.tsx 
        pie charty obok siebie, legenda
        scrollowanie wewnatrz contenera a nie stroną 
        placeholder image na playlsite bez obrazka
        zabezpieczyc images gdyby nie bylo dla utworu, artysty
        zabezpieczyć home gdyby nie było itemków
        100vh ale na mobilkach bez
        podcasts padding 
    


     */}
}

export default UserPanelLayout;