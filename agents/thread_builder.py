from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
llm = ChatOpenAI(temperature=0.3)

@app.route("/build-thread", methods=["POST"])
def build_thread():
    data = request.json
    idea = data.get("idea", "")

    prompt = f"Given the idea: {idea}, break it into 3 potential directions or sub-solutions."
    response = llm.predict(prompt)
    
    return jsonify({ "threads": response.split("\n") })

if __name__ == "__main__":
    app.run(port=7002)
