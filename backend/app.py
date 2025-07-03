from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
from bot import ask_compliance_bot

# Load environment variables
load_dotenv()

# Check if we're in production (static files available)
static_folder = 'static' if os.path.exists('static') else None

# Configure Flask to serve static files from the React build
if static_folder:
    # Set up Flask to serve static files from the nested static directory
    app = Flask(__name__, static_folder=os.path.join(static_folder, 'static'), static_url_path='/static')
else:
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
    Enhanced chatbot with conversation context, tone adjustment, and industry customization.
    
    Expected JSON body:
    {
        "message": "Your question here",
        "conversation_history": [...],  // Optional: Previous conversation messages
        "tone": "professional|casual|friendly",  // Optional: Conversation tone
        "business_type": "retail|services|...",  // Optional: Business type for context
        "user_preferences": {...}  // Optional: User preferences for personalization
    }
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
    
    # Extract optional parameters
    conversation_history = data.get('conversation_history', [])
    tone = data.get('tone', 'professional')
    business_type = data.get('business_type')
    user_preferences = data.get('user_preferences', {})
    
    # Validate tone parameter
    valid_tones = ['professional', 'casual', 'friendly']
    if tone not in valid_tones:
        tone = 'professional'
    
    # Validate conversation history format
    if conversation_history and not isinstance(conversation_history, list):
        conversation_history = []
    
    # Call the enhanced compliance bot
    try:
        response = ask_compliance_bot(
            message.strip(),
            conversation_history=conversation_history,
            tone=tone,
            business_type=business_type,
            user_preferences=user_preferences
        )
        
        return jsonify({
            'user_message': message.strip(),
            'bot_response': response,
            'context': {
                'tone': tone,
                'business_type': business_type,
                'conversation_length': len(conversation_history)
            }
        })
    except Exception as e:
        print(f"Chatbot error: {e}")
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
    """Root endpoint - serves React app in production, API info in development."""
    # In production, serve the React app
    if static_folder and os.path.exists(os.path.join('static', 'index.html')):
        return send_from_directory('static', 'index.html')
    
    # In development, return API information
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

# Flask will handle static files natively with the configured static_folder

# Serve favicon and other root-level files
@app.route('/favicon.ico')
def favicon():
    """Serve favicon from React build."""
    if static_folder:
        return send_from_directory('static', 'favicon.ico')
    return jsonify({'error': 'Favicon not available'}), 404

@app.route('/manifest.json')
def manifest():
    """Serve manifest.json from React build."""
    if static_folder:
        return send_from_directory('static', 'manifest.json')
    return jsonify({'error': 'Manifest not available'}), 404

# Catch-all route for React Router (must be last)
@app.route('/<path:path>')
def catch_all(path):
    """Catch-all route for React Router - serves index.html for any unmatched route."""
    # Don't interfere with API routes
    if path.startswith('api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    
    # Serve React app for all other routes
    if static_folder and os.path.exists(os.path.join('static', 'index.html')):
        return send_from_directory('static', 'index.html')
    
    return jsonify({'error': 'Frontend not available'}), 404

if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 8080))
    debug = os.environ.get('NODE_ENV') != 'production'
    
    print(f"Starting RegulaEase API on port {port}")
    print(f"Debug mode: {debug}")
    print(f"Static folder: {static_folder}")
    
    app.run(debug=debug, host='0.0.0.0', port=port)
