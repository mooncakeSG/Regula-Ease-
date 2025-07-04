import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from fpdf import FPDF
import io
import base64
import os
import tempfile
from datetime import datetime
import json
from pdf_translations import get_translation, get_language_name, get_supported_languages

class RegulaEasePDFGenerator:
    def __init__(self, language='en'):
        self.pdf = FPDF()
        self.pdf.set_auto_page_break(auto=True, margin=15)
        self.language = language if language in get_supported_languages() else 'en'
        
    def t(self, key, default=None):
        """Get translation for current language"""
        return get_translation(self.language, key, default)
        
    def generate_comprehensive_report(self, progress_data, business_type):
        """Generate a comprehensive business progress report"""
        self.pdf.add_page()
        
        # Header
        self.add_header(self.t('report_title'), business_type)
        
        # Executive Summary
        self.add_section_title(self.t('executive_summary'))
        self.add_executive_summary(progress_data)
        
        # Progress Charts
        self.add_section_title(self.t('progress_overview'))
        self.add_progress_charts(progress_data)
        
        # Compliance Status
        if 'checklist' in progress_data:
            self.add_section_title(self.t('compliance_status'))
            self.add_compliance_analysis(progress_data['checklist'])
        
        # Skills Development
        if 'skills' in progress_data:
            self.add_section_title(self.t('skills_development'))
            self.add_skills_analysis(progress_data['skills'])
        
        # Quiz Performance
        if 'quiz' in progress_data:
            self.add_section_title(self.t('knowledge_assessment'))
            self.add_quiz_analysis(progress_data['quiz'])
        
        # Action Items
        self.add_section_title(self.t('recommended_next_steps'))
        self.add_action_items(progress_data)
        
        return self.pdf.output()
    
    def add_header(self, title, business_type):
        """Add report header with logo and title"""
        self.pdf.set_font('Helvetica', 'B', 20)
        self.pdf.cell(0, 15, title, align='C')
        self.pdf.ln(15)
        
        self.pdf.set_font('Helvetica', '', 12)
        self.pdf.cell(0, 10, f"{self.t('business_type')}: {business_type.title()}", align='C')
        self.pdf.ln(10)
        self.pdf.cell(0, 10, f"{self.t('generated')}: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", align='C')
        self.pdf.ln(10)
        self.pdf.set_font('Helvetica', 'I', 10)
        self.pdf.cell(0, 10, f"({get_language_name(self.language)})", align='C')
        self.pdf.ln(15)
    
    def add_section_title(self, title):
        """Add section title"""
        self.pdf.set_font('Helvetica', 'B', 16)
        self.pdf.cell(0, 10, title)
        self.pdf.ln(15)
    
    def add_executive_summary(self, progress_data):
        """Add executive summary with key metrics"""
        self.pdf.set_font('Helvetica', '', 11)
        
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
        
        summary_text = f"""
{self.t('summary_text')}

* {self.t('overall_progress')}: {overall_progress:.1f}%
* {self.t('business_compliance')}: {progress_data.get('checklist', {}).get('percentage', 0)}% {self.t('complete')}
* {self.t('skills_development')}: {progress_data.get('skills', {}).get('bookmarked', 0)} {self.t('resources_bookmarked')}
* {self.t('knowledge_assessment')}: {progress_data.get('quiz', {}).get('score', 0)}/{progress_data.get('quiz', {}).get('totalQuestions', 0)} {self.t('correct')}

{self.t('detailed_insights')}
        """
        
        self.pdf.multi_cell(0, 6, summary_text.strip())
        self.pdf.ln(10)
    
    def add_progress_charts(self, progress_data):
        """Add progress visualization charts"""
        # Create progress chart
        chart_path = self.create_progress_chart(progress_data)
        if chart_path and os.path.exists(chart_path):
            self.pdf.image(chart_path, x=10, y=None, w=180)
            self.pdf.ln(10)
            # Clean up temp file
            os.remove(chart_path)
        else:
            # Fallback if chart generation fails
            self.pdf.set_font('Helvetica', '', 11)
            self.pdf.multi_cell(0, 6, self.t('progress_charts_failed'))
            self.pdf.ln(10)
    
    def create_progress_chart(self, progress_data):
        """Create a progress overview chart"""
        try:
            fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 8))
            fig.suptitle(self.t('progress_overview'), fontsize=16, fontweight='bold')
            
            # 1. Overall Progress Pie Chart
            categories = []
            values = []
            colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0']
            
            if 'checklist' in progress_data:
                checklist_data = progress_data['checklist']
                categories.append(self.t('chart_labels.compliance'))
                values.append(checklist_data.get('percentage', 0))
            
            if 'skills' in progress_data:
                skills_data = progress_data['skills']
                total_resources = skills_data.get('totalResources', 1)
                bookmark_rate = (skills_data.get('bookmarked', 0) / total_resources) * 100
                categories.append(self.t('chart_labels.skills'))
                values.append(bookmark_rate)
            
            if 'quiz' in progress_data:
                quiz_data = progress_data['quiz']
                total_questions = quiz_data.get('totalQuestions', 1)
                quiz_score = (quiz_data.get('score', 0) / total_questions) * 100
                categories.append(self.t('chart_labels.knowledge'))
                values.append(quiz_score)
            
            if categories:
                ax1.pie(values, labels=categories, autopct='%1.1f%%', colors=colors[:len(categories)])
                ax1.set_title(self.t('chart_titles.progress_by_category'))
            
            # 2. Compliance Status Bar Chart
            if 'checklist' in progress_data:
                checklist_data = progress_data['checklist']
                completed = checklist_data.get('completed', 0)
                remaining = checklist_data.get('total', 0) - completed
                
                ax2.bar([self.t('chart_labels.completed'), self.t('chart_labels.remaining')], 
                       [completed, remaining], color=['#4CAF50', '#FFC107'])
                ax2.set_title(self.t('chart_titles.compliance_tasks'))
                ax2.set_ylabel('Number of Tasks')
            
            # 3. Skills Development Progress
            if 'skills' in progress_data:
                skills_data = progress_data['skills']
                categories = skills_data.get('categories', [])
                bookmarks = skills_data.get('categoryBookmarks', [])
                
                if categories and bookmarks:
                    ax3.bar(categories, bookmarks, color='#2196F3')
                    ax3.set_title(self.t('chart_titles.skills_by_category'))
                    ax3.set_ylabel(self.t('chart_labels.bookmarked_resources'))
                    plt.setp(ax3.get_xticklabels(), rotation=45, ha='right')
            
            # 4. Priority Distribution
            if 'checklist' in progress_data:
                checklist_data = progress_data['checklist']
                priorities = checklist_data.get('priorityDistribution', {})
                
                if priorities:
                    priority_names = list(priorities.keys())
                    priority_values = list(priorities.values())
                    colors_priority = ['#F44336', '#FF9800', '#4CAF50']
                    
                    ax4.pie(priority_values, labels=priority_names, autopct='%1.1f%%', 
                           colors=colors_priority[:len(priority_names)])
                    ax4.set_title(self.t('chart_titles.priority_distribution'))
            
            plt.tight_layout()
            
            # Save chart to temporary file (cross-platform)
            with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp_file:
                chart_path = tmp_file.name
            plt.savefig(chart_path, dpi=300, bbox_inches='tight')
            plt.close()
            
            return chart_path
            
        except Exception as e:
            print(f"Error creating progress chart: {e}")
            return None
    
    def add_compliance_analysis(self, checklist_data):
        """Add detailed compliance analysis"""
        self.pdf.set_font('Helvetica', '', 11)
        
        total = checklist_data.get('total', 0)
        completed = checklist_data.get('completed', 0)
        percentage = checklist_data.get('percentage', 0)
        
        analysis_text = f"""
Compliance Status Analysis:

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
        self.pdf.set_font('Helvetica', '', 11)
        
        total_resources = skills_data.get('totalResources', 0)
        bookmarked = skills_data.get('bookmarked', 0)
        engagement_rate = (bookmarked / total_resources * 100) if total_resources > 0 else 0
        
        analysis_text = f"""
Skills Development Analysis:

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
        self.pdf.set_font('Helvetica', '', 11)
        
        score = quiz_data.get('score', 0)
        total_questions = quiz_data.get('totalQuestions', 0)
        percentage = (score / total_questions * 100) if total_questions > 0 else 0
        
        analysis_text = f"""
Knowledge Assessment Results:

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
        self.pdf.set_font('Helvetica', '', 11)
        
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

def generate_pdf_report(report_type, progress_data, business_type, language='en'):
    """Main function to generate PDF report"""
    try:
        generator = RegulaEasePDFGenerator(language=language)
        
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
        print(f"Error in generate_pdf_report: {e}")
        import traceback
    
        traceback.print_exc()
        return None 