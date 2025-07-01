from langchain_core.tools import tool
import chromadb
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

# Load Gemini API key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not set in .env")

# Constants
VECTORSTORE_PATH = "./vectorstore"
COLLECTION_NAME = "challenges"

# Gemini Embeddings and LLM
embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GOOGLE_API_KEY
)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.3
)

# Load Chroma vector store
def load_chroma_collection():
    """
    Returns LangChain-compatible Chroma retriever for similarity search.
    """
    return Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embedding_model,
        persist_directory=VECTORSTORE_PATH
    )

# Raw ChromaDB client (low-level access for inserts)
client = chromadb.Client(chromadb.config.Settings(persist_directory=VECTORSTORE_PATH))
collection = client.get_or_create_collection(name=COLLECTION_NAME)

@tool
def similarity_check_or_add(content: str) -> list:
    """
    Tool to check for similar content in the vector DB using Gemini.
    - If similar docs exist (score < 0.3), returns summary and matches.
    - Else, adds content to DB and returns a success message.
    """
    try:
        if not content.strip():
            return [{"error": "Content is empty"}]

        # Embed query and search Chroma
        embedding = embedding_model.embed_query(content)
        results = collection.query(query_embeddings=[embedding], n_results=3)

        documents = results.get("documents", [[]])
        distances = results.get("distances", [[]])

        similar_docs = [
            {"text": doc, "score": round(score, 3)}
            for doc, score in zip(documents[0], distances[0])
            if score < 0.3
        ]

        if similar_docs:
            # Use Gemini to summarize/compare if similar content is found
            retriever = load_chroma_collection().as_retriever(search_kwargs={"k": 3})
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                retriever=retriever,
                return_source_documents=True
            )
            response = qa_chain.invoke({"query": content})  # ⬅️ proper call
            summary = response.get("result", "⚠️ No summary generated.")
            return [{"similar": similar_docs, "summary": summary}]

        # No similar content: store it in the DB
        new_id = f"doc_{len(documents[0])}_{abs(hash(content)) % 10000}"
        collection.add(documents=[content], embeddings=[embedding], ids=[new_id])
        collection.persist()  # ✅ Fixed: use collection.persist(), not client.persist()
        return [{"message": "✅ No similar challenge found. Added to vector DB."}]

    except Exception as e:
        return [{"error": f"Similarity check failed: {str(e)}"}]
