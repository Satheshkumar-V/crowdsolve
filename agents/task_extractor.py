from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

llm = ChatOpenAI(
    temperature=0.3,
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    model="mistralai/mistral-7b-instruct"
)

@app.route("/extract-tasks", methods=["POST"])
def extract_tasks():
    data = request.json
    solution_text = data.get("solution", "")
    prompt = f"Convert this solution into a list of actionable tasks with short titles:\n{solution_text}"

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        return jsonify({"tasks": response.content.strip().split("\n")})
    except Exception as e:
        return jsonify({"error": "Failed to generate tasks", "detail": str(e)}), 500

if __name__ == "__main__":
    app.run(port=7003)
