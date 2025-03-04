from flask import Flask, render_template, jsonify, request, redirect, url_for
from function.retrive import get_all_data,get_data_by_node


app = Flask(__name__,static_folder="static")


#Route       
@app.route('/')
def index():
    return render_template('HTML/login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('HTML/index.html')

@app.route('/reports')
def reports():
    return render_template('HTML/reports.html')

#Retrive
@app.route('/api/data', methods=['GET'])
def get_data():
    node_id = request.args.get('node_id')  # Get node_id from request query parameter
    if node_id:  # If node_id is provided, filter data
        data = get_data_by_node(node_id)
    else:
        data = get_all_data()  # Otherwise, return all data
    return jsonify(data)

#Login

VALID_USERNAME = "Manav"
VALID_PASSWORD = "manav@123"

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '').strip()
    password = request.form.get('password', '').strip()

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return redirect(url_for('dashboard'))
    else:
        return render_template('HTML/login.html', error="Invalid username or password!")


if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)
