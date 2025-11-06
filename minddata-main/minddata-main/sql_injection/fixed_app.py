from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

def query_db_prepared(username, password):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    sql = "SELECT id, username FROM users WHERE username = ? AND password = ?"
    print("DEBUG (prepared):", sql, "params:", (username, password))
    try:
        c.execute(sql, (username, password))
        row = c.fetchone()
    finally:
        conn.close()
    return row

@app.route('/', methods=['GET'])
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username', '')
    password = request.form.get('password', '')
    user = query_db_prepared(username, password)
    if user:
        return render_template('login.html', message=f"Logged in as {user[1]}")
    else:
        return render_template('login.html', message="Login failed")

if __name__ == '__main__':
    app.run(debug=True)