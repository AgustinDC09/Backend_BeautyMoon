import spacy
from fastapi import FastAPI

app = FastAPI()
nlp = spacy.load("es_core_news_sm")

sinonimos = {
    "labiales": ["labiales mate", "labiales intensos", "pintalabios"],
    "crema": ["crema hidratante", "loción corporal", "crema nutritiva"],
    "maquillaje": ["base de maquillaje", "polvos compactos", "primer"]
}

@app.get("/sugerencias/{query}")
async def sugerencias(query: str):
    doc = nlp(query)
    palabra_base = doc[0].lemma_.lower()

    # Si hay sinónimos en el diccionario, los devuelve
    sugerencias = sinonimos.get(palabra_base, [])

    # Si no hay sinónimos, devuelve opciones generales
    if not sugerencias:
        sugerencias = [token.text for token in doc if not token.is_stop]

    return {"sugerencias": sugerencias}
