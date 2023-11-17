import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { endpoints } from "../../../endpoints";
import { useSelector } from "react-redux";


function UserPlaylists() {

    const token = useSelector((state) => state.auth.token);
    const [userPlaylists, setUserPlaylists] = useState([]);


    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    }

    useEffect(() => {
        async function getUserPlaylists() {
            try {
                const response = await axios.get(endpoints.userPlaylists, config);
                if (response.status === 200) {
                    // console.log(response.data);
                    setUserPlaylists(response.data.items);
                    // console.log(response.data.items);
                }

            } catch (error) {
                console.error(error);
            }
        }

        // getUserPlaylists();
    },[])

    return (
        <Box>
            {/* <Grid2 container> */}
            {/* <Grid2> */}
            {userPlaylists === null ? <p>Loading...</p> : (
                <p>{userPlaylists.name} </p>

            )}
            {/* </Grid2> */}
            {/* </Grid2> */}


        </Box>
    );


}

export default UserPlaylists;