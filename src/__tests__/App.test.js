// 2 integrated tests
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import { setToken, authReducer } from '../store';
import store from '../store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('node-fetch');

describe('App component', () => {

    test('renders Login component when token is empty', async () => {
        // Manually dispatch an action to set the state of 'auth'
        store.dispatch(setToken(''));  // Set an empty token

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Wait for the component to render and fetch the token
        const childElement = screen.getByText(/Login with Spotify/i);
        // Assert that the Login component is rendered
        expect(childElement).toBeInTheDocument();
    });

    test('renders UserPanelLayout component when token is present', async () => {
        store.dispatch(setToken('mockAccessToken'));

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </MemoryRouter>
        );

        // Wait for the component to render and fetch the token
        // await waitFor(() => screen.getByText('UserPanelLayout'));
        const childElement = screen.getByText(/Discover/i);

        // Assert that the UserPanelLayout component is rendered
        expect(childElement).toBeInTheDocument();
    });
});

        // given
    test('GET /token should return the access token', async () => {
        // when
        const response = await request(app).get('/auth/token');
        // then
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access_token');
        expect(response.body.access_token).toBe(getAccessToken());
    });

    