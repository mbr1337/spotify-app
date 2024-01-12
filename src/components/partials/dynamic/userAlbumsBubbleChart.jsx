import React from 'react'
import { Bubble } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Box } from '@mui/material';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function UserAlbumsBubbleChart({ userAlbums }) {
    const getAlbumDateRange = (albums) => {
        const dates = albums.map((album) => new Date(album.added_at).getTime());
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        return { minDate, maxDate };
    };

    const generateMonths = (dateRange) => {
        const months = [];
        const date = new Date(Date.UTC(dateRange.minDate.getUTCFullYear(), dateRange.minDate.getUTCMonth(), 1));

        while (date <= dateRange.maxDate) {
            months.push({
                label: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
                value: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).getTime(),
            });
            date.setUTCMonth(date.getUTCMonth() + 1);
        }

        return months;
    };

    const dateRange = getAlbumDateRange(userAlbums);
    const months = generateMonths(dateRange);
    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    callback: (value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString();
                    },
                    suggestedMin: dateRange.minDate.getTime(),
                    suggestedMax: dateRange.maxDate.getTime(),
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const albumName = userAlbums[context.dataIndex]?.album.name || '';
                        const albumArtists =
                            userAlbums[context.dataIndex]?.album.artists.map((artist) => artist.name) || [];
                        const popularity = context.parsed.y;
                        const dateIndex = context.dataset.data[context.dataIndex]?.x || 0;
                        const date = new Date(dateIndex);
                        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
                            month: 'short',
                        })} ${date.getFullYear()}`;
                        return `${albumName} by ${albumArtists.join(', ')}, ${formattedDate}, Popularity: ${popularity}`;
                    },

                },
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Albums',
                data: userAlbums.map((album) => {
                    const date = new Date(album.added_at);
                    const monthValue = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).getTime();

                    return {
                        // x: monthValue,
                        x: date.getTime(),
                        y: album.album.popularity || 0,
                        r: album.album.popularity || 0,
                    };
                }),
                backgroundColor: 'rgba(24, 171, 41, 0.5)',
            },
        ],
    };

    return (
        <Box>
            <Bubble options={options} data={data} />
        </Box>
    );
}

export default UserAlbumsBubbleChart;