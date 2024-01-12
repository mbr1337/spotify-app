import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { endpoints } from '../../../endpoints';
import getApiConfig from '../../../utils/axiosConfig';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AddCircleOutlineRounded, CheckCircleRounded } from '@mui/icons-material';
function PodcastEpisodes() {
    const { podcast_id } = useParams();
    console.log("podcast id:", podcast_id);
    const token = useSelector((state) => state.auth.token);
    const [episodes, setEpisodes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoints.showEpisode + podcast_id, getApiConfig(token));
                if (response.status === 200) {
                    const allEpisodes = [];
                    const filteredEpisodes = [];

                    allEpisodes.push(...response.data.items);

                    let nextUrl = response.data.next;
                    while (nextUrl) {
                        const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                        if (nextResponse.status === 200) {
                            allEpisodes.push(...nextResponse.data.items);
                            nextUrl = nextResponse.data.next;
                        } else {
                            break;
                        }
                    }

                    console.log('allEpisodes: ', allEpisodes);

                    // Filter out null items and then apply the fully_played filter
                    filteredEpisodes.push(...allEpisodes
                        .filter(episode => episode && episode.resume_point)
                        .filter(episode => episode.resume_point.fully_played === false)
                    );

                    // console.log('filteredEpisodes: ', filteredEpisodes);

                    const episodesWithSavedProperty = await Promise.all(
                        filteredEpisodes.map(async (element) => {
                            const response = await axios.get(endpoints.checkSavedEpisodes + element.id, getApiConfig(token));

                            // Assuming there is a property like 'isSaved' in the response data
                            const saved = response.data[0] || false;

                            // Add the 'watched' property to the element
                            return { ...element, saved };
                        })
                    );
                    console.log('episodesWithSavedProperty: ', episodesWithSavedProperty);

                    setEpisodes(episodesWithSavedProperty);
                    // setEpisodes(filteredEpisodes);

                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {episodes ? (
                <Box>
                    <Grid2 container spacing={2}>
                        {episodes.map((episode) => (
                            <React.Fragment key={episode.id}>
                                <Grid2 xs={3}>
                                    <img className='playlistCards' src={episode.images[0].url}></img>
                                </Grid2>
                                <Grid2 xs={8}>
                                    <Grid2 container spacing={2} sx={{}}>
                                        <Grid2 xs={12}>
                                            <Typography variant='h3'>
                                                {episode.name}
                                            </Typography>
                                        </Grid2>
                                        <Grid2 xs={12}>
                                            <Typography variant='h6'>
                                                {episode.description}
                                            </Typography>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                                <Grid2 xs={1}>
                                    {episode.saved ? (
                                        <CheckCircleRounded />
                                    ) : (
                                        <AddCircleOutlineRounded />
                                    )}
                                </Grid2>
                            </React.Fragment>
                        ))}


                    </Grid2>
                </Box>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default PodcastEpisodes;