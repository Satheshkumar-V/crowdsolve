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
        example query 1 = "the students were more stress these days"  
        suggestion tag 1 = #education, #mental_health

        example query 2 = "how do i reset my password"  
        suggestion tag 2 = #password_reset, #education

        example query 3 = "how can we make the campus more eco-friendly?"  
        suggestion tag 3 = #sustainability, #campus_life

        example query 4 = "I’m struggling to stay motivated during online classes"  
        suggestion tag 4 = #mental_health, #remote_learning

        example query 5 = "need help organizing a college hackathon"  
        suggestion tag 5 = #events, #coding, #student_community
        "{content}"
        Return as a list of lowercase strings.
    """)
    
    output = llm(prompt.format(content=content))
    return jsonify({"tags": output.strip().split("\n")})

if __name__ == "__main__":
    app.run(port=7001)
