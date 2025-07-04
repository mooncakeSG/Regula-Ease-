#!/usr/bin/env python3
"""
Test script for multilingual PDF generation
Tests PDF generation in all supported languages (English, Afrikaans, Zulu, Xhosa)
"""

import requests
import os
from pdf_translations import get_supported_languages, get_language_name

def test_multilingual_pdf_generation():
    """Test PDF generation in all supported languages"""
    print("=" * 60)
    print("🌍 Multilingual PDF Generation Test")
    print("=" * 60)
    
    # Test data
    test_data = {
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
                },
                "businessType": "retail"
            },
            "skills": {
                "totalResources": 25,
                "bookmarked": 8,
                "category": "finance",
                "categories": ["Finance", "Digital", "Management", "Legal"],
                "categoryBookmarks": [3, 2, 2, 1],
                "filteredCount": 25
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
    
    # Test each supported language
    languages = get_supported_languages()
    results = {}
    
    for language in languages:
        print(f"\n🧪 Testing {get_language_name(language)} ({language})...")
        
        # Add language to test data
        test_data["language"] = language
        
        try:
            response = requests.post(
                "http://localhost:8080/export-pdf",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                # Save PDF file
                filename = f"test_multilingual_report_{language}.pdf"
                with open(filename, 'wb') as f:
                    f.write(response.content)
                
                print(f"✅ {get_language_name(language)}: {len(response.content):,} bytes")
                print(f"   Saved as: {filename}")
                
                results[language] = {
                    'success': True,
                    'size': len(response.content),
                    'filename': filename
                }
            else:
                print(f"❌ {get_language_name(language)}: HTTP {response.status_code}")
                print(f"   Error: {response.text}")
                results[language] = {
                    'success': False,
                    'error': f"HTTP {response.status_code}"
                }
                
        except Exception as e:
            print(f"❌ {get_language_name(language)}: Exception - {e}")
            results[language] = {
                'success': False,
                'error': str(e)
            }
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Results Summary")
    print("=" * 60)
    
    successful = 0
    total = len(languages)
    
    for language in languages:
        result = results[language]
        if result['success']:
            successful += 1
            print(f"✅ {get_language_name(language):>10} ({language}): {result['size']:,} bytes")
        else:
            print(f"❌ {get_language_name(language):>10} ({language}): {result['error']}")
    
    print(f"\n🎯 Success Rate: {successful}/{total} ({successful/total*100:.1f}%)")
    
    if successful == total:
        print("🎉 All languages working correctly!")
        print("✅ Multilingual PDF generation is fully functional!")
    else:
        print("⚠️ Some languages failed. Check the errors above.")
    
    return successful == total

def test_translation_coverage():
    """Test that all required translations exist for each language"""
    print("\n" + "=" * 60)
    print("🔍 Translation Coverage Test")
    print("=" * 60)
    
    from pdf_translations import PDF_TRANSLATIONS, get_translation
    
    # Key translations that must exist
    required_keys = [
        'report_title',
        'business_type',
        'generated',
        'executive_summary',
        'progress_overview',
        'compliance_status',
        'skills_development',
        'knowledge_assessment',
        'recommended_next_steps',
        'chart_titles.progress_by_category',
        'chart_labels.compliance',
        'chart_labels.skills',
        'chart_labels.knowledge'
    ]
    
    languages = get_supported_languages()
    missing_translations = {}
    
    for language in languages:
        print(f"\n🧪 Checking {get_language_name(language)} ({language})...")
        missing = []
        
        for key in required_keys:
            translation = get_translation(language, key)
            if translation == key:  # Translation not found, returned key as fallback
                missing.append(key)
        
        if missing:
            missing_translations[language] = missing
            print(f"❌ Missing {len(missing)} translations:")
            for key in missing:
                print(f"   - {key}")
        else:
            print(f"✅ All required translations present")
    
    if not missing_translations:
        print("\n🎉 All languages have complete translations!")
        return True
    else:
        print(f"\n⚠️ {len(missing_translations)} languages have missing translations")
        return False

def test_backend_endpoint():
    """Test that the backend endpoint is accessible"""
    print("\n" + "=" * 60)
    print("🔗 Backend Endpoint Test")
    print("=" * 60)
    
    try:
        # Health check
        health_response = requests.get("http://localhost:8080/health", timeout=5)
        if health_response.status_code == 200:
            print("✅ Backend is running and healthy")
            return True
        else:
            print(f"❌ Backend health check failed: HTTP {health_response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        print("Make sure the Flask server is running on http://localhost:8080")
        return False

def main():
    """Run all multilingual tests"""
    print("🚀 Starting Multilingual PDF Tests")
    
    # Test 1: Backend accessibility
    if not test_backend_endpoint():
        print("❌ Backend not accessible, skipping PDF tests")
        return False
    
    # Test 2: Translation coverage
    translations_ok = test_translation_coverage()
    
    # Test 3: PDF generation
    pdf_generation_ok = test_multilingual_pdf_generation()
    
    # Final summary
    print("\n" + "=" * 60)
    print("🏁 Final Test Summary")
    print("=" * 60)
    
    print(f"Translation Coverage: {'✅ PASS' if translations_ok else '❌ FAIL'}")
    print(f"PDF Generation: {'✅ PASS' if pdf_generation_ok else '❌ FAIL'}")
    
    if translations_ok and pdf_generation_ok:
        print("\n🎉 All multilingual tests passed!")
        print("✅ Ready for multilingual PDF deployment!")
        return True
    else:
        print("\n⚠️ Some tests failed. Check the output above.")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1) 