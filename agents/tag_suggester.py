from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

llm = ChatOpenAI(
    temperature=0.3,
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),  # 👈 You'll set this
    model="mistralai/mistral-7b-instruct"  # ✅ Free & powerful
)

@app.route("/suggest-tags", methods=["POST"])
def suggest_tags():
    data = request.json
    content = data.get("content", "")

    prompt = PromptTemplate.from_template("""
        Suggest 5 relevant tags for the following community challenge:
        "{content}"
        Return as a list of lowercase strings.
    """)
    
    output = llm(prompt.format(content=content))
    return jsonify({"tags": output.strip().split("\n")})

if __name__ == "__main__":
    app.run(port=7001)
