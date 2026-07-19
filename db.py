import sqlite3
import os

DB_PATH = 'hrms.db'
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), 'schema.sql')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if not os.path.exists(DB_PATH):
        conn = get_connection()
        with open(SCHEMA_PATH, 'r') as f:
            conn.executescript(f.read())
        conn.commit()
        conn.close()

def query(sql, params=()):
    conn = get_connection()
    cur = conn.execute(sql, params)
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def execute(sql, params=()):
    conn = get_connection()
    cur = conn.execute(sql, params)
    conn.commit()
    lastrowid = cur.lastrowid
    conn.close()
    return lastrowid

# Employee helpers
def get_all_employees():
    return query('SELECT * FROM employees')

def get_employee(emp_id):
    result = query('SELECT * FROM employees WHERE id = ?', (emp_id,))
    return result[0] if result else None

def add_employee(emp):
    cols = ', '.join(emp.keys())
    placeholders = ', '.join(['?'] * len(emp))
    sql = f'INSERT INTO employees ({cols}) VALUES ({placeholders})'
    return execute(sql, tuple(emp.values()))

def update_employee(emp_id, updates):
    set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
    sql = f'UPDATE employees SET {set_clause} WHERE id = ?'
    execute(sql, tuple(updates.values()) + (emp_id,))

def delete_employee(emp_id):
    execute('DELETE FROM employees WHERE id = ?', (emp_id,))

# Event helpers
def get_all_events():
    return query('SELECT * FROM events')

def get_event(event_id):
    result = query('SELECT * FROM events WHERE id = ?', (event_id,))
    return result[0] if result else None

def add_event(event):
    cols = ', '.join(event.keys())
    placeholders = ', '.join(['?'] * len(event))
    sql = f'INSERT INTO events ({cols}) VALUES ({placeholders})'
    return execute(sql, tuple(event.values()))

def update_event(event_id, updates):
    set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
    sql = f'UPDATE events SET {set_clause} WHERE id = ?'
    execute(sql, tuple(updates.values()) + (event_id,))

def delete_event(event_id):
    execute('DELETE FROM events WHERE id = ?', (event_id,))

# Integration helpers
def get_all_integrations():
    return query('SELECT * FROM integrations')

def add_integration(integ):
    cols = ', '.join(integ.keys())
    placeholders = ', '.join(['?'] * len(integ))
    sql = f'INSERT INTO integrations ({cols}) VALUES ({placeholders})'
    return execute(sql, tuple(integ.values()))

def update_integration(app_id, updates):
    set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
    sql = f'UPDATE integrations SET {set_clause} WHERE id = ?'
    execute(sql, tuple(updates.values()) + (app_id,))

def delete_integration(app_id):
    execute('DELETE FROM integrations WHERE id = ?', (app_id,))

# Settings helpers (single row table)
def get_settings():
    result = query('SELECT * FROM settings')
    return result[0] if result else {}

def update_settings(updates):
    set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
    sql = f'UPDATE settings SET {set_clause}'
    execute(sql, tuple(updates.values()))
