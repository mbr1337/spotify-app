import React, { useEffect, useState } from "react";
import axios from 'axios';
import { endpoints } from "../../../endpoints";
import { useSelector } from "react-redux";
function SavedEpisodes() {

    const token = useSelector((state) => state.auth.token);

    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }
    const [episodes, setEpisodes] = useState([]);



    useEffect(() => {
        async function getEpisodes() {
            try {
                const response = await axios.get(endpoints.userEpisodes, config);
                if (response.status === 200) {
                    // console.log(response.data);
                    setEpisodes(response.data.items);
                }
                if (response.status === 401) {

                }
            } catch (error) {
                console.error(error);
            }
        }
        getEpisodes();
    }, []);

    return (
        <div>
            <h2>Saved Episodes</h2>
            <div className="episodeList">
                {episodes === null ? <p>Loading Data...</p> : (
                    episodes.map((singularEpisode) => (
                        <div key={singularEpisode.episode.id} className="episodeCard">
                            <a href={singularEpisode.episode.external_urls.spotify} target="_blank">
                                <img src={singularEpisode.episode.images[1].url} alt={singularEpisode.episode.name} />
                            </a>
                            <p>Name: {singularEpisode.episode.name}</p>
                            <p>Descripion: {singularEpisode.episode.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}

export default SavedEpisodes;
