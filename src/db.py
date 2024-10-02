# db.py
import mysql.connector
from mysql.connector import Error

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='J@yVeeN@thanael1234',
            database='mydb'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

def create_users_table():
    connection = create_connection()
    if connection and connection.is_connected():
        try:
            cursor = connection.cursor()
            create_table_query = '''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )'''
            cursor.execute(create_table_query)
            print("Table 'users' created successfully.")
        finally:
            cursor.close()
            connection.close()
            print("Database connection closed.")

