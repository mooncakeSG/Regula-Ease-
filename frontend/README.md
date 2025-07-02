# Small Business Support Assistant - Frontend

A modern React frontend for the Small Business Support Assistant, designed to help South African small business owners with compliance, skills development, and AI-powered business guidance.

## Features

### 📝 Business Compliance Checklist
- Interactive dropdown to select business types (retail, services, manufacturing, technology)
- Fetch detailed compliance steps from the Flask backend
- Visual priority indicators and comprehensive step information
- Display required documents, costs, and time estimates

### 🎓 Skills Development Resources
- Category-based learning resource discovery
- Detailed resource cards with provider information
- Direct links to training providers
- Skills coverage and level indicators

### 🤖 AI Business Assistant
- Real-time chat interface with AI assistant
- Pre-defined sample questions for easy getting started
- South African business compliance expertise
- Full conversation history with timestamps

## Technology Stack

- **React 18** with functional components and hooks
- **Axios** for HTTP requests to Flask backend
- **Modern CSS** with responsive design
- **Component-based architecture** for maintainability

## Prerequisites

- Node.js 16+ and npm
- Flask backend running on `http://localhost:5000`

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000` and automatically reload when you make changes.

### 3. Ensure Backend is Running
Make sure your Flask backend is running on `http://localhost:5000` before testing the frontend functionality.

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── ...
├── src/
│   ├── components/
│   │   ├── Checklist.jsx   # Business compliance component
│   │   ├── Skills.jsx      # Skills resources component
│   │   └── Chatbot.jsx     # AI assistant component
│   ├── App.jsx             # Main application component
│   ├── App.css             # Complete application styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Component Overview

### Checklist Component
- **State Management**: business type selection, checklist data, loading states
- **API Integration**: Fetches from `/checklist?type={type}`
- **Features**: Priority badges, document requirements, cost estimates

### Skills Component  
- **State Management**: category selection, resources data, loading states
- **API Integration**: Fetches from `/skills?category={category}`
- **Features**: Resource cards, skill tags, provider links

### Chatbot Component
- **State Management**: conversation history, message input, loading states
- **API Integration**: Posts to `/chatbot` with message data
- **Features**: Real-time chat, sample questions, conversation persistence

## Responsive Design

The application is fully responsive and works seamlessly on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px) 
- ✅ Mobile (320px - 767px)

## Error Handling

Each component includes comprehensive error handling:
- Network connectivity issues
- Backend server errors  
- Invalid API responses
- User-friendly error messages

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Configure environment variables if needed

## API Integration

The frontend communicates with the Flask backend using these endpoints:

- `GET /checklist?type={businessType}` - Fetch business compliance steps
- `GET /skills?category={category}` - Fetch learning resources  
- `POST /chatbot` with `{message}` - Get AI assistant responses

All API calls include proper error handling and loading states.

## Development Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (not recommended)
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)

## Contributing

1. Follow React best practices
2. Use functional components with hooks
3. Maintain responsive design principles
4. Add proper error handling for new features
5. Test across different screen sizes

## License

This project is part of the Small Business Support Assistant platform. 