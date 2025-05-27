import spacy
import sqlite3
import numpy as np

nlp = spacy.load("es_core_news_sm")

def conectar_db():
    """Conecta con la base de datos."""
    conn = sqlite3.connect("tu_base_de_datos.db")
    return conn

def obtener_productos():
    """Obtiene los productos desde la base de datos."""
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre, descripcion FROM productos")  
    productos = cursor.fetchall()
    conn.close()
    return productos

def generar_vector(texto):
    """Genera un vector y lo convierte en np.array."""
    doc = nlp(texto)
    return np.array(doc.vector, dtype=np.float32)

def buscar_productos(consulta):
    """Encuentra productos similares según la consulta del usuario."""
    consulta_vector = generar_vector(consulta)
    productos = obtener_productos()

    if not productos:
        return []  # No hay productos en la base de datos

    similitudes = []
    for id_producto, nombre, descripcion in productos:
        texto_producto = f"{nombre} {descripcion}"
        vector_producto = generar_vector(texto_producto)

        # Similitud coseno mejorada
        if np.linalg.norm(vector_producto) > 0:  # Evita divisiones por cero
            similitud = np.dot(consulta_vector, vector_producto) / (np.linalg.norm(consulta_vector) * np.linalg.norm(vector_producto))
            similitudes.append((id_producto, nombre, similitud))

    # Ordenar por similitud descendente y devolver los mejores
    similitudes.sort(key=lambda x: x[2], reverse=True)
    return similitudes[:5] if similitudes else [{"mensaje": "No se encontraron coincidencias"}]

