from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
llm = ChatOpenAI()

@app.route("/extract-tasks", methods=["POST"])
def extract_tasks():
    data = request.json
    solution_text = data.get("solution", "")

    prompt = f"Convert this solution into a list of actionable tasks with short titles:\n{solution_text}"
    response = llm.predict(prompt)

    return jsonify({ "tasks": response.split("\n") })

if __name__ == "__main__":
    app.run(port=7003)
