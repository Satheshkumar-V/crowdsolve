from flask import Blueprint, request, jsonify
from core.pipeline import run_tag_pipeline

tag_suggester = Blueprint("tag_suggester", __name__)

@tag_suggester.route("/suggest-tags", methods=["POST"])
def suggest_tags():
    content = request.json.get("content", "")
    if not content.strip():
        return jsonify({"error": "Empty content"}), 400
    try:
        result = run_tag_pipeline(content)
        return jsonify({"tags": result["suggested_tags"]})
    except Exception as e:
        return jsonify({"error": "Failed to generate tags", "detail": str(e)}), 500
