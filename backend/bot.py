import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def ask_compliance_bot(user_question):
    """
    Send a user question to the Groq API and return the assistant's response.
    
    Args:
        user_question (str): The question from the user
        
    Returns:
        str: The assistant's response or an error message
    """
    # API configuration
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    model = "meta-llama/llama-4-scout-17b-16e-instruct"
    system_prompt = "You are a helpful assistant for South African small business owners. Explain compliance and business skills in plain English."
    
    # Get API key from environment variable
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        print("ERROR: GROQ_API_KEY not found in environment variables")
        return "Sorry, I couldn't get a response right now."
    
    # Debug: Print API key length for verification (don't print the actual key)
    # Uncomment the line below for debugging:
    # print(f"DEBUG: API key loaded, length: {len(api_key)}")
    
    # Prepare headers
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Prepare the request payload
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_question
            }
        ],
        "temperature": 0.7,
        "max_tokens": 1024
    }
    
    try:
        # Debug: Print request info (without API key)
        print(f"DEBUG: Making request to {api_url}")
        print(f"DEBUG: Model: {model}")
        print(f"DEBUG: Payload: {json.dumps(payload, indent=2)}")
        
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


# Example usage (for testing purposes)
if __name__ == "__main__":
    # Test the function with a sample question
    test_question = "What are the basic tax requirements for a small business in South Africa?"
    result = ask_compliance_bot(test_question)
    print(f"Question: {test_question}")
    print(f"Response: {result}") 