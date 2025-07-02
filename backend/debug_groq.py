#!/usr/bin/env python3
"""
Debug script to test Groq API connection
Run this to verify your API key and troubleshoot issues
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_groq_api():
    """Test the Groq API connection with detailed debugging."""
    
    print("🔍 Groq API Debug Test")
    print("=" * 50)
    
    # Check if API key is loaded
    api_key = os.getenv('GROQ_API_KEY')
    if not api_key:
        print("❌ ERROR: GROQ_API_KEY not found in environment variables")
        print("Make sure you have a .env file with GROQ_API_KEY=your_key_here")
        return False
    
    print(f"✅ API key loaded (length: {len(api_key)})")
    print(f"✅ API key starts with: {api_key[:10]}...")
    
    # Test API endpoint
    api_url = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Simple test payload
    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {
                "role": "user",
                "content": "Hello, please respond with just 'API working'"
            }
        ],
        "max_tokens": 50
    }
    
    print(f"\n📡 Testing connection to: {api_url}")
    print(f"📝 Using model: {payload['model']}")
    
    try:
        response = requests.post(api_url, headers=headers, json=payload, timeout=30)
        
        print(f"\n📊 Response Status: {response.status_code}")
        print(f"📊 Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print("🎉 SUCCESS! API is working correctly")
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                message = response_data['choices'][0]['message']['content']
                print(f"🤖 Bot Response: {message}")
                return True
            else:
                print("⚠️  Unexpected response format")
                print(f"Response: {response_data}")
                return False
        else:
            print("❌ API Error!")
            try:
                error_data = response.json()
                print(f"Error Details: {json.dumps(error_data, indent=2)}")
                
                # Common error handling
                if response.status_code == 401:
                    print("\n💡 This is an authentication error. Possible causes:")
                    print("   - Invalid API key")
                    print("   - API key might be expired")
                    print("   - Check if you copied the key correctly")
                elif response.status_code == 429:
                    print("\n💡 Rate limit exceeded. Try again in a few minutes.")
                elif response.status_code == 404:
                    print("\n💡 Model not found. Check if the model name is correct.")
                    
            except:
                print(f"Raw error response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Cannot reach Groq API")
        print("Check your internet connection")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def check_env_file():
    """Check if .env file exists and is readable."""
    print("\n📁 Environment File Check")
    print("=" * 30)
    
    if os.path.exists('.env'):
        print("✅ .env file found")
        try:
            with open('.env', 'r') as f:
                lines = f.readlines()
                groq_lines = [line for line in lines if 'GROQ_API_KEY' in line and not line.strip().startswith('#')]
                if groq_lines:
                    print(f"✅ GROQ_API_KEY found in .env file")
                    # Don't print the actual key for security
                    print(f"   Line: GROQ_API_KEY=***{groq_lines[0].split('=')[1].strip()[-5:] if len(groq_lines[0].split('=')) > 1 else ''}")
                else:
                    print("❌ GROQ_API_KEY not found in .env file")
        except Exception as e:
            print(f"❌ Error reading .env file: {e}")
    else:
        print("❌ .env file not found")
        print("Create a .env file with: GROQ_API_KEY=your_key_here")

if __name__ == "__main__":
    check_env_file()
    success = test_groq_api()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 All tests passed! Your Groq API is working correctly.")
        print("The chatbot should work now.")
    else:
        print("⚠️  There are issues with your Groq API setup.")
        print("Fix the errors above and try again.")
    print("=" * 50) 