from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
from bot import ask_compliance_bot

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Helper function to load JSON data
def load_json_file(filename):
    """Load JSON data from the data directory."""
    try:
        with open(f'data/{filename}', 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None

@app.route('/checklist', methods=['GET'])
def get_checklist():
    """
    GET /checklist route
    Accepts a 'type' query parameter and returns compliance steps for that business type.
    """
    business_type = request.args.get('type')
    
    if not business_type:
        return jsonify({
            'error': 'Business type parameter is required',
            'message': 'Please provide a business type using the "type" query parameter'
        }), 400
    
    # Load checklist data
    checklist_data = load_json_file('checklist.json')
    
    if checklist_data is None:
        return jsonify({
            'error': 'Server error',
            'message': 'Could not load checklist data'
        }), 500
    
    # Check if the business type exists
    if business_type.lower() not in checklist_data:
        available_types = list(checklist_data.keys())
        return jsonify({
            'error': 'Invalid business type',
            'message': f'Business type "{business_type}" not found',
            'available_types': available_types
        }), 400
    
    return jsonify({
        'business_type': business_type,
        'checklist': checklist_data[business_type.lower()]
    })

@app.route('/skills', methods=['GET'])
def get_skills():
    """
    GET /skills route
    Accepts a 'category' query parameter and returns learning resources for that category.
    """
    category = request.args.get('category')
    
    if not category:
        return jsonify({
            'error': 'Category parameter is required',
            'message': 'Please provide a category using the "category" query parameter'
        }), 400
    
    # Load skills data
    skills_data = load_json_file('skills.json')
    
    if skills_data is None:
        return jsonify({
            'error': 'Server error',
            'message': 'Could not load skills data'
        }), 500
    
    # Check if the category exists
    if category.lower() not in skills_data:
        available_categories = list(skills_data.keys())
        return jsonify({
            'error': 'Invalid category',
            'message': f'Category "{category}" not found',
            'available_categories': available_categories
        }), 400
    
    return jsonify({
        'category': category,
        'resources': skills_data[category.lower()]
    })

@app.route('/chatbot', methods=['POST'])
def chatbot():
    """
    POST /chatbot route
    Accepts a JSON body with a 'message' field and returns the chatbot's response.
    """
    if not request.is_json:
        return jsonify({
            'error': 'Invalid request format',
            'message': 'Request must be JSON'
        }), 400
    
    data = request.get_json()
    message = data.get('message')
    
    if not message:
        return jsonify({
            'error': 'Message is required',
            'message': 'Please provide a message in the request body'
        }), 400
    
    if not isinstance(message, str) or not message.strip():
        return jsonify({
            'error': 'Invalid message',
            'message': 'Message must be a non-empty string'
        }), 400
    
    # Call the compliance bot
    try:
        response = ask_compliance_bot(message.strip())
        return jsonify({
            'user_message': message.strip(),
            'bot_response': response
        })
    except Exception as e:
        return jsonify({
            'error': 'Chatbot error',
            'message': 'Sorry, I couldn\'t process your request right now.'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for deployment platforms."""
    return jsonify({
        'status': 'healthy',
        'message': 'Small Business Support API is running'
    })

@app.route('/', methods=['GET'])
def home():
    """Root endpoint with API information."""
    return jsonify({
        'message': 'Small Business Support API',
        'version': '1.0.0',
        'endpoints': {
            'GET /checklist': 'Get compliance checklist by business type',
            'GET /skills': 'Get learning resources by category',
            'POST /chatbot': 'Chat with compliance assistant',
            'GET /health': 'Health check'
        }
    })

if __name__ == '__main__':
    # For development
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
