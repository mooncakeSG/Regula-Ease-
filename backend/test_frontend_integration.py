#!/usr/bin/env python3
"""
Frontend Integration Test for PDF Export
This simulates the exact requests that the React frontend makes
"""

import requests
import json
import time

def test_skills_pdf_export():
    """Test Skills component PDF export"""
    print("🧪 Testing Skills PDF Export...")
    
    # Simulate the exact request from Skills.jsx
    skills_data = {
        "type": "skills",
        "progressData": {
            "skills": {
                "totalResources": 25,
                "bookmarked": 8,
                "category": "finance",
                "categories": ["Finance", "Digital", "Management", "Legal"],
                "categoryBookmarks": [3, 2, 2, 1],
                "filteredCount": 25
            }
        },
        "businessType": "finance"
    }
    
    try:
        response = requests.post(
            "http://localhost:8080/export-pdf",
            json=skills_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            with open('test_skills_frontend.pdf', 'wb') as f:
                f.write(response.content)
            print(f"✅ Skills PDF: {len(response.content):,} bytes")
            return True
        else:
            print(f"❌ Skills PDF failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Skills PDF error: {e}")
        return False

def test_checklist_pdf_export():
    """Test Checklist component PDF export"""
    print("🧪 Testing Checklist PDF Export...")
    
    # Simulate the exact request from Checklist.jsx
    checklist_data = {
        "type": "checklist",
        "progressData": {
            "checklist": {
                "total": 15,
                "completed": 10,
                "percentage": 67,
                "priorityDistribution": {
                    "high": 2,
                    "medium": 5,
                    "low": 3
                },
                "businessType": "retail"
            }
        },
        "businessType": "retail"
    }
    
    try:
        response = requests.post(
            "http://localhost:8080/export-pdf",
            json=checklist_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            with open('test_checklist_frontend.pdf', 'wb') as f:
                f.write(response.content)
            print(f"✅ Checklist PDF: {len(response.content):,} bytes")
            return True
        else:
            print(f"❌ Checklist PDF failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Checklist PDF error: {e}")
        return False

def test_comprehensive_pdf_export():
    """Test Projects component comprehensive PDF export"""
    print("🧪 Testing Comprehensive PDF Export...")
    
    # Simulate the exact request from Projects.jsx
    comprehensive_data = {
        "type": "comprehensive",
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
        },
        "businessType": "retail"
    }
    
    try:
        response = requests.post(
            "http://localhost:8080/export-pdf",
            json=comprehensive_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            with open('test_comprehensive_frontend.pdf', 'wb') as f:
                f.write(response.content)
            print(f"✅ Comprehensive PDF: {len(response.content):,} bytes")
            return True
        else:
            print(f"❌ Comprehensive PDF failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Comprehensive PDF error: {e}")
        return False

def test_cors_and_headers():
    """Test CORS and proper headers"""
    print("🧪 Testing CORS and Headers...")
    
    try:
        # Test preflight request (OPTIONS)
        options_response = requests.options(
            "http://localhost:8080/export-pdf",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        print(f"OPTIONS status: {options_response.status_code}")
        print(f"CORS headers: {options_response.headers.get('Access-Control-Allow-Origin', 'Not found')}")
        
        # Test actual request with Origin header
        actual_response = requests.post(
            "http://localhost:8080/export-pdf",
            json={"type": "comprehensive", "progressData": {}, "businessType": "test"},
            headers={
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000"
            }
        )
        
        print(f"POST status: {actual_response.status_code}")
        return actual_response.status_code == 200
        
    except Exception as e:
        print(f"❌ CORS test error: {e}")
        return False

def main():
    """Run all frontend integration tests"""
    print("=" * 60)
    print("🚀 Frontend Integration Test Suite")
    print("=" * 60)
    
    # Check if backend is running
    try:
        health_response = requests.get("http://localhost:8080/health", timeout=5)
        if health_response.status_code != 200:
            print("❌ Backend health check failed!")
            return False
        print("✅ Backend is running and healthy")
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        print("Make sure the Flask server is running on http://localhost:8080")
        return False
    
    print("\n" + "=" * 60)
    
    # Run all tests
    tests = [
        test_skills_pdf_export,
        test_checklist_pdf_export, 
        test_comprehensive_pdf_export,
        test_cors_and_headers
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        print()
        if test():
            passed += 1
        time.sleep(1)  # Brief pause between tests
    
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All frontend integration tests passed!")
        print("Frontend → Backend → PDF generation working perfectly!")
    else:
        print("⚠️ Some tests failed. Check the output above for details.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1) 