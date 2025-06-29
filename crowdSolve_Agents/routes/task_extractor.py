from flask import Blueprint, request, jsonify
from services.task_extractor_service import extract_tasks_from_solution

task_extractor = Blueprint("task_extractor", __name__)

@task_extractor.route("/extract-tasks", methods=["POST"])
def extract_tasks():
    solution = request.json.get("content", "")
    print("🧪 [Task Extractor] Incoming solution:", solution)
    try:
        tasks = extract_tasks_from_solution(solution)
        print("✅ Extracted tasks:", tasks)
        return jsonify({"tasks": tasks})
    except Exception as e:
        print("❌ Task extraction failed:", str(e))
        return jsonify({"error": "Task extraction failed", "detail": str(e)}), 500