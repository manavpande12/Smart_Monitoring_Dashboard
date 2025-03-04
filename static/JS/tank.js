let barCtx = document.getElementById('tankLevelChart').getContext('2d');

// Initial tank levels
let tankLevel1 = 0, tankLevel2 = 0, tankLevel3 = 0;
let emptyLevel1 = 100, emptyLevel2 = 100, emptyLevel3 = 100;

let tankLevelChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ["Tank 1", "Tank 2", "Tank 3"],  // ✅ 3 tanks
        datasets: [
            {
                label: 'Filled Tank',
                data: [tankLevel1, tankLevel2, tankLevel3], 
                backgroundColor: '#1e81b0',
                borderColor: 'black',
                borderWidth: 0,
                barThickness: 50,
            },
            {
                label: 'Empty Tank',
                data: [emptyLevel1, emptyLevel2, emptyLevel3],  
                backgroundColor: 'lightgray',
                borderColor: 'gray',
                borderWidth: 0,
                barThickness: 50,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { 
                beginAtZero: true,
                max: 100,  
                stacked: true,  
                title: { display: true, text: 'Level (%)' },
                grid: { display: true }
            },
            x: {
                stacked: true,  
                title: { display: true, text: 'Tanks' }
            }
        }
    }
});


async function updateTankChart() {
    try {
        const response = await fetch('/api/data?node_id=ns=3;i=1001');
        const jsonData = await response.json();

        if (jsonData.length > 0) {  
            let latestData = jsonData[jsonData.length - 1]; 

            let tankLevel1 = Math.round(Math.max(1, Math.min(100, latestData.value)));  
            let tankLevel2 = Math.round(Math.max(1, Math.min(100, tankLevel1 * 2)));  
            let tankLevel3 = Math.round(Math.max(1, Math.min(100, tankLevel1 * 3)));  

            let emptyLevel1 = 100 - tankLevel1; 
            let emptyLevel2 = 100 -  tankLevel2; 
            let emptyLevel3 = 100 - tankLevel3; 
            
            tankLevelChart.data.datasets[0].data = [tankLevel1, tankLevel2, tankLevel3]; 
            tankLevelChart.data.datasets[1].data = [emptyLevel1, emptyLevel2, emptyLevel3];

            tankLevelChart.update(); 
        }
    } catch (error) {
        console.error("Error fetching tank data:", error);
    }
}

// Fetch latest data every 1 second
setInterval(updateTankChart, 1000);
