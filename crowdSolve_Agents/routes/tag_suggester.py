from flask import Blueprint, request, jsonify
from services.tag_suggester_service import get_suggested_tags

tag_suggester = Blueprint("tag_suggester", __name__)

@tag_suggester.route("/suggest-tags", methods=["POST"])
def suggest_tags():
    content = request.json.get("content", "")
    try:
        tags = get_suggested_tags(content)
        return jsonify({"tags": tags})
    except Exception as e:
        return jsonify({"error": "Tag suggestion failed", "detail": str(e)}), 500
