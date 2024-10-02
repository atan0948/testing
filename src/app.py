# app.py
from flask import Flask
from flask_cors import CORS
from db import create_users_table
from auth import register, login

app = Flask(__name__)

# Allow requests from the specific frontend port
CORS(app, origins=["http://localhost:5173"])

# for checking if the database is connected
create_users_table()

# Registration endpoint
@app.route('/register', methods=['POST'])
def register_user():
    return register()

# Login endpoint
@app.route('/login', methods=['POST'])
def login_user():
    return login()

if __name__ == '__main__':
    app.run(debug=True)
