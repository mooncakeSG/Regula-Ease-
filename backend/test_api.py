#!/usr/bin/env python3
"""
Simple test script for the Small Business Support API
Run this after starting the Flask app to verify all endpoints work.
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_endpoint(method, endpoint, data=None, params=None):
    """Test a single API endpoint and print results."""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, params=params)
        elif method.upper() == "POST":
            response = requests.post(url, json=data)
        else:
            print(f"❌ Unsupported method: {method}")
            return False
        
        print(f"\n{'='*60}")
        print(f"Testing: {method.upper()} {endpoint}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ SUCCESS")
            response_json = response.json()
            print("Response Preview:")
            print(json.dumps(response_json, indent=2)[:300] + "..." if len(str(response_json)) > 300 else json.dumps(response_json, indent=2))
            return True
        else:
            print(f"❌ FAILED")
            try:
                error_data = response.json()
                print("Error Response:")
                print(json.dumps(error_data, indent=2))
            except:
                print(f"Response Text: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"❌ Connection Error: Could not connect to {url}")
        print("Make sure the Flask app is running on localhost:5000")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Run all API tests."""
    print("🧪 Testing Small Business Support API")
    print("="*60)
    
    tests = [
        # Test root endpoint
        ("GET", "/", None, None),
        
        # Test health check
        ("GET", "/health", None, None),
        
        # Test checklist endpoints
        ("GET", "/checklist", None, {"type": "retail"}),
        ("GET", "/checklist", None, {"type": "services"}),
        ("GET", "/checklist", None, {"type": "invalid_type"}),  # Should fail
        ("GET", "/checklist", None, None),  # Should fail - missing parameter
        
        # Test skills endpoints
        ("GET", "/skills", None, {"category": "finance"}),
        ("GET", "/skills", None, {"category": "digital"}),
        ("GET", "/skills", None, {"category": "invalid_category"}),  # Should fail
        ("GET", "/skills", None, None),  # Should fail - missing parameter
        
        # Test chatbot endpoint
        ("POST", "/chatbot", {"message": "What are the basic requirements to start a retail business in South Africa?"}, None),
        ("POST", "/chatbot", {"message": ""}, None),  # Should fail - empty message
        ("POST", "/chatbot", {}, None),  # Should fail - missing message
    ]
    
    passed = 0
    failed = 0
    
    for method, endpoint, data, params in tests:
        success = test_endpoint(method, endpoint, data, params)
        if success:
            passed += 1
        else:
            failed += 1
    
    print(f"\n{'='*60}")
    print(f"🏁 Test Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed! Your API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the output above for details.")
        
    print("\n📝 Notes:")
    print("- Expected failures for invalid parameters are normal")
    print("- Chatbot tests require a valid GROQ_API_KEY in your .env file")
    print("- Make sure your Flask app is running before running this test")

if __name__ == "__main__":
    main() 