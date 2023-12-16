import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Divider, Fade, Skeleton, Typography, Zoom } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { endpoints } from "../../../endpoints";
import { useSelector } from "react-redux";
import getApiConfig from "../../../utils/axiosConfig";
import { Link } from "react-router-dom";


export function truncateString(str, maxLength) {
    if (str == null || str === undefined) {
        return '';
    }
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + '...';
    } else {
        return str;
    }
}

function UserPlaylists() {

    const token = useSelector((state) => state.auth.token);
    const [userPlaylists, setUserPlaylists] = useState(null);

    useEffect(() => {
        async function getUserPlaylists() {
            try {
                const response = await axios.get(endpoints.userPlaylists, getApiConfig(token));
                if (response.status === 200) {
                    console.log(response.data);
                    setUserPlaylists(response.data.items);
                    const allPlaylists = [];
                    if (response.data.items) {
                        allPlaylists.push(...response.data.items);

                        let nextUrl = response.data.next;
                        while (nextUrl) {
                            const nextResponse = await axios.get(nextUrl, getApiConfig(token));
                            if (nextResponse.status === 200) {
                                console.log("fetching next 50 playlists...");
                                console.log("next playlists: ", nextResponse.data.items);
                                allPlaylists.push(...nextResponse.data.items);
                                nextUrl = nextResponse.data.next;
                            } else {
                                break;
                            }
                        }
                    }
                    setUserPlaylists(allPlaylists);
                }

            } catch (error) {
                console.error(error);
            }
        }

        getUserPlaylists();
    }, [])

    useEffect(() => {
        console.log("overall playlists:", userPlaylists);

    }, [userPlaylists]);

    return (
        <>
            {userPlaylists ?
                <Grid2 container spacing={2} >
                    {userPlaylists.map((playlist, index) => (
                        <Zoom
                            in={true}
                            key={playlist.id}
                            style={{ transitionDelay: `${500 + (Math.floor(Math.random()) * 100)}ms` }}
                            timeout={500}
                        >
                            <Grid2 xs={6} sm={4} md={3} lg={2} sx={{ textAlign: "center" }} className="gridItem">
                                <Link to={`/singularPlaylist/${playlist.id}`}>
                                    <Grid2 xs={12} >
                                        {playlist.images ? (
                                            <img className="playlistCards" src={playlist?.images[0]?.url} alt={playlist.name}></img>
                                        ) : (
                                            <></>
                                        )}
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <Typography variant="h4" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {playlist.name}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        {/* <Divider sx={{ background: "gray", m: 2, width: "100%" }}></Divider> */}
                                        <hr></hr>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <Typography variant="h6">
                                            {playlist.description ? truncateString(playlist.description, 40) : "No description provided."}
                                        </Typography>
                                    </Grid2>
                                </Link>
                            </Grid2>
                        </Zoom>
                    ))}
                </Grid2>
                : (
                    <Grid2 container spacing={2}>
                        {[...Array(27)].map((_, index) => (
                            <Fade
                                in={true}
                                timeout={500}
                                key={index}
                            >
                                <Grid2 xs={6} sm={4} lg={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Skeleton variant="rectangular" width="85%" height={200} sx={{ bgcolor: 'grey.900', borderRadius: "10%" }} />
                                    <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                    <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                    <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: 'grey.800' }} />
                                </Grid2>
                            </Fade>
                        ))}
                    </Grid2>
                )}
        </>
    );


}

export default UserPlaylists;