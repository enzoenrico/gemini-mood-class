from flask import Flask, jsonify
import random
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
    emotionArr = random.choice([["Happy", "Excited"], ["Sad", "Stressed"]])
    color = random.choice(["#FFD700", "#FF0000"])
    return (
        jsonify({"emotions": emotionArr, "color":color}),
        200,
        {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    )
