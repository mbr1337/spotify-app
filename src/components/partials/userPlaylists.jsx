import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function UserPlaylists({ playlists }) {

    return (
        <>
            {
                playlists.map((playlist) => (
                    <Grid2 container key={playlist.id} xs={12} alignItems="center" sx={{ marginLeft: 2, mt: 1, mb: 1, p: 1 }} data-testid="playlists">
                        <Grid2 xs={1}>
                            <QueueMusicIcon />
                        </Grid2>
                        <Grid2 xs={11} sx={{ p: 1 }} >
                            <Typography variant="h3">
                                {/* <a href={playlist.external_urls.spotify}>{playlist.name}</a> */}
                                <Link to={`spotify/playlist/${playlist.id}`} >{playlist.name}</Link>
                            </Typography>
                        </Grid2>
                    </Grid2>
                ))
            }
        </>
    );

}

export default UserPlaylists;