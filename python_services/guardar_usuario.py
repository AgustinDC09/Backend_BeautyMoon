import sqlite3
import hashlib

def conectar_db():
    """Conecta con la base de datos"""
    conn = sqlite3.connect("beautymoon.db")  # Ajusta según tu configuración
    return conn

def hash_password(password):
    """Hashea la contraseña antes de guardarla"""
    return hashlib.sha256(password.encode()).hexdigest()

def guardar_usuario(username, email, password):
    """Guarda el usuario en la base de datos con protección contra duplicados"""
    conn = conectar_db()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
                       (username, email, hash_password(password)))
        conn.commit()
        return {"mensaje": "Usuario registrado con éxito"}
    except sqlite3.IntegrityError:
        return {"mensaje": "Error: El usuario o correo ya están registrados"}
    finally:
        conn.close()
