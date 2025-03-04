from opcua import Client
import json
from datetime import datetime
import os
import time

# OPC UA Server URL and Node IDs
opcua_server_url = "opc.tcp://LAPTOP-1JG8UPEG:53530/OPCUA/SimulationServer"
node_ids = ["ns=3;i=1001", "ns=3;i=1002"]
json_file_path = os.path.join("C:\\Users\\MvP\\Desktop\\MSD\\log\\opcua_data.json")

# Connect to OPC UA Server
client = Client(opcua_server_url)
client.connect()
print("OPC UA Client Connected")
print("Ctrl-C to stop program.")

try:
    while True:
        # Initialize data list
        opcua_data_list = []

        for node_id in node_ids:
            node = client.get_node(node_id)
            data_value = node.get_value()
            node_name = node.get_browse_name().Name  # Extract node name
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Current timestamp
            
            # Create JSON entry
            opcua_data = {
                "node_id": node_id,
                "name": node_name,
                "value": data_value,
                "timestamp": timestamp
            }

            opcua_data_list.append(opcua_data)

        # Read existing data if file exists
        if os.path.exists(json_file_path):
            with open(json_file_path, "r") as json_file:
                try:
                    existing_data = json.load(json_file)
                    if not isinstance(existing_data, list):
                        existing_data = []
                except json.JSONDecodeError:
                    existing_data = []
        else:
            existing_data = []

        # Append new data
        existing_data.extend(opcua_data_list)

        # Write updated data back to file
        with open(json_file_path, "w") as json_file:
            json.dump(existing_data, json_file, indent=4)

        time.sleep(5)

except Exception as e:
    print(f"Error: {e}")

except KeyboardInterrupt:
    pass

finally:
    client.disconnect()
