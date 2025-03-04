async function updateTable() {
    try {
        const response = await fetch('/api/data'); // Fetch JSON data
        const jsonData = await response.json();

        //let last10Entries = jsonData.reverse(); 
        let last10Entries = jsonData.slice(-20).reverse(); 
        let tableBody = document.getElementById("data-table-body");

        tableBody.innerHTML = ""; // Clear old table data

        last10Entries.forEach(entry => {
            let row = `<tr>
                <td>${entry.node_id}</td>
                <td>${entry.name}</td>
                <td>${entry.timestamp}</td>
                <td>${entry.value}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching table data:", error);
    }
}


setInterval(updateTable, 3000);
