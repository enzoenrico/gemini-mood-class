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
    return (
        jsonify(data),
        200,
        {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    )


@app.route("/classify/test")
def return_test():
    return (
        jsonify({"emotions": ["Sad", "Stressed"], "color": "#616161"}),
        200,
        {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    )
