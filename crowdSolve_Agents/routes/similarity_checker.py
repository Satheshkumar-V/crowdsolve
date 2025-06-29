from flask import Blueprint, request, jsonify
from services.similarity_service import query_similar_challenges, add_challenge_to_index

similarity_checker = Blueprint("similarity_checker", __name__)

@similarity_checker.route("/check-similarity", methods=["POST"])
def check_similarity():
    content = request.json.get("content", "")
    try:
        similar = query_similar_challenges(content)
        return jsonify({"similar": similar})
    except Exception as e:
        return jsonify({"error": "Similarity check failed", "detail": str(e)}), 500

@similarity_checker.route("/add-challenge", methods=["POST"])
def add_to_index():
    content = request.json.get("content")
    challenge_id = request.json.get("challengeId")
    try:
        add_challenge_to_index(challenge_id, content)
        return jsonify({"status": "indexed"})
    except Exception as e:
        return jsonify({"error": "Indexing failed", "detail": str(e)}), 500