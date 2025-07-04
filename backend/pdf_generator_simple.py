"""
Simplified PDF generator without matplotlib charts
This version focuses on text-based reporting to avoid matplotlib issues
"""

from fpdf import FPDF
import io
import os
from datetime import datetime
import json

class SimpleRegulaEasePDFGenerator:
    def __init__(self):
        self.pdf = FPDF()
        self.pdf.set_auto_page_break(auto=True, margin=15)
        
    def generate_comprehensive_report(self, progress_data, business_type):
        """Generate a comprehensive business progress report without charts"""
        self.pdf.add_page()
        
        # Header
        self.add_header("RegulaEase Business Progress Report", business_type)
        
        # Executive Summary
        self.add_section_title("Executive Summary")
        self.add_executive_summary(progress_data)
        
        # Compliance Status
        if 'checklist' in progress_data:
            self.add_section_title("Compliance Status")
            self.add_compliance_analysis(progress_data['checklist'])
        
        # Skills Development
        if 'skills' in progress_data:
            self.add_section_title("Skills Development")
            self.add_skills_analysis(progress_data['skills'])
        
        # Quiz Performance
        if 'quiz' in progress_data:
            self.add_section_title("Knowledge Assessment")
            self.add_quiz_analysis(progress_data['quiz'])
        
        # Action Items
        self.add_section_title("Recommended Next Steps")
        self.add_action_items(progress_data)
        
        return self.pdf.output(dest='S').encode('latin-1')
    
    def add_header(self, title, business_type):
        """Add report header with title"""
        self.pdf.set_font('Arial', 'B', 20)
        self.pdf.cell(0, 15, title, ln=True, align='C')
        
        self.pdf.set_font('Arial', '', 12)
        self.pdf.cell(0, 10, f"Business Type: {business_type.title()}", ln=True, align='C')
        self.pdf.cell(0, 10, f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True, align='C')
        self.pdf.ln(10)
    
    def add_section_title(self, title):
        """Add section title"""
        self.pdf.set_font('Arial', 'B', 16)
        self.pdf.cell(0, 10, title, ln=True)
        self.pdf.ln(5)
    
    def add_executive_summary(self, progress_data):
        """Add executive summary with key metrics"""
        self.pdf.set_font('Arial', '', 11)
        
        # Calculate overall progress
        total_progress = 0
        progress_count = 0
        
        if 'checklist' in progress_data:
            checklist_data = progress_data['checklist']
            if 'total' in checklist_data and checklist_data['total'] > 0:
                total_progress += checklist_data.get('percentage', 0)
                progress_count += 1
        
        if 'skills' in progress_data:
            skills_data = progress_data['skills']
            if 'totalResources' in skills_data and skills_data['totalResources'] > 0:
                bookmark_rate = (skills_data.get('bookmarked', 0) / skills_data['totalResources']) * 100
                total_progress += bookmark_rate
                progress_count += 1
        
        if 'quiz' in progress_data:
            quiz_data = progress_data['quiz']
            if 'totalQuestions' in quiz_data and quiz_data['totalQuestions'] > 0:
                quiz_score = (quiz_data.get('score', 0) / quiz_data['totalQuestions']) * 100
                total_progress += quiz_score
                progress_count += 1
        
        overall_progress = total_progress / progress_count if progress_count > 0 else 0
        
        summary_text = f"""Your business is making excellent progress! Here's a snapshot of your current status:

* Overall Progress: {overall_progress:.1f}%
* Business Compliance: {progress_data.get('checklist', {}).get('percentage', 0)}% complete
* Skills Development: {progress_data.get('skills', {}).get('bookmarked', 0)} resources bookmarked
* Knowledge Assessment: {progress_data.get('quiz', {}).get('score', 0)}/{progress_data.get('quiz', {}).get('totalQuestions', 0)} correct

This report provides detailed insights into your business development journey and 
recommendations for continued growth.
        """
        
        self.pdf.multi_cell(0, 6, summary_text.strip())
        self.pdf.ln(10)
    
    def add_compliance_analysis(self, checklist_data):
        """Add detailed compliance analysis"""
        self.pdf.set_font('Arial', '', 11)
        
        total = checklist_data.get('total', 0)
        completed = checklist_data.get('completed', 0)
        percentage = checklist_data.get('percentage', 0)
        
        analysis_text = f"""Compliance Status Analysis:

* Total Tasks: {total}
* Completed Tasks: {completed}
* Completion Rate: {percentage}%
* Remaining Tasks: {total - completed}

Priority Breakdown:
* High Priority: {checklist_data.get('priorityDistribution', {}).get('high', 0)} tasks
* Medium Priority: {checklist_data.get('priorityDistribution', {}).get('medium', 0)} tasks
* Low Priority: {checklist_data.get('priorityDistribution', {}).get('low', 0)} tasks

Progress Trend: {'Excellent' if percentage >= 80 else 'Good' if percentage >= 60 else 'Needs Improvement'}
        """
        
        self.pdf.multi_cell(0, 6, analysis_text.strip())
        self.pdf.ln(10)
    
    def add_skills_analysis(self, skills_data):
        """Add skills development analysis"""
        self.pdf.set_font('Arial', '', 11)
        
        total_resources = skills_data.get('totalResources', 0)
        bookmarked = skills_data.get('bookmarked', 0)
        engagement_rate = (bookmarked / total_resources * 100) if total_resources > 0 else 0
        
        analysis_text = f"""Skills Development Analysis:

* Total Resources Available: {total_resources}
* Bookmarked Resources: {bookmarked}
* Engagement Rate: {engagement_rate:.1f}%

Top Categories:
        """
        
        categories = skills_data.get('categories', [])
        category_bookmarks = skills_data.get('categoryBookmarks', [])
        
        for i, category in enumerate(categories):
            if i < len(category_bookmarks):
                analysis_text += f"* {category}: {category_bookmarks[i]} bookmarks\n"
        
        analysis_text += f"""
Learning Engagement: {'High' if engagement_rate >= 25 else 'Moderate' if engagement_rate >= 10 else 'Low'}
        """
        
        self.pdf.multi_cell(0, 6, analysis_text.strip())
        self.pdf.ln(10)
    
    def add_quiz_analysis(self, quiz_data):
        """Add quiz performance analysis"""
        self.pdf.set_font('Arial', '', 11)
        
        score = quiz_data.get('score', 0)
        total_questions = quiz_data.get('totalQuestions', 0)
        percentage = (score / total_questions * 100) if total_questions > 0 else 0
        
        analysis_text = f"""Knowledge Assessment Results:

* Score: {score}/{total_questions} ({percentage:.1f}%)
* Category: {quiz_data.get('category', 'Mixed')}
* Completed: {quiz_data.get('completedAt', 'N/A')}

Performance Level: {'Excellent' if percentage >= 80 else 'Good' if percentage >= 60 else 'Needs Improvement'}

Areas for Improvement:
        """
        
        # Add incorrect answers analysis
        incorrect_count = total_questions - score
        if incorrect_count > 0:
            analysis_text += f"* Review {incorrect_count} topics where questions were answered incorrectly\n"
            analysis_text += "* Focus on practical application of business compliance concepts\n"
        
        analysis_text += "* Consider taking additional quizzes to reinforce learning\n"
        
        self.pdf.multi_cell(0, 6, analysis_text.strip())
        self.pdf.ln(10)
    
    def add_action_items(self, progress_data):
        """Add recommended action items"""
        self.pdf.set_font('Arial', '', 11)
        
        action_items = []
        
        # Compliance actions
        if 'checklist' in progress_data:
            checklist_data = progress_data['checklist']
            percentage = checklist_data.get('percentage', 0)
            if percentage < 100:
                action_items.append(f"Complete remaining {checklist_data.get('total', 0) - checklist_data.get('completed', 0)} compliance tasks")
            if checklist_data.get('priorityDistribution', {}).get('high', 0) > 0:
                action_items.append("Prioritize high-priority compliance tasks")
        
        # Skills actions
        if 'skills' in progress_data:
            skills_data = progress_data['skills']
            if skills_data.get('bookmarked', 0) == 0:
                action_items.append("Explore and bookmark relevant skills development resources")
        
        # Quiz actions
        if 'quiz' in progress_data:
            quiz_data = progress_data['quiz']
            score = quiz_data.get('score', 0)
            total = quiz_data.get('totalQuestions', 0)
            if score < total:
                action_items.append("Review quiz topics and take additional assessments")
        
        # General actions
        action_items.extend([
            "Schedule weekly progress reviews",
            "Set up automated compliance reminders",
            "Connect with local business development resources"
        ])
        
        actions_text = "Recommended Next Steps:\n\n"
        for i, action in enumerate(action_items[:8], 1):  # Limit to 8 items
            actions_text += f"{i}. {action}\n"
        
        actions_text += "\nFor personalized guidance, chat with our AI assistant at any time."
        
        self.pdf.multi_cell(0, 6, actions_text)

def generate_pdf_report_simple(report_type, progress_data, business_type):
    """Simplified PDF generation function"""
    try:
        generator = SimpleRegulaEasePDFGenerator()
        
        if report_type == 'comprehensive':
            pdf_content = generator.generate_comprehensive_report(progress_data, business_type)
        else:
            # For specific report types, use comprehensive as base
            pdf_content = generator.generate_comprehensive_report(progress_data, business_type)
        
        # Return PDF as BytesIO buffer
        pdf_buffer = io.BytesIO()
        pdf_buffer.write(pdf_content)
        pdf_buffer.seek(0)
        
        return pdf_buffer
        
    except Exception as e:
        print(f"Error in generate_pdf_report_simple: {e}")
        return None 