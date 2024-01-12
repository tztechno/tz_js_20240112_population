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
