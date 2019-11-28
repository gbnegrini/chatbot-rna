from flask import Flask, request, jsonify
from flask_cors import CORS
from os import environ
import aiml

app = Flask(__name__)
CORS(app)
k = aiml.Kernel()
k.learn("std-startup.xml")
k.respond("load aiml b")

@app.route('/api/v1/aiml', methods=['GET', 'POST'])
def chatbot_response():
    query_params = request.args
    question = query_params.get('question')

    text = k.respond(question)
    print(text)

    return jsonify(text=text)


if __name__ == '__main__':
    port = int(environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)

    #app.run()
