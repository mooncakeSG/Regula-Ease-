#!/usr/bin/env python3
"""
Test script for simplified PDF generation functionality (without matplotlib)
"""

from fpdf import FPDF
import io
from datetime import datetime

def test_simple_pdf_generation():
    """Test basic PDF generation with fpdf2 only"""
    
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
    
    print("Testing simplified PDF generation...")
    print(f"Business Type: {business_type}")
    
    try:
        # Create simple PDF
        pdf = FPDF()
        pdf.add_page()
        
        # Title
        pdf.set_font('Helvetica', 'B', 20)
        pdf.cell(0, 15, "RegulaEase Business Progress Report", align='C')
        pdf.ln(15)
        
        # Business type
        pdf.set_font('Helvetica', '', 12)
        pdf.cell(0, 10, f"Business Type: {business_type.title()}", align='C')
        pdf.ln(10)
        pdf.cell(0, 10, f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", align='C')
        pdf.ln(20)
        
        # Summary section
        pdf.set_font('Helvetica', 'B', 16)
        pdf.cell(0, 10, "Executive Summary")
        pdf.ln(15)
        
        pdf.set_font('Helvetica', '', 11)
        summary_text = f"""Your business is making excellent progress! Here's a snapshot:

* Business Compliance: {sample_progress_data['checklist']['percentage']}% complete
* Skills Development: {sample_progress_data['skills']['bookmarked']} resources bookmarked
* Knowledge Assessment: {sample_progress_data['quiz']['score']}/{sample_progress_data['quiz']['totalQuestions']} correct

This report provides insights into your business development journey."""
        
        pdf.multi_cell(0, 6, summary_text.strip())
        
        # Generate PDF content
        pdf_content = pdf.output()
        
        # Save to file for testing
        with open('test_simple_report.pdf', 'wb') as f:
            f.write(pdf_content)
        
        print("✅ Simple PDF generated successfully!")
        print("📄 Saved as: test_simple_report.pdf")
        print(f"📊 File size: {len(pdf_content)} bytes")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during simple PDF generation: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("Simple PDF Generator Test")
    print("=" * 50)
    
    success = test_simple_pdf_generation()
    
    if success:
        print("\n✅ Simple PDF test passed!")
    else:
        print("\n❌ Simple PDF test failed!")
        exit(1) 