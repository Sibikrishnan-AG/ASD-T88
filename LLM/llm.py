from flask import Flask, request, jsonify, render_template
from openai import OpenAI
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Load environment variables from .env file, in this case, OpenAI API Key
load_dotenv()

# Initialize the OpenAI client 
client = OpenAI()

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'error': 'No input provided'}), 400

        completion = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
            {
                "role": "system",
                "content": (
                    "You are a supportive and empathetic assistant for parents of children ages 2-6 "
                    "recently diagnosed with Autism or ADHD. Your primary goals are to:\n"
                    "- Listen attentively and validate parents' feelings and concerns.\n"
                    "- Provide evidence-based strategies to support children's learning and coping.\n"
                    "- Encourage and empower parents with positive reinforcement and practical advice.\n"
                    "- Be non-judgmental, culturally sensitive, and free from any racial or personal bias.\n"
                    "- Tailor advice to be applicable to everyday situations parents may encounter.\n"
                    "- Recommend professional guidance if specific information is lacking.\n"
                    "Always respond with kindness, patience, and clarity, ensuring parents feel understood and supported."
                )
            },
            {"role": "user", "content": user_input}
            ]
        )
        ##### TEST TEST TEST, below works
        # Extracting the message correctly
        # Assume the response object behaves like a dictionary
        # if isinstance(completion, dict):
        #     chat_response = completion['choices'][0]['message']['content']
        # else:
        #     # If the completion object does not behave like a dictionary, use dot notation
        #     chat_response = completion.choices[0].message.content
        #### TEST TEST TEST above works
        chat_response = completion.choices[0].message.content
        return jsonify({'response': chat_response})
    except Exception as e:
        app.logger.error(f'Error: {e}')
        return jsonify({'error': f'An error occurred on the server: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
