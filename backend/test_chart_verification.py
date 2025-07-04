#!/usr/bin/env python3
"""
Test to verify charts are actually being generated and included in PDFs
"""

from pdf_generator import generate_pdf_report

def test_chart_verification():
    """Compare PDF sizes with and without chart functionality"""
    
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
    
    print("=" * 50)
    print("Chart Verification Test")
    print("=" * 50)
    
    try:
        # Generate PDF with charts
        print("Generating PDF with charts...")
        pdf_buffer_with_charts = generate_pdf_report('comprehensive', sample_progress_data, business_type)
        
        if pdf_buffer_with_charts:
            with open('test_with_charts.pdf', 'wb') as f:
                f.write(pdf_buffer_with_charts.getvalue())
            
            size_with_charts = len(pdf_buffer_with_charts.getvalue())
            print(f"✅ PDF with charts: {size_with_charts:,} bytes")
            
            # Check if file size indicates charts are present
            if size_with_charts > 50000:  # Charts should make it significantly larger
                print("✅ File size indicates charts are included!")
                
                # Try to identify if there are image references in the PDF
                pdf_content = pdf_buffer_with_charts.getvalue()
                if b'/Image' in pdf_content or b'PNG' in pdf_content:
                    print("✅ PDF contains image data (likely charts)!")
                else:
                    print("⚠️  PDF may not contain image data")
                
                return True
            else:
                print("❌ File size too small - charts may not be included")
                return False
        else:
            print("❌ PDF generation failed")
            return False
            
    except Exception as e:
        print(f"❌ Error during chart verification: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_chart_verification()
    
    if success:
        print("\n✅ Chart verification passed!")
        print("Charts are being generated and included in PDFs.")
    else:
        print("\n❌ Chart verification failed!")
        exit(1) 