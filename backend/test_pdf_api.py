#!/usr/bin/env python3
"""
Test script for PDF export API endpoint
"""

import requests
import json

def test_pdf_export_api():
    """Test the PDF export API endpoint"""
    
    # Test data
    test_data = {
        "type": "comprehensive",
        "businessType": "retail",
        "progressData": {
            "checklist": {
                "total": 15,
                "completed": 10,
                "percentage": 67,
                "priorityDistribution": {
                    "high": 2,
                    "medium": 5,
                    "low": 3
                }
            },
            "skills": {
                "totalResources": 25,
                "bookmarked": 8,
                "categories": ["Finance", "Digital", "Management", "Legal"],
                "categoryBookmarks": [3, 2, 2, 1]
            },
            "quiz": {
                "score": 7,
                "totalQuestions": 10,
                "category": "Business Compliance",
                "completedAt": "2025-01-04"
            }
        }
    }
    
    print("Testing PDF export API...")
    print(f"API URL: http://localhost:8080/export-pdf")
    
    try:
        # Make request to PDF export endpoint
        response = requests.post(
            "http://localhost:8080/export-pdf",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Content Type: {response.headers.get('content-type', 'N/A')}")
        
        if response.status_code == 200:
            # Save the PDF file
            with open('test_api_report.pdf', 'wb') as f:
                f.write(response.content)
            
            print("✅ PDF API test successful!")
            print("📄 PDF saved as: test_api_report.pdf")
            print(f"📊 File size: {len(response.content)} bytes")
            
            return True
        else:
            print(f"❌ API request failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to Flask server")
        print("Make sure the Flask server is running on http://localhost:8080")
        return False
    except Exception as e:
        print(f"❌ Error during API test: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("PDF Export API Test")
    print("=" * 50)
    
    success = test_pdf_export_api()
    
    if success:
        print("\n✅ PDF API test passed!")
    else:
        print("\n❌ PDF API test failed!")
        exit(1) 