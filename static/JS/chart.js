
let ctx = document.getElementById('timelineChart').getContext('2d');
let timelineChart = new Chart(ctx, {
    type: 'line',
    
    data: {
        labels: [],  // Timestamps
        datasets: [{
            label: 'Pressure Value',
            data: [],  // Values
            borderColor: 'green',
            borderWidth: 2,
            pointBackgroundColor: 'green',
            fill: false,
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { 
                type: 'time', time: { unit: 'second' },
                title: { display: true, 
                text: 'Timestamp' },
                font: { size: 12, weight: 'bold' },
                grid: { display: true } 
            },
            y: { 
                beginAtZero: true,
                title: { display: true, text: 'Value' },
                font: { size: 12, weight: 'bold' },
                grid: { display: true },
                min:0,
                max:50,
                
            }
        }
    }
});

// Function to fetch and update the chart
async function updateChart() {
    try {
        const response = await fetch('/api/data?node_id=ns=3;i=1001');
        const jsonData = await response.json();

        // Take only the last 10 entries
        let last10Entries = jsonData.slice(-10);

        let timestamps = last10Entries.map(entry => entry.timestamp);
        let values = last10Entries.map(entry => entry.value);

        timelineChart.data.labels = timestamps;
        timelineChart.data.datasets[0].data = values;

        timelineChart.update();  // Refresh chart
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
setInterval(updateChart, 1000);  
