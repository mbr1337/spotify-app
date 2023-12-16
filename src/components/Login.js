import { Zoom } from '@mui/material';
import React from 'react';

function Login() {
    return (
        <Zoom in={true} timeout={700}>
            <div className="App">
                <header className="App-header">
                    <a className="btn-spotify" href="/auth/login" >
                        Login with Spotify
                    </a>
                </header>
            </div>
        </Zoom>
    );
}

export default Login;

