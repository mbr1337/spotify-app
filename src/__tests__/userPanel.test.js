// 2 integrated tests
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserLeftsidePanel from '../components/partials/userLeftsidePanel';
import axios from 'axios';
import { endpoints } from '../endpoints';
import store from '../store';
import { Provider } from 'react-redux';
jest.mock('axios');

describe('Userpanel component', () => {

    test('renders loading skeletons when playlists are loading', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <UserLeftsidePanel />
                </Provider>
            </MemoryRouter>
        );

        // Skeletons should be rendered while playlists are loading
        const skeletons = screen.getAllByTestId('loading-skeleton');
        expect(skeletons).toHaveLength(15); // Adjust the number based on your actual number of Skeletons
    });

    test('renders UserPlaylists component when playlists are loaded', async () => {
        // Mock axios to return a successful response
        axios.get.mockResolvedValue({
            status: 200,
            data: { items: [{ playlist1: "123" }, { playlist2: "321" }], next: null },
        });

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <UserLeftsidePanel />
                </Provider>
            </MemoryRouter>

        );
        // Wait for the component to fetch playlists
        await waitFor(() => {
            // The UserPlaylists component should be rendered when playlists are loaded
            expect(screen.getByTestId('user-playlists')).toBeInTheDocument();
        });
    });

});
