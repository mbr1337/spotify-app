import { render, screen } from '@testing-library/react';
import UserPlaylists from '../components/partials/userPlaylists';

describe('Should render list of user playlists on the leftside panel', () => {
    test('Component render', () => {
        // given
        const playlists = [{
            id: 1, name: "test", external_urls: {
                spotify: "https://open.spotify.com/playlist/4Yc4WXYaAAtp3PVtEUZd3F"
            },
        }]
        // when
        render(<UserPlaylists playlists={playlists} />);
        const playlistElement = screen.getByTestId('playlists');
        // then
        expect(playlistElement).toBeInTheDocument();
        expect(playlistElement).toContainHTML('a');
    });
})

