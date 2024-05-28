from flask import Flask, jsonify
from gemini import Classifier

app = Flask(__name__)
greetings = []


@app.route("/classify/prompts", methods=["GET"])
def get_prompts():
    return jsonify(Classifier().prompt_parts)

@app.route("/classify/<input>")
def classify_inp(input: str):
    data = Classifier().genJson(input)
    print(data)
    return jsonify(data)
