from flask import Flask
from routes.tag_suggester import tag_suggester
from routes.task_extractor import task_extractor
from routes.similarity_checker import similarity_checker
from routes.moderation_checker import moderation_checker

app = Flask(__name__)
app.register_blueprint(tag_suggester, url_prefix="/agent")
app.register_blueprint(task_extractor, url_prefix="/agent")
app.register_blueprint(similarity_checker, url_prefix="/agent")
app.register_blueprint(moderation_checker, url_prefix="/agent")

if __name__ == "__main__":
    app.run(port=8000, debug = True)
