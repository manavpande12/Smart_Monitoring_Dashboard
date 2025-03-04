import pyodbc

driver = 'SQL SERVER'
server = 'DESKTOP-JIIEUCH\SQLEXPRESS'  
database = 'opcu_db'

conn = pyodbc.connect(f'DRIVER={driver};SERVER={server};DATABASE={database};Trusted_Connection=yes;')
cursor = conn.cursor()

query = "SELECT id, node_id,name, value FROM opc_ua_data"
cursor.execute(query)

rows = cursor.fetchall()
for row in rows:
    print(f"ID: {row.id},NODE ID: {row.node_id},Name: {row.name}, Value: {row.value}")

cursor.close()
conn.close()
