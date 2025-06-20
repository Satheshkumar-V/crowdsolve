from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
import os

app = Flask(__name__)
llm = ChatOpenAI(temperature=0.2, model="gpt-4")

@app.route("/suggest-tags", methods=["POST"])
def suggest_tags():
    data = request.json
    content = data.get("content", "")

    prompt = PromptTemplate.from_template("""
        Suggest 5 relevant tags for the following community challenge:
        "{content}"
        Return as a list of lowercase strings.
    """)
    
    output = llm.predict(prompt.format(content=content))
    return jsonify({ "tags": output.split("\n") })

if __name__ == "__main__":
    app.run(port=7001)
