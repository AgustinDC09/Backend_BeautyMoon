from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import hashlib

# Configurar FastAPI
app = FastAPI()

# Configurar CORS correctamente
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Permitir el frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def conectar_db():
    """Conecta con la base de datos MySQL en Clever Cloud."""
    try:
        conn = mysql.connector.connect(
            host="buswkbqy2bvfyzy4vhe9-mysql.services.clever-cloud.com",
            user="upopkuacmtmeipvc",
            password="dpk98My0jOXsGQGVHLcL",
            database="buswkbqy2bvfyzy4vhe9",
            port=3306
        )
        return conn
    except mysql.connector.Error as err:
        print("❌ Error al conectar con la base de datos:", err)
        return None

def verificar_password(password, hash_guardado):
    """Compara la contraseña ingresada con el hash almacenado."""
    return hashlib.sha256(password.encode()).hexdigest() == hash_guardado

@app.post("/registro")
async def registro(datos: dict):
    """Registra un nuevo usuario en la base de datos."""
    username = datos.get("username")
    email = datos.get("email")
    password = datos.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Faltan datos obligatorios")

    conn = conectar_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor()
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    try:
        cursor.execute("INSERT INTO user (username, email, password) VALUES (%s, %s, %s)", (username, email, password_hash))
        conn.commit()
        return {"mensaje": "✅ Usuario registrado exitosamente"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Error en la base de datos: {err}")
    finally:
        cursor.close()
        conn.close()

@app.post("/login")
async def login(datos: dict):
    """Verifica el inicio de sesión usando email y contraseña."""
    email = datos.get("email")
    password = datos.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Faltan datos obligatorios")

    conn = conectar_db()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor()
    cursor.execute("SELECT id, password FROM user WHERE email = %s", (email,))
    usuario = cursor.fetchone()

    if usuario is None:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    usuario_id, password_hash = usuario  # Desempaquetar la tupla correctamente

    if verificar_password(password, password_hash):  
        cursor.close()
        conn.close()
        return {"mensaje": "✅ Inicio de sesión exitoso", "usuario_id": usuario_id}
    else:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
