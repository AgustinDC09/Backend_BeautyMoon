import sqlite3

def conectar_db():
    """Conecta con la base de datos."""
    conn = sqlite3.connect("beautymoon.db")  # Ajusta si usas otro sistema
    return conn

def agregar_producto_carrito(usuario_id, producto_id, cantidad):
    """Agrega un producto al carrito del usuario."""
    conn = conectar_db()
    cursor = conn.cursor()

    try:
        # Verificar si el usuario existe
        cursor.execute("SELECT id FROM user WHERE id = ?", (usuario_id,))
        usuario = cursor.fetchone()
        if not usuario:
            return {"mensaje": "Error: Usuario no encontrado"}

        # Verificar si el producto ya está en el carrito
        cursor.execute("SELECT id, cantidad FROM Carrito WHERE Usuario_id = ? AND Producto_id = ?", (usuario_id, producto_id))
        producto_en_carrito = cursor.fetchone()

        if producto_en_carrito:
            # Si ya existe, actualizar la cantidad
            nueva_cantidad = producto_en_carrito[1] + cantidad
            cursor.execute("UPDATE Carrito SET Cantidad = ? WHERE id = ?", (nueva_cantidad, producto_en_carrito[0]))
        else:
            # Si no existe, insertarlo
            cursor.execute("INSERT INTO Carrito (Usuario_id, Producto_id, Cantidad) VALUES (?, ?, ?)",
                           (usuario_id, producto_id, cantidad))

        conn.commit()
        return {"mensaje": "Producto agregado al carrito exitosamente"}

    except sqlite3.Error as e:
        return {"mensaje": f"Error al agregar producto al carrito: {str(e)}"}
    
    finally:
        conn.close()
