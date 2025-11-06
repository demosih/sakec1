import sqlite3

conn = sqlite3.connect('users.db')
c = conn.cursor()

c.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
''')

try:
    c.execute("INSERT INTO users (username, password) VALUES (?, ?)",
              ("alice", "wonderland"))
    conn.commit()
    print("Inserted user alice / wonderland")
except Exception as e:
    print("User may already exist:", e)

conn.close()