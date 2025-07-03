#!/usr/bin/env python3
"""
Test script for PDF generation with charts
Run this to verify that the PDF export functionality works correctly
"""

import sys
import os
sys.path.append(os.path.dirname(__file__))

from pdf_generator import generate_pdf_report
import json

def test_pdf_generation():
    """Test PDF generation with sample data"""
    print("🧪 Testing PDF Generation with Charts...")
    
    # Sample progress data
    sample_data = {
        "checklist": {
            "total": 15,
            "completed": 9,
            "percentage": 60,
            "priorityDistribution": {
                "high": 6,
                "medium": 6,
                "low": 3
            },
            "businessType": "retail"
        },
        "skills": {
            "totalResources": 16,
            "bookmarked": 8,
            "category": "finance",
            "categories": ["Finance", "Digital", "Management", "Legal"],
            "categoryBookmarks": [3, 2, 2, 1],
            "filteredCount": 4
        },
        "quiz": {
            "score": 4,
            "totalQuestions": 5,
            "category": "Business Registration",
            "completedAt": "2024-01-15T10:30:00Z"
        }
    }
    
    try:
        # Test comprehensive report generation
        print("📊 Generating comprehensive report...")
        pdf_buffer = generate_pdf_report("comprehensive", sample_data, "retail")
        
        if pdf_buffer:
            # Save test PDF
            with open("test_report.pdf", "wb") as f:
                f.write(pdf_buffer.getvalue())
            
            print("✅ PDF generation successful!")
            print(f"📁 Test report saved as: test_report.pdf")
            print(f"📏 PDF size: {len(pdf_buffer.getvalue())} bytes")
            
            return True
        else:
            print("❌ PDF generation failed - no content returned")
            return False
            
    except Exception as e:
        print(f"❌ PDF generation failed with error: {e}")
        print(f"🔍 Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return False

def check_dependencies():
    """Check if all required dependencies are available"""
    print("🔍 Checking dependencies...")
    
    deps = {
        "matplotlib": "Charts and graphs",
        "fpdf": "PDF generation", 
        "numpy": "Numerical operations",
        "io": "File operations"
    }
    
    missing = []
    
    for dep, desc in deps.items():
        try:
            __import__(dep)
            print(f"✅ {dep} - {desc}")
        except ImportError:
            print(f"❌ {dep} - {desc} (MISSING)")
            missing.append(dep)
    
    if missing:
        print(f"\n🚨 Missing dependencies: {', '.join(missing)}")
        print("Install with: pip install " + " ".join(missing))
        return False
    
    print("✅ All dependencies available!")
    return True

if __name__ == "__main__":
    print("🚀 RegulaEase PDF Export Test")
    print("=" * 40)
    
    # Check dependencies first
    if not check_dependencies():
        print("\n❌ Cannot proceed - missing dependencies")
        sys.exit(1)
    
    print()
    
    # Test PDF generation
    if test_pdf_generation():
        print("\n🎉 All tests passed! PDF export is ready to use.")
        print("\n💡 Next steps:")
        print("   1. Start the backend server: python app.py")
        print("   2. Use the PDF export buttons in the frontend")
        print("   3. Check the generated reports!")
    else:
        print("\n❌ Tests failed. Check the error messages above.")
        sys.exit(1) 