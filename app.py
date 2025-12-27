from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY', 'AIzaSyCLlFuM75kpff_Xx9EqY0-Hyi0n6Gv3nYE') #replace this with your api key
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")
chat = model.start_chat(history=[])

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/chat', methods=['POST'])
def chat_response():
    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({"error": "Message not provided"}), 400

        response_raw = chat.send_message(user_input)
        
        if hasattr(response_raw, "candidates") and len(response_raw.candidates) > 0:
            text = response_raw.candidates[0].content.parts[0].text
        elif hasattr(response_raw, "text"):
            text = response_raw.text
        else:
            text = str(response_raw)

        print(f"User: {user_input}")
        print(f"Bot: {text}")

        return jsonify({"response": text})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
