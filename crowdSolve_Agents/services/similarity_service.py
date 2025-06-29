import chromadb
from core.embedder import embedding_model

client = chromadb.Client(chromadb.config.Settings(persist_directory="./vectorstore"))
collection = client.get_or_create_collection(name="challenges")

def add_challenge_to_index(challenge_id, text):
    embedding = embedding_model.encode(text).tolist()
    collection.add(documents=[text], embeddings=[embedding], ids=[challenge_id])
    client.persist()

def query_similar_challenges(text, threshold=0.3, limit=3):
    embedding = embedding_model.encode(text).tolist()
    results = collection.query(query_embeddings=[embedding], n_results=limit)

    return [
        {"text": doc, "score": round(score, 3)}
        for doc, score in zip(results["documents"][0], results["distances"][0])
        if score < threshold
    ]
