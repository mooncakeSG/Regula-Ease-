import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def ask_compliance_bot(user_question, conversation_history=None, tone="professional", business_type=None, user_preferences=None):
    """
    Send a user question to the Groq API with enhanced context and return the assistant's response.
    
    Args:
        user_question (str): The current question from the user
        conversation_history (list): Previous conversation messages for context
        tone (str): Conversation tone - "professional", "casual", or "friendly"
        business_type (str): Type of business for industry-specific responses
        user_preferences (dict): User preferences for personalization
        
    Returns:
        str: The assistant's response or an error message
    """
    # API configuration
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    model = "meta-llama/llama-4-scout-17b-16e-instruct"
    
    # Enhanced system prompt with South African context
    system_prompt = _build_system_prompt(tone, business_type, user_preferences)
    
    # Get API key from environment variable
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        print("ERROR: GROQ_API_KEY not found in environment variables")
        return "Sorry, I couldn't get a response right now."
    
    # Prepare headers
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Build conversation messages with context
    messages = _build_conversation_messages(system_prompt, conversation_history, user_question)
    
    # Prepare the request payload with enhanced parameters
    payload = {
        "model": model,
        "messages": messages,
        "temperature": _get_temperature_by_tone(tone),
        "max_tokens": 1024,
        "top_p": 0.9,
        "frequency_penalty": 0.1,
        "presence_penalty": 0.1
    }
    
    try:
        # Debug: Print request info (without API key)
        print(f"DEBUG: Making request to {api_url}")
        print(f"DEBUG: Model: {model}")
        print(f"DEBUG: Tone: {tone}, Business Type: {business_type}")
        print(f"DEBUG: Context messages: {len(messages)}")
        
        # Make the API request
        response = requests.post(api_url, headers=headers, json=payload, timeout=30)
        
        # Check if the request was successful
        if response.status_code == 200:
            response_data = response.json()
            # Extract the assistant's message from the response
            if 'choices' in response_data and len(response_data['choices']) > 0:
                assistant_reply = response_data['choices'][0]['message']['content']
                return assistant_reply.strip()
            else:
                print("ERROR: No choices in API response")
                print(f"Response data: {response_data}")
                return "Sorry, I couldn't get a response right now."
        else:
            # Enhanced error debugging
            print(f"Groq API error - Status code: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            try:
                error_data = response.json()
                print(f"Error response: {error_data}")
            except:
                print(f"Raw response text: {response.text}")
            return "Sorry, I couldn't get a response right now."
            
    except requests.exceptions.RequestException as e:
        # Handle network errors, timeouts, etc.
        print(f"Request error: {e}")
        return "Sorry, I couldn't get a response right now."
    except json.JSONDecodeError as e:
        # Handle JSON parsing errors
        print(f"JSON decode error: {e}")
        return "Sorry, I couldn't get a response right now."
    except Exception as e:
        # Handle any other unexpected errors
        print(f"Unexpected error: {e}")
        return "Sorry, I couldn't get a response right now."


def _build_system_prompt(tone, business_type, user_preferences):
    """
    Build an enhanced system prompt based on tone, business type, and user preferences.
    """
    base_prompt = """You are an expert business advisor specializing in South African small business development. You have deep knowledge of:

🏛️ REGULATORY FRAMEWORK:
- CIPC registration and compliance
- SARS tax obligations and deadlines  
- Labour law and BEE requirements
- Provincial and municipal licensing
- Industry-specific regulations

💼 BUSINESS DEVELOPMENT:
- Funding opportunities (SEDA, IDC, NEF)
- Market entry strategies for South African context
- Digital transformation for SMMEs
- Export opportunities within SADC region

🌍 LOCAL CONTEXT:
- Provincial business incentives
- Township economy opportunities
- Rural business development
- Language and cultural considerations
- Economic empowerment programs"""

    # Tone adjustments
    tone_instructions = {
        "professional": "\n\n📋 COMMUNICATION STYLE: Maintain a professional, consultative tone. Use business terminology appropriately and provide structured, actionable advice.",
        "casual": "\n\n💬 COMMUNICATION STYLE: Be conversational and approachable. Use everyday language while maintaining expertise. Be encouraging and supportive.",
        "friendly": "\n\n😊 COMMUNICATION STYLE: Be warm, encouraging, and motivational. Show enthusiasm for their business journey. Use inclusive language and celebrate their progress."
    }
    
    # Business type specialization
    business_context = ""
    if business_type:
        business_contexts = {
            "retail": "\n\n🏪 SPECIALIZATION: Focus on retail business needs including inventory management, point-of-sale systems, customer service, location strategy, and retail compliance.",
            "services": "\n\n🛠️ SPECIALIZATION: Emphasize service delivery, client management, professional indemnity, skills development, and service quality standards.",
            "manufacturing": "\n\n🏭 SPECIALIZATION: Address production processes, supply chain management, quality control, industrial relations, and manufacturing compliance.",
            "technology": "\n\n💻 SPECIALIZATION: Focus on IP protection, data privacy, software licensing, tech startup ecosystem, and digital business models.",
            "food": "\n\n🍽️ SPECIALIZATION: Cover food safety regulations, health permits, supplier management, hygiene standards, and food industry compliance.",
            "hospitality": "\n\n🏨 SPECIALIZATION: Address tourism licensing, guest services, hospitality standards, seasonal business planning, and industry regulations."
        }
        business_context = business_contexts.get(business_type.lower(), "")
    
    # User preference customization
    preference_context = ""
    if user_preferences:
        if user_preferences.get('language_preference'):
            preference_context += f"\n\n🌍 LANGUAGE: The user prefers communication in {user_preferences['language_preference']}. Adapt your terminology accordingly."
        if user_preferences.get('experience_level'):
            levels = {
                'beginner': "Explain concepts in simple terms and provide step-by-step guidance.",
                'intermediate': "Provide detailed explanations with practical examples.",
                'advanced': "Focus on strategic insights and advanced considerations."
            }
            preference_context += f"\n\n📚 EXPERIENCE LEVEL: {levels.get(user_preferences['experience_level'], '')}"
    
    return base_prompt + tone_instructions.get(tone, tone_instructions["professional"]) + business_context + preference_context + "\n\n🎯 Always provide specific, actionable advice relevant to the South African business environment."


def _build_conversation_messages(system_prompt, conversation_history, current_question):
    """
    Build the message array for the API request including conversation context.
    """
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add conversation history for context (limit to last 10 exchanges to avoid token limits)
    if conversation_history:
        # Take the most recent conversation history
        recent_history = conversation_history[-20:] if len(conversation_history) > 20 else conversation_history
        
        for msg in recent_history:
            if msg.get('type') == 'user':
                messages.append({"role": "user", "content": msg['content']})
            elif msg.get('type') == 'ai':
                messages.append({"role": "assistant", "content": msg['content']})
    
    # Add the current question
    messages.append({"role": "user", "content": current_question})
    
    return messages


def _get_temperature_by_tone(tone):
    """
    Adjust AI creativity based on selected tone.
    """
    temperatures = {
        "professional": 0.3,  # More focused and consistent
        "casual": 0.7,        # Balanced creativity
        "friendly": 0.8       # More creative and expressive
    }
    return temperatures.get(tone, 0.7)


def get_conversation_summary(conversation_history):
    """
    Generate a summary of the conversation for long-term context.
    """
    if not conversation_history or len(conversation_history) < 4:
        return None
    
    # Extract key topics and business interests
    user_messages = [msg['content'] for msg in conversation_history if msg.get('type') == 'user']
    
    # Simple keyword extraction for business context
    business_keywords = {
        'registration': ['register', 'registration', 'cipc', 'company', 'business name'],
        'tax': ['tax', 'vat', 'sars', 'income tax', 'tax number'],
        'funding': ['funding', 'loan', 'investment', 'capital', 'grant'],
        'compliance': ['compliance', 'legal', 'license', 'permit', 'regulation'],
        'marketing': ['marketing', 'advertising', 'social media', 'customers', 'branding']
    }
    
    topics_discussed = []
    for topic, keywords in business_keywords.items():
        if any(keyword in ' '.join(user_messages).lower() for keyword in keywords):
            topics_discussed.append(topic)
    
    if topics_discussed:
        return f"Previous conversation topics: {', '.join(topics_discussed)}"
    
    return None


# Example usage (for testing purposes)
if __name__ == "__main__":
    # Test the enhanced function
    test_question = "What are the basic tax requirements for a small business in South Africa?"
    test_history = [
        {"type": "user", "content": "I want to start a retail business"},
        {"type": "ai", "content": "That's great! I'd be happy to help you start your retail business in South Africa..."}
    ]
    
    result = ask_compliance_bot(
        test_question, 
        conversation_history=test_history,
        tone="friendly",
        business_type="retail"
    )
    print(f"Question: {test_question}")
    print(f"Response: {result}") 