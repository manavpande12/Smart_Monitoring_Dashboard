window.onload = function () {
    setTimeout(() => {
        let gauge = new JustGage({
            id: "tempGauge",
            value: 0,
            min: -50,
            max: 50,
            symbol: '°C',
            title: "Temperature Level",
            label: "Temperature",
            counter:true,
            gaugeWidthScale: 0.8,
            levelColors: ["#ff0000", "#ffa500", "#008000"],
            relativeGaugeSize: true ,
            pointer: true,
            // pointerOptions: {
            //     toplength: -15,
            //     bottomlength: 8,
            //     bottomwidth: 10,
            //     color: '#213155',
            //     stroke: '#ffffff',
            //     stroke_width: 1,
            //     stroke_linecap: 'round'
            // },
               
        });

        let lastValue = 0;
        async function updateGauge() {
            try {
                const response = await fetch('/api/data?node_id=ns=3;i=1002');
                const jsonData = await response.json();

                if (jsonData.length > 0) {
                    let latestData = jsonData[jsonData.length - 1];  
                    let tempLevel =  latestData.value;  

                    if (tempLevel !== lastValue) {  
                        gauge.refresh(tempLevel);
                        lastValue = tempLevel;

                       
                    }
                }
            } catch (error) {
                console.error("Error fetching tank data:", error);
            }
        }

        setInterval(updateGauge, 1000);
    }, 500);  
};
