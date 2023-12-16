import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ArtistPieChart from '../components/partials/dynamic/favArtistsPieChart';
import { PieChart } from '@mui/x-charts';
import PieArcLabel from '@mui/x-charts/PieChart/PieArcLabel';
import { PieArcLabelClasses } from '@mui/x-charts';

jest.mock('@mui/x-charts', () => ({
    PieChart: ({ series, ...props }) => (
        <div data-testid="mocked-pie-chart" {...props}>
            {series.map((s, index) => (
                <div key={index} data-testid={`mocked-pie-chart-series-${index}`} />
            ))}
        </div>
    ),
    pieArcLabelClasses: { root: 'mocked-pie-arc-label-root' },
}));


describe('ArtistPieChart', () => {
    test('renders with artist data', async () => {
        const artistCounts = [
            { label: 'Artist1', value: 10 },
            { label: 'Artist2', value: 20 },
        ];

        render(<ArtistPieChart artistCounts={artistCounts} />);

        expect(screen.getByTestId('mocked-pie-chart')).toBeInTheDocument();
    });

    test('renders with genre data', () => {
        const artistCounts = [
            { label: 'Genre1', value: 10, genres: ['Rock', 'Pop'] },
            { label: 'Genre2', value: 20, genres: ['Hip Hop'] },
        ];

        render(<ArtistPieChart artistCounts={artistCounts} useGenre={true} />);

        expect(screen.getByTestId('mocked-pie-chart')).toBeInTheDocument();
    });

    test('renders with no data', () => {
        render(<ArtistPieChart artistCounts={[]} useGenre={true} />);

        expect(screen.getByText(/No genres available for display/i)).toBeInTheDocument();
    });

    test('renders with unique genres', () => {
        const artistCounts = [
            { label: 'Genre1', value: 10, genres: ['Rock', 'Pop'] },
            { label: 'Genre2', value: 20, genres: ['Hip Hop'] },
            { label: 'Genre1', value: 5, genres: ['Jazz'] },
        ];

        render(<ArtistPieChart artistCounts={artistCounts} useGenre={true} />);

        expect(screen.getByTestId('mocked-pie-chart')).toBeInTheDocument();
    });

});
