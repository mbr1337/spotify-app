import { Box, Fade, Skeleton, Typography, Zoom, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getApiConfig from "../../../utils/axiosConfig";
import { NavigateNext } from "@mui/icons-material";
import unknown_album_placeholder from '../../../imgs/unknown_album_placeholder.png';
function WelcomeComponent() {

    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData)

    const [topThreeSongs, setTopThreeSongs] = useState(null);
    const [topRandomThreeNewReleases, setTopRandomThreeNewReleases] = useState(null);
    const [mostRecentThreePlaylsits, setMostRecentThreePlaylsits] = useState(null);
    const [mostRecentSavedPodcastEpisodes, setMostRecentSavedPodcastEpisodes] = useState(null);
    const [topThreeArtists, setTopThreeArtists] = useState(null);
    const [topThreeArtistsSorted, setTopThreeArtistsSorted] = useState(null);

    useEffect(() => {
        const fetchData = async (url, setData) => {
            try {
                const response = await axios.get(url, getApiConfig(token));
                if (response.status === 200) {
                    setData(response.data.items);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const getRandomThreeNewReleases = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=3&offset=${Math.floor(Math.random() * 20)}`, getApiConfig(token));
                if (response.status === 200) {
                    // console.log("top three random new releases:", response.data.albums.items);
                    setTopRandomThreeNewReleases(response.data.albums.items);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const getTopThreeArtists = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=3`, getApiConfig(token));
                if (response.status === 200) {
                    const originalTopArtists = [...response.data.items];
                    const sortedTopArtists = response.data.items.sort((a, b) => {
                        const indexA = response.data.items.indexOf(a);
                        const indexB = response.data.items.indexOf(b);
                        const middleIndex = Math.floor(response.data.items.length / 2);

                        if (indexA === middleIndex) return -1;
                        if (indexB === middleIndex) return 1;
                        return 0;
                    });
                    console.log('originalTopArtists', originalTopArtists)
                    setTopThreeArtists(originalTopArtists);
                    console.log('sortedTopArtists', sortedTopArtists)
                    setTopThreeArtistsSorted([...sortedTopArtists]);

                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData('https://api.spotify.com/v1/me/top/tracks?limit=3', setTopThreeSongs);
        getRandomThreeNewReleases();
        fetchData('https://api.spotify.com/v1/me/playlists?limit=3', setMostRecentThreePlaylsits);
        fetchData('https://api.spotify.com/v1/me/episodes?limit=3', setMostRecentSavedPodcastEpisodes);
        getTopThreeArtists();

    }, [token]);

    const DisplayItems = ({ items, renderItem }, index) => (
        <Box sx={{
            display: "flex", flexDirection: "row", flexWrap: "wrap",
            '@media (min-width: 600px)': {
                flexWrap: "nowrap", // Set back to nowrap for larger screens
            },
        }}>
            {items && items.length > 0 ? items.map((item, index) => renderItem(item, index)) : <Typography variant="h5" p={1} m={1}>No data</Typography>}
        </Box>
    );
    const sections = [
        {
            title: "Top songs",
            items: topThreeSongs,
            route: "/favoriteSongs",
            renderItem: (song, index) => (
                <React.Fragment key={song.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
                            {song.album.images[0] ? (
                                <img src={song.album.images[0].url} alt={song.name} className="responsiveIMG" />
                            ) : (
                                <img src={unknown_album_placeholder} alt={song.name} className="responsiveIMG" />
                            )}
                            <Typography p={1} variant='h4' sx={{ textAlign: "center" }}>{song.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            )
        },
        {
            title: "Trending",
            items: topRandomThreeNewReleases,
            route: "/newReleases",
            renderItem: (release, index) => (
                <React.Fragment key={release.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: 1 }}>
                            {release.images[0] ? (
                                <img src={release.images[0].url} alt={release.name} className="responsiveIMG" />
                            ) : (
                                <img src={unknown_album_placeholder} alt={release.name} className="responsiveIMG" />
                            )}
                            <Typography p={1} variant='h4' sx={{ textAlign: "center" }}>{release.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            )
        },
        {
            title: "New playlists", items: mostRecentThreePlaylsits, route: "/playlists", renderItem: (playlist, index) => (
                <React.Fragment key={playlist.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px", width: "100%" }}>
                            {playlist.images[0] ? (
                                <img className="responsiveIMG" src={playlist.images[0].url} alt={playlist.name} ></img>
                            ) : (
                                <img className="responsiveIMG" src={unknown_album_placeholder} alt={playlist.name} ></img>
                            )}
                            <Typography p={1} variant='h4' sx={{ textAlign: "center" }}>{playlist.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            )
        },
        {
            title: "Top artists",
            items: topThreeArtistsSorted,
            route: "/favoriteArtists",
            renderItem: (artist, index) => (
                <React.Fragment key={artist.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "10px",
                        }}>
                            {artist.images[0] ? (
                                <img
                                    src={artist.images[0].url}
                                    alt={artist.name}
                                    className={index === 1 ? "responsiveIMG podium" : "responsiveIMG"}
                                    style={{
                                        transform: index === 0 ? "rotate(345deg)" : index === 1 ? "rotate(0deg) translateY(-20px)" : index === 2 ? "rotate(15deg)" : "none",
                                        border: index === 0 ? "solid 3px silver" : index === 1 ? "solid 4px gold" : index === 2 ? "solid 3px #765341" : "none",
                                        zIndex: index === 1 ? 2 : 1
                                    }}
                                />
                            ) : (
                                <img className="responsiveIMG" src={unknown_album_placeholder} alt={artist.name} ></img>
                            )}

                            <Typography mt={4} variant='h4' sx={{ textAlign: "center" }}>{artist.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            ),
        },
        {
            title: "Top artists ",
            items: topThreeArtists,
            route: "/favoriteArtists",
            renderItem: (artist, index) => (
                <React.Fragment key={artist.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "10px",
                        }}>
                            {artist.images[0] ? (
                                <img
                                    src={artist.images[0].url}
                                    alt={artist.name}
                                    className={index === 0 ? "responsiveIMG podiumGlow" : "responsiveIMG"}
                                    style={{
                                        border: index === 1 ? "solid 3px silver" : index === 0 ? "solid 4px gold" : index === 2 ? "solid 3px #765341" : "none",
                                    }}
                                />
                            ) : (
                                <img className="responsiveIMG" src={unknown_album_placeholder} alt={artist.name} ></img>
                            )}

                            <Typography mt={4} variant='h4' sx={{ textAlign: "center" }}>{artist.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            ),
        },
        {
            title: "Recently added episodes", items: mostRecentSavedPodcastEpisodes, route: "/podcasts", renderItem: ({ episode }, index) => (
                <React.Fragment key={episode.id}>
                    <Zoom
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${400 + index * 250}ms` }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
                            {episode.images[0] ? (
                                <img src={episode.images[0].url} alt={episode.name} className="responsiveIMG" />
                            ) : (
                                <img className="responsiveIMG" src={unknown_album_placeholder} alt={episode.name} ></img>
                            )}
                            <Typography p={1} variant='h4' sx={{ textAlign: "center" }}>{episode.name}</Typography>
                        </Box>
                    </Zoom>
                </React.Fragment>
            )
        },
    ];

    const isSmallScreen = useMediaQuery("(max-width:600px)");

    return (
        <>
            {userData.length === 0 ? (
                <Skeleton variant="text"></Skeleton>
            ) : (
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    Welcome, {userData.display_name}
                </Typography>
            )}
            <Box>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} lg={6}>
                        {sections.slice(0, 3).map(({ title, items, route, renderItem }) => (
                            <Grid2 container key={title} sx={{ p: 2 }}>
                                <Fade
                                    in={true}
                                    timeout={1000}
                                    className="gridItem"
                                >
                                    <Link to={route}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography variant="h3" p={1}>{title}</Typography>
                                            <Typography variant="h4" p={1}>View all<NavigateNext sx={{}} /></Typography>
                                        </Box>
                                        <DisplayItems items={items} renderItem={renderItem} />
                                    </Link>
                                </Fade>

                            </Grid2>
                        ))}
                    </Grid2>
                    {/* Conditionally render the second "Top artists" section on small screens */}
                    {isSmallScreen && (
                        <Grid2 xs={12} lg={6}>
                            {sections.slice(4).map(({ title, items, route, renderItem }) => (
                                <Grid2 container key={title} sx={{ p: 2 }}>
                                    <Fade
                                        in={true}
                                        timeout={1000}
                                        className="gridItem"
                                    >
                                        <Link to={route}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="h3" p={1}>{title}</Typography>
                                                <Typography variant="h4" p={1}>View all<NavigateNext sx={{}} /></Typography>
                                            </Box>
                                            <DisplayItems items={items} renderItem={renderItem} />
                                        </Link>
                                    </Fade>
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                    <Grid2 xs={12} lg={6}>
                        {!isSmallScreen && (
                            <Grid2 xs={12} lg={6}>
                                {sections.slice(3).map(({ title, items, route, renderItem }) => (
                                    title !== "Top artists " && (
                                        <Grid2 container key={title} sx={{ p: 2 }}>
                                            <Fade
                                                in={true}
                                                timeout={1000}
                                                className="gridItem"
                                            >
                                                <Link to={route}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                        <Typography variant="h3" p={1}>{title}</Typography>
                                                        <Typography variant="h4" p={1}>View all<NavigateNext sx={{}} /></Typography>
                                                    </Box>
                                                    <DisplayItems items={items} renderItem={renderItem} />
                                                </Link>
                                            </Fade>
                                        </Grid2>
                                    )
                                ))}
                            </Grid2>
                        )}
                    </Grid2>

                </Grid2>
            </Box>
        </>
    );
};

export default WelcomeComponent;