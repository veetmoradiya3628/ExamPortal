import mysql.connector

conn = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="examportalproddb" # Dev: exam_server, Dev Prod: examportalproddb
)

def is_db_connection():
    if conn:
        print("Database Connection Successfully.....:)")
    

def execute_query(query, args):
    cursor = conn.cursor()
    cursor.execute(query, args)
    data = cursor.fetchall()
    print('data in execute query function', data)
    conn.commit()
    return data

def execute_insert_query(query, args):
    cursor = conn.cursor()
    cursor.execute(query, args)
    cnt = cursor.rowcount
    print(cnt, "Record inserted successfully.")
    conn.commit()
    return cnt

if __name__ == "__main__":
    is_db_connection()
