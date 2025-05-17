from fastapi import FastAPI, Request
import spacy

app = FastAPI()
nlp = spacy.load("es_core_news_sm")  # Modelo de español para procesamiento de texto

@app.post("/procesar_vendedor")
async def procesar_vendedor(data: Request):
    vendedor = await data.json()
    nombre = vendedor["nombre"]
    doc = nlp(nombre)

    # Generar palabras clave y mejorar el texto
    palabras_clave = [token.text for token in doc if not token.is_stop]
    
    return {"nombre_limpio": nombre.title(), "palabras_clave": palabras_clave}
