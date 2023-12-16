import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './store';
import Login from './components/Login';
import './App.scss';
import UserPanelLayout from './components/partials/userPanelLayout';
import { Outlet } from 'react-router-dom';
import { Fade, Zoom } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch('/auth/token');
        const json = await response.json();

        dispatch(setToken(json.access_token));
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    }

    getToken();
  }, [dispatch]);


  return (
    <Fade in={true} timeout={700}>
      <main>
        {token === '' ? (
          <Login />
        ) : (
          <UserPanelLayout>
            <Outlet />
          </UserPanelLayout>
        )}
      </main>
    </Fade>

  );
}

export default App;
