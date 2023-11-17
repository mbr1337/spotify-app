import React from "react";
import { Pie } from "react-chartjs-2";

function ArtistPieChart({ artistCounts }) {
    const data = {
        labels: Object.keys(artistCounts),
        datasets: [
            {
                data: Object.values(artistCounts),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    // Add more colors as needed
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    // Add more colors as needed
                ],
            },
        ],
    };

    return <Pie data={data} />;
}

export default ArtistPieChart;
