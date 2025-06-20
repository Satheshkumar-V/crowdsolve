from flask import Flask, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route("/suggest-deadlines", methods=["POST"])
def suggest_deadlines():
    data = request.json
    task_count = int(data.get("task_count", 5))
    start_date = datetime.now()
    deadlines = [start_date + timedelta(days=i*2) for i in range(task_count)]

    return jsonify({
        "deadlines": [d.strftime("%Y-%m-%d") for d in deadlines]
    })

if __name__ == "__main__":
    app.run(port=7004)
