#!/usr/bin/env python3
"""
Test script for PDF generation functionality
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pdf_generator import generate_pdf_report

def test_pdf_generation():
    """Test PDF generation with sample data"""
    
    # Sample progress data
    sample_progress_data = {
        'checklist': {
            'total': 15,
            'completed': 10,
            'percentage': 67,
            'priorityDistribution': {
                'high': 2,
                'medium': 5,
                'low': 3
            }
        },
        'skills': {
            'totalResources': 25,
            'bookmarked': 8,
            'categories': ['Finance', 'Digital', 'Management', 'Legal'],
            'categoryBookmarks': [3, 2, 2, 1]
        },
        'quiz': {
            'score': 7,
            'totalQuestions': 10,
            'category': 'Business Compliance',
            'completedAt': '2025-01-04'
        }
    }
    
    business_type = 'retail'
    
    print("Testing PDF generation...")
    print(f"Business Type: {business_type}")
    print(f"Progress Data: {sample_progress_data}")
    
    try:
        # Generate PDF
        pdf_buffer = generate_pdf_report('comprehensive', sample_progress_data, business_type)
        
        if pdf_buffer:
            # Save to file for testing
            with open('test_report_local.pdf', 'wb') as f:
                f.write(pdf_buffer.getvalue())
            
            print("✅ PDF generated successfully!")
            print("📄 Saved as: test_report_local.pdf")
            print(f"📊 File size: {len(pdf_buffer.getvalue())} bytes")
            
            return True
        else:
            print("❌ PDF generation failed - returned None")
            return False
            
    except Exception as e:
        print(f"❌ Error during PDF generation: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("RegulaEase PDF Generator Test")
    print("=" * 50)
    
    success = test_pdf_generation()
    
    if success:
        print("\n✅ All tests passed!")
    else:
        print("\n❌ Tests failed!")
        sys.exit(1) 