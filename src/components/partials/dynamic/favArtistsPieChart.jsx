import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

function ArtistPieChart({ artistCounts, useGenre = false, arcLabel = true }) {
    const hasData = artistCounts && artistCounts.length > 0;
    let initialData = hasData
        ? artistCounts.map((entry) => ({
            value: entry.value,
            label: useGenre && entry.genres ? entry.genres.join(', ') : entry.label,
        }))
        : [];

    if (useGenre) {
        // Apply the filter only when useGenre is true
        initialData = initialData.filter((entry) => entry.label);
    }

    const sizing = {
        margin: { right: 10 },
        width: 550,
        height: 500,
        legend: { hidden: true },
    };

    const TOTAL = initialData.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getUniqueGenres = (data) => {
        const uniqueGenres = [];

        data.forEach((entry) => {
            const existingEntryIndex = uniqueGenres.findIndex((e) => e.label === entry.label);

            if (existingEntryIndex !== -1) {
                // If label already exists, add the value to the existing entry
                uniqueGenres[existingEntryIndex].value += entry.value;
            } else {
                // If label doesn't exist, add a new entry to uniqueGenres
                uniqueGenres.push({ label: entry.label, value: entry.value });
            }
        });

        return uniqueGenres;
    };

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    // Conditional check for rendering the component
    const chartData = useGenre ? getUniqueGenres(initialData) : initialData;


    // Conditional check for rendering the chart or a message
    if (useGenre && chartData.length === 0) {
        return (
            <Typography variant="body1" sx={{ m: 'auto' }}>
                No genres available for display.
            </Typography>
        );
    }

    return (
        <>
            <Typography variant='h4' sx={{ m: "auto" }}>{useGenre ? "Genre" : "Artist"} Distribution:</Typography>
            <Box data-testid="mocked-pie-chart" sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                    series={[
                        { outerRadius: 150, innerRadius: 100, data: chartData, arcLabel: getArcLabel },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontSize: 16,
                        },
                    }}
                    {...sizing}
                />
            </Box>
        </>
    );
}

export default ArtistPieChart;
