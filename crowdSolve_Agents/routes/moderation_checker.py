from flask import Blueprint, request, jsonify
from services.moderation_service import moderate_text

moderation_checker = Blueprint("moderation_checker", __name__)

@moderation_checker.route("/moderate-content", methods=["POST"])
def moderate_content():
    content = request.json.get("content", "")
    try:
        result = moderate_text(content)
        return jsonify({"moderation_result": result})
    except Exception as e:
        return jsonify({"error": "Moderation failed", "detail": str(e)}), 500
