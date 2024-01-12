fetch(csvFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV, status ${response.status}`);
        }
        return response.text();
    })
    .then(csvData => {
        const popData = parseCSV(csvData);
        drawChart(popData);
    })
    .catch(error => console.error('Error:', error));


function drawChart(popData) {
    const time = popData.map(entry => entry.time);
    const magnitudes = popData.map(entry => entry.mag);
    const ctx = document.getElementById('popChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Population Change',
                data: popData.map(entry => ({ x: entry.year, y: entry.pop })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Year',
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Population',
                    }
                }
            }
        }
    });
}
