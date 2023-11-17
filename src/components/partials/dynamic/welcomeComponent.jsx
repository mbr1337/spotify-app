import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function WelcomeComponent() {

    const token = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData)

    return (
        <>
            {userData === null ?
                <p>loading</p>
                : (
                    <Container>
                        <Typography>
                            Welcome, {userData.display_name}
                        </Typography>
                        {/* <Button><Link className="btn-spotify" to="/favoriteSongs">Let's get started</Link></Button> */}
                    </Container>

                )}
        </>
    );
}

export default WelcomeComponent;