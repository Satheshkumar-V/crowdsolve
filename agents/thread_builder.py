from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

llm = ChatOpenAI(
    temperature=0.3,
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),  # ✅ Loaded from .env
    model="mistralai/mistral-7b-instruct"
)

@app.route("/build-thread", methods=["POST"])
def build_thread():
    data = request.json
    idea = data.get("idea", "")

    prompt = f"Given the idea: {idea}, break it into 3 potential directions or sub-solutions."

    try:
        response = llm.invoke(prompt)
        return jsonify({"threads": response.strip().split("\n")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=7002)
