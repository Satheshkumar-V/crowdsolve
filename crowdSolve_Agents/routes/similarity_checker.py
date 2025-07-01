from flask import Blueprint, request, jsonify
from tools.similarity_tool import similarity_check_or_add
similarity_checker = Blueprint("similarity_checker", __name__)

@similarity_checker.route("/check-similarity", methods=["POST"])
def check_similarity():
    content = request.json.get("content", "")
    print("📥 Received content for similarity:", content)
    try:
        results = similarity_check_or_add(content)
        print("✅ Similarity results:", results)
        return jsonify({"similar": results})
    except Exception as e:
        print("❌ Error in similarity check:", str(e))
        return jsonify({"error": "Similarity check failed", "detail": str(e)}), 500

@similarity_checker.route("/add-challenge", methods=["POST"])
def add_to_index():
    content = request.json.get("content", "")
    challenge_id = request.json.get("challengeId", "")
    try:
        similarity_check_or_add(content, challenge_id)
        return jsonify({"status": "indexed"})
    except Exception as e:
        return jsonify({"error": "Indexing failed", "detail": str(e)}), 500
