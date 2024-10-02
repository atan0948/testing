# auth.py
import bcrypt
from flask import request, jsonify
from db import create_connection
from mysql.connector import Error  # Import Error to handle specific exceptions

def register():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    connection = create_connection()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor()
            insert_query = '''
            INSERT INTO users (username, password_hash, email) 
            VALUES (%s, %s, %s)
            '''
            cursor.execute(insert_query, (username, password_hash, email))
            connection.commit()
            print("Registered Successfully!")
            return jsonify({'message': 'User registered successfully!'}), 201
        except Error as e:
            # Check for specific duplicate entry errors
            if e.errno == 1062:  # Duplicate entry error code
                if 'username' in str(e):
                    return jsonify({'message': 'Username already taken. Please choose another one.'}), 409
                elif 'email' in str(e):
                    return jsonify({'message': 'Email already taken. Please choose another one.'}), 409
            return jsonify({'message': 'Registration failed. Please try again later.'}), 500
        finally:
            cursor.close()
            connection.close()

def login():
    data = request.json
    email = data['email']
    password = data['password']

    connection = create_connection()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor()
            cursor.execute('SELECT password_hash FROM users WHERE email = %s', (email,))
            result = cursor.fetchone()

            if not result:
                # If no user found with that email
                print(f"User {email} not found.")
                return jsonify({'message': 'Invalid email or password.'}), 401

            if bcrypt.checkpw(password.encode('utf-8'), result[0].encode('utf-8')):
                print(f"User {email} logged in successfully.")
                return jsonify({'message': 'Login successful!'}), 200
            else:
                print(f"User {email} password is incorrect.")
                return jsonify({'message': 'Invalid email or password.'}), 401
        except Exception as e:
            return jsonify({'message': str(e)}), 500
        finally:
            cursor.close()
            connection.close()
