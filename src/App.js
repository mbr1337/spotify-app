import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './store';
import Login from './components/Login';
import './App.scss';
import UserPanelLayout from './components/partials/userPanelLayout';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }

    getToken();
  }, [dispatch]);

  if (loading) {
    // You can add a loading indicator or placeholder here
    return <div>Loading...</div>;
  }

  return (
    <main>
      {token === '' ? (
        <Login />
      ) : (
        <UserPanelLayout>
          <Outlet />
        </UserPanelLayout>
      )}
    </main>
  );
}

export default App;
