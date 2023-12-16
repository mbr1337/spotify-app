import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { endpoints } from '../../../endpoints';
import getApiConfig from '../../../utils/axiosConfig';
function Episode() {
    const episode_id = useParams();
    console.log(episode_id);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.spotify.com/v1/shows/" + episode_id, getApiConfig(token));
                if (response.status === 200) {
                    console.log("Episode response data: ", response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>Episode</div>
    )
}

export default Episode