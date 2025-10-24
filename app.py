from flask import Flask, request, jsonify, render_template
from textblob import TextBlob
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    text = request.form.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        analysis = TextBlob(text)
        polarity = analysis.sentiment.polarity
        
        if polarity > 0.1:
            sentiment = "😊 Positive"
        elif polarity < -0.1:
            sentiment = "😔 Negative"
        else:
            sentiment = "😐 Neutral"
        
        return jsonify({"sentiment": sentiment, "polarity": polarity})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
