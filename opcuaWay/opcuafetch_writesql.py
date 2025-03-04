from opcua import Client
import pyodbc

opcua_server_url = "opc.tcp://localhost:4840/freeopcua/server/"
driver = 'SQL SERVER'
server = 'DESKTOP-JIIEUCH\SQLEXPRESS'
database = 'opcu_db'

# Connect to OPC UA server
client = Client(opcua_server_url)
conn = pyodbc.connect(f'DRIVER={driver};SERVER={server};DATABASE={database};Trusted_Connection=yes;')
cursor = conn.cursor()


try:
    # Connect to the OPC UA server
    client.connect()
    # Read data from a specific node
    node = client.get_node("ns=2;i=2")  
    data = node.get_value()

    print(f"Data from OPC UA server: {data}")

    # Insert data into SQL Server
    insert_query = "INSERT INTO opc_ua_data (id, value) VALUES (?, ?)"
    cursor.execute(insert_query, (1, data))  

    conn.commit()
finally:
    cursor.close()
    conn.close()
    client.disconnect()
