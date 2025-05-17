import spacy
from fastapi import FastAPI

app = FastAPI()
nlp = spacy.load("es_core_news_sm")

# Diccionario de sinónimos (puedes expandirlo)
sinonimos = {
    "labiales": ["labiales mate", "labiales intensos", "pintalabios"],
    "crema": ["crema hidratante", "loción corporal", "crema nutritiva"]
}

@app.get("/buscar/{query}")
async def buscar(query: str):
    doc = nlp(query)
    palabra_base = doc[0].lemma_  # Obtener forma base de la palabra
    resultados = sinonimos.get(palabra_base.lower(), [])
    return {"sugerencias": resultados}
