# 📊 Smart Monitoring Dashboard

## 📌 Description
I created a **Smart Monitoring Dashboard** that fetches data from **OPC UA** using **Python** and writes it to a JSON file (as a Python service). The data is then retrieved from the JSON file and pushed to a **web server** using **Flask**, where it is visualized in multiple chart formats, including:

- 📊 **Stacked Bar Chart**
- 🥧 **Pie Chart**
- ⏳ **Timeline Chart**
- 🎯 **Gauge Chart**

Additionally, the dashboard includes a **Report Tab** for detailed insights.

I also implemented an **alternative method**, where data from **OPC UA** is stored in a **database** and then retrieved again for visualization.

---

## 🛠️ Tech Stack
- **Backend**: Python (Flask, OPC UA, PyODBC, Cryptography)
- **Database**: SQL (Optional, for alternative approach)
- **Data Visualization**: Various chart types for enhanced analysis
- **OPC UA Simulation**: Prosys Simulation Software

---

## 🚀 Installation & Setup

### 1️⃣ Install Required Dependencies:
```bash
pip install Flask opcua pyodbc cryptography
```

### 2️⃣ Create a Service Using NSSM (Windows)
NSSM (Non-Sucking Service Manager) is used to run the Python service in the background.


---

## 🔗 OPC UA Setup
- The **Prosys Simulation Software** is used as the OPC UA server.
- Update the **OPC UA URL** in the Python script to match the simulation server.

---

## 📷 Dashboard Preview
1. Login Screen
![Screenshot 2025-03-04 220850](https://github.com/user-attachments/assets/6a5520f2-c5ae-4bee-9beb-59bb68f56dba)

2. Dashboard
![Screenshot 2025-03-04 221015](https://github.com/user-attachments/assets/f4bc6e13-b9ee-4f39-a86d-4160ea0a0bdf)

3. Reports
![Screenshot 2025-03-04 221038](https://github.com/user-attachments/assets/6c8c8702-d36f-451a-a6ad-09dfc701616b)


---

## 🤝 Contribution
Feel free to **fork** this repository and submit **pull requests** to improve the project.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 📧 Contact
For any queries, reach out via GitHub or email.

---

### ⭐ Don't forget to **star** this repository if you found it helpful!

