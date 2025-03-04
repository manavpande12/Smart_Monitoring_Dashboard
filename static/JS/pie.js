let flowCtx = document.getElementById('pie').getContext('2d');

// ✅ Initialize flow values globally
let flow1 = 100, flow2 = 0, flow3 = 0;  

let flowChart = new Chart(flowCtx, {
    type: 'pie',
    data: {
        labels: ["Flow 1", "Flow 2", "Flow 3"],
        datasets: [{
            label: 'Flow Distribution',
            data: [flow1, flow2, flow3],  
            backgroundColor: ['#1e81b0', '#ffcc00', '#ff5733'],
            borderColor: 'white',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    }
});

async function updateFlowChart() {
    try {
        const response = await fetch('/api/data?node_id=ns=3;i=1001');  // Fetch from API
        const jsonData = await response.json();

        if (jsonData.length > 0) {  
            let latestData = jsonData[jsonData.length - 1]; 
            flow1 = Math.max(0, Math.min(100, latestData.value));   
            let remaining = 100 - flow1;  
            flow2 = remaining / 2;  
            flow3 = remaining / 2;  

            // ✅ Update the chart data
            flowChart.data.datasets[0].data = [flow1, flow2, flow3];  
            
            // ✅ FORCE chart update
            flowChart.update();  
        }
    } catch (error) {
        console.error("Error fetching flow data:", error);
    }
}

// Fetch latest data every 1 second
setInterval(updateFlowChart, 1000);
