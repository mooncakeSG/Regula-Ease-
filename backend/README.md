# Small Business Support API - Backend

A Flask backend API designed to help South African small business owners with compliance checklists, skills development resources, and AI-powered business guidance.

## Features

- **Compliance Checklists**: Get step-by-step compliance guides based on business type
- **Skills Resources**: Access curated learning materials by category
- **AI Chatbot**: Get business advice from an AI assistant specialized in South African business compliance

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   copy example.env .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

5. **Test the API (optional)**
   ```bash
   python test_api.py
   ```

## Project Structure

```
backend/
├── app.py                 # Main Flask application
├── bot.py                 # Groq API integration
├── requirements.txt       # Python dependencies
├── example.env           # Environment variables template
├── .env                  # Your environment variables (create this)
├── README.md             # This documentation
├── test_api.py           # API testing script
├── data/
│   ├── checklist.json    # Business compliance checklists
│   └── skills.json       # Learning resources
└── utils/                # Additional utilities
```

## API Endpoints

### 1. GET `/checklist`

Get compliance checklist for a specific business type.

**Query Parameters:**
- `type` (required): Business type (retail, services, manufacturing, technology)

**Example:**
```bash
curl "http://localhost:5000/checklist?type=retail"
```

**Response:**
```json
{
  "business_type": "retail",
  "checklist": [
    {
      "id": 1,
      "title": "Register your business",
      "description": "Register with Companies and Intellectual Property Commission (CIPC)",
      "priority": "high",
      "estimated_time": "2-5 business days",
      "required_documents": ["ID documents", "Address proof", "Business name reservation"],
      "cost_estimate": "R175 - R500"
    }
  ]
}
```

### 2. GET `/skills`

Get learning resources for a specific category.

**Query Parameters:**
- `category` (required): Skills category (finance, digital, management, legal)

**Example:**
```bash
curl "http://localhost:5000/skills?category=finance"
```

**Response:**
```json
{
  "category": "finance",
  "resources": [
    {
      "id": 1,
      "title": "Basic Bookkeeping for Small Business",
      "description": "Learn to track income, expenses, and manage cash flow effectively",
      "type": "online_course",
      "provider": "SEDA (Small Enterprise Development Agency)",
      "duration": "4 weeks",
      "cost": "Free",
      "level": "beginner",
      "url": "https://www.seda.org.za/",
      "skills_covered": ["Cash flow management", "Basic accounting", "Financial record keeping"]
    }
  ]
}
```

### 3. POST `/chatbot`

Get AI-powered business advice.

**Request Body:**
```json
{
  "message": "What are the tax requirements for a small retail business?"
}
```

**Example:**
```bash
curl -X POST "http://localhost:5000/chatbot" \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the tax requirements for a small retail business?"}'
```

**Response:**
```json
{
  "user_message": "What are the tax requirements for a small retail business?",
  "bot_response": "For a small retail business in South Africa, you'll need to..."
}
```

### 4. GET `/health`

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "message": "Small Business Support API is running"
}
```

## Available Business Types

- **retail**: Retail businesses (shops, stores)
- **services**: Service-based businesses (consulting, professional services)
- **manufacturing**: Manufacturing and production businesses
- **technology**: Technology and software businesses

## Available Skills Categories

- **finance**: Financial management, accounting, tax planning
- **digital**: Digital marketing, e-commerce, website development
- **management**: Business management, customer service, project management
- **legal**: Business law, employment law, intellectual property

## Deployment

### Render Deployment

1. Create a new Web Service on Render
2. Connect your repository
3. Set the following:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**: Add your `GROQ_API_KEY`

### Replit Deployment

1. Import your repository to Replit
2. Ensure `requirements.txt` is in the root directory
3. Add `GROQ_API_KEY` to Secrets in Replit
4. Run the application

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for the chatbot functionality | Yes |
| `FLASK_ENV` | Flask environment (development/production) | No |
| `FLASK_DEBUG` | Enable/disable debug mode | No |
| `PORT` | Port number for the application | No |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Missing or invalid parameters
- `500 Internal Server Error`: Server-side errors
- `200 OK`: Successful requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository. 