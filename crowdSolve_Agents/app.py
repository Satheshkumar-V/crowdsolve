from flask import Flask
from flask_cors import CORS
from routes.similarity_checker import similarity_checker
from core.pipeline import run_similarity_pipeline
from routes.tag_route import tag_suggester

app = Flask(__name__)
CORS(app)


# Register only the similarity checker for now
app.register_blueprint(similarity_checker, url_prefix="/agent")
app.register_blueprint(tag_suggester, url_prefix="/agent")

# Run similarity agent at startup (for warmup/debugging)
if __name__ == "__main__":
    print("🚀 Running Similarity Agent LangGraph Pipeline...")
    try:
        result = run_similarity_pipeline("how do we reduce food wastage?")
        print("✅ Similarity Agent Results:")
        for i, item in enumerate(result["similar_results"], 1):
            print(f"{i}. {item['text']} (score: {item['score']})")
    except Exception as e:
        print(f"❌ Failed to run similarity agent: {e}")

    app.run(port=8000, debug=True)
