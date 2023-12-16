import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getApiConfig from '../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../../endpoints';
import { Box, Divider, Skeleton, Typography, Zoom } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ArtistPieChart from './favArtistsPieChart';

function Playlist() {
    const { playlist_id } = useParams();
    const token = useSelector((state) => state.auth.token);
    const [playlist, setPlaylist] = useState(null);
    const [playlistTracks, setPlaylistTracks] = useState(null);
    const [artistCounts, setArtistCounts] = useState({});
    const [artistsForChart, setArtistsForChart] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const allTracks = [];
            try {
                const response = await axios.get(playlist_id, getApiConfig(token));
                if (response.status === 200) {
                    console.log('Playlist data:', response.data);
                    setPlaylist(response.data);
                    console.log("playlist tracks: ", response.data.tracks.items);

                    if (allTracks.length === 0) {
                        console.log('Playlist is empty.');
                        // Handle empty playlist (e.g., set appropriate state, render a message, etc.)
                    }

                    if (response.data.tracks.items) {
                        allTracks.push(...response.data.tracks.items);

                        let nextUrl = response.data.tracks.next;
                        while (nextUrl) {
                            const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                            if (nextResponse.status === 200) {
                                console.log("fetching next 100 tracks...");
                                console.log("next tracks: ", nextResponse.data.items);
                                allTracks.push(...nextResponse.data.items);
                                nextUrl = nextResponse.data.next;
                            } else {
                                break;
                            }
                        }
                    }

                    const totalTracks = allTracks.length;
                    const counts = [];
                    allTracks.forEach(({ track }) => {
                        if (track.artists) {
                            track.artists.forEach((artist) => {
                                if (artist.name) {
                                    const label = artist.name;
                                    const existingArtist = counts.find((entry) => entry.label === label);
                                    const href = artist.href;

                                    if (existingArtist) {
                                        existingArtist.value += 1;
                                    } else {
                                        counts.push({ value: 1, label, href });
                                    }
                                }
                            });
                        }
                    });

                    const sortedCounts = counts.sort((a, b) => b.value - a.value);

                    // // Calculate the percentage for each artist
                    // const artistsWithPercentage = sortedCounts.map((artist) => ({
                    //     ...artist,
                    //     percentage: (artist.value / totalTracks) * 100,
                    // }));


                    // // Group artists with a percentage below a certain threshold into "Others"
                    // const threshold = 1; // You can adjust this threshold as needed
                    // const groupedArtists = artistsWithPercentage.reduce((acc, artist) => {
                    //     if (artist.percentage >= threshold) {
                    //         acc.push(artist);
                    //     } else {
                    //         const othersEntry = acc.find((entry) => entry.label === 'Others');
                    //         if (othersEntry) {
                    //             othersEntry.value += artist.value;
                    //         } else {
                    //             acc.push({ label: 'Others', value: artist.value });
                    //         }
                    //     }
                    //     return acc;
                    // }, []);

                    // const sortedGroupedArtists = groupedArtists.sort((a, b) => b.value - a.value);

                    // setArtistCounts(sortedGroupedArtists);
                    // setArtistsForChart(sortedGroupedArtists);
                    // console.log("sorted Counts array: ", sortedGroupedArtists);


                    setArtistCounts(sortedCounts);
                    if (sortedCounts.length > 0) {
                        setArtistsForChart(sortedCounts.slice(0, 10));
                        sortedCounts.slice(0, 10).forEach(async ({ href }, index) => {
                            console.log(index, 'link:', href)
                            const response = await axios.get(href, getApiConfig(token));
                            if (response.status === 200) {
                                if (response.data.genres) {
                                    setArtistsForChart((prevArtistsForChart) => {
                                        return prevArtistsForChart.map((artist) => {
                                            if (artist.href === href) {
                                                return {
                                                    ...artist,
                                                    genres: response.data.genres,
                                                };
                                            }
                                            return artist;
                                        });
                                    });
                                }
                            }
                        });
                    }
                    console.log("sorted Counts array: ", sortedCounts);

                    // // Fetch genres for all artists in sortedGroupedArtists
                    // await Promise.all(sortedGroupedArtists.map(async ({ href }) => {
                    //     try {
                    //         const response = await axios.get(href, getApiConfig(token));
                    //         if (response.status === 200 && response.data.genres) {
                    //             setArtistsForChart((prevArtistsForChart) => {
                    //                 return prevArtistsForChart.map((artist) => {
                    //                     if (artist.href === href) {
                    //                         return {
                    //                             ...artist,
                    //                             genres: response.data.genres,
                    //                         };
                    //                     }
                    //                     return artist;
                    //                 });
                    //             });
                    //         }
                    //     } catch (error) {
                    //         console.error(error);
                    //     }
                    // }));


                    setPlaylistTracks(allTracks);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [playlist_id, token]);


    useEffect(() => {
        console.log("artistsForChart:", artistsForChart);
    }, [artistsForChart]);

    return (
        <>
            {/* {playlistTracks && playlistTracks.length === 0 ? ( */}
            {playlist ? (
                <>
                    {playlistTracks && playlistTracks.length !== 0 && (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <ArtistPieChart artistCounts={artistsForChart} labelField='label' />
                            </Box>
                            {/* Conditionally render the second pie chart */}
                            {artistsForChart && artistsForChart.length > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <ArtistPieChart artistCounts={artistsForChart} useGenre arcLabel={false} />
                                </Box>
                            )}
                        </>
                    )}
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ m: "auto", textAlign: "center" }}>
                            <Grid2 container spacing={2}>
                                <Grid2 xs={2} >
                                    {playlist && playlist.images && playlist.images.length > 0 ? (
                                        <img src={playlist.images[0].url} alt={playlist.name} className='playlistCards' />
                                    ) : (
                                        <img src="" alt={playlist.name} className='playlistCards' />
                                    )}
                                </Grid2>
                                <Grid2 xs={10} sx={{ mt: 2 }}>
                                    <Typography variant='h2'>{playlist.name}</Typography>
                                    <Typography variant='h3' sx={{ mt: 2 }}>Followers: {playlist.followers.total}</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                        <Divider sx={{ background: "gray", m: 2 }}></Divider>
                        <Grid2 container>
                            {playlistTracks && playlistTracks.length !== 0 ? playlistTracks.map(({ track }) => (
                                <React.Fragment key={track.uri}>
                                    <Grid2 xs={2}>
                                        <img src={track.album.images[0]?.url} className='playlistCards'></img>
                                    </Grid2>
                                    <Grid2 xs={10} sx={{ pl: 2, m: "auto" }}>
                                        <Typography variant='h5'>{track.name}</Typography>
                                        <Typography variant="h6">
                                            {track.artists && track.artists.map((artist, artistIndex) => (
                                                <span key={artist.id}>
                                                    {artist.name}
                                                    {artistIndex < track.artists.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </Typography>
                                    </Grid2>
                                </React.Fragment>
                            )) : (
                                <Typography variant="h5" >
                                    This playlist has no tracks.
                                </Typography>
                            )}
                        </Grid2>
                    </Box>
                </>
            ) : (
                <Box sx={{ p: 2 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={2} >
                            <Skeleton variant='rounded' animation="wave" height="100%" sx={{ borderRadius: "10%" }} ></Skeleton>
                        </Grid2>
                        <Grid2 xs={10} sx={{ m: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Skeleton variant='text' width="60%" sx={{ bgcolor: 'grey.800' }}></Skeleton>
                            <Skeleton variant='text' width="30%" sx={{ bgcolor: 'grey.800', mt: 2 }}></Skeleton>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ background: "gray", m: 2 }}></Divider>
                    <Grid2 container spacing={2}>
                        {[...Array(9)].map((index) => (
                            <React.Fragment key={index}>
                                <Grid2 xs={2} >
                                    <Skeleton variant='rounded' animation="wave" height="100%" sx={{ borderRadius: "10%" }} ></Skeleton>
                                    {/* <img src={track.album.images[0]?.url} className='playlistCards'></img> */}
                                </Grid2>
                                <Grid2 xs={10} sx={{ pl: 2, m: "auto" }}>
                                    <Skeleton variant='text' width="30%" sx={{ bgcolor: 'grey.800' }}></Skeleton>
                                    {/* <Typography variant='h5'>{track.name}</Typography> */}
                                    <Skeleton variant='text' width="15%" sx={{ bgcolor: 'grey.800' }}></Skeleton>
                                </Grid2>
                            </React.Fragment>
                        ))}
                    </Grid2>
                </Box>
            )
            }
        </>
    );
}

export default Playlist;
