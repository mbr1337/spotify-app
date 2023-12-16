import { Box, Typography, Zoom } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

function UserProfile() {
    const userData = useSelector((state) => state.user.userData);
    console.log(userData);
    const capitalizedProduct = userData?.product?.charAt(0).toUpperCase() + userData?.product?.slice(1);
    const userInfo = [
        userData?.display_name ?? 'N/A',
        userData?.email ?? 'N/A',
        (capitalizedProduct ? capitalizedProduct + ' ' : '') + (userData?.type ?? 'N/A'),
    ];

    return (
        <>
            {userData.length !== 0 ? (
                <Zoom in={true} timeout={500}>

                    <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                        <Grid2 container>
                            <Grid2 xs={12}>
                                <img className='playlistCards' src={userData.images[1].url}></img>
                            </Grid2>
                            {userInfo.map((_, index) => (
                                <Grid2 xs={12} key={index}>
                                    <Typography variant='h4' key={index}>{_}</Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                </Zoom>

            )
                : (
                    <>Loading...</>
                )}

        </>
    )
}

export default UserProfile