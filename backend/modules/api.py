from flask import Flask, jsonify
import modules.classifier as classifier

app = Flask(__name__)
greetings = []


@app.route("/classify/prompts", methods=["GET"])
def get_prompts():
    return jsonify(classifier.Classifier().prompt_parts)


@app.route("/classify/<input>")
def classify_inp(input: str):
    data = classifier.Classifier().genJson(input)
    print(data)
    return jsonify(data)
