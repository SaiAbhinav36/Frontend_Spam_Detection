# Spam Detection AI Chatbot - Frontend

A modern, responsive React frontend for the Spam/Ham Detection Chatbot using Tailwind CSS and markdown rendering.

## Features

- 🎨 Beautiful gradient UI with Tailwind CSS
- 💬 Real-time chat interface
- 📝 Markdown rendering support for AI responses
- 🏷️ Visual classification badges (Spam/Ham)
- 📱 Fully responsive design
- ⚡ Fast and lightweight with Vite
- 🔄 Session-based conversation memory
- 🎯 Clean and intuitive UX

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

## Installation

1. Extract the archive:
```bash
tar -xzf spam-chatbot-frontend.tar.gz
cd spam-chatbot-frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Production Build

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Backend URL

If your backend is running on a different URL, update the fetch URL in `src/App.jsx`:

```javascript
const response = await fetch('http://YOUR_BACKEND_URL/chat', {
  // ...
});
```

### Port Configuration

To change the frontend port, edit `vite.config.js`:

```javascript
server: {
  port: 3000, // Change this to your preferred port
  open: true
}
```

## Project Structure

```
spam-chatbot-frontend/
├── src/
│   ├── App.jsx          # Main chat component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports and custom styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md           # This file
```

## Usage

1. Make sure your backend server is running on `http://localhost:8000`
2. Start the frontend with `npm run dev`
3. Open your browser to `http://localhost:3000`
4. Type or paste an email/message to analyze
5. Get instant spam/ham classification with AI explanation

## Example Messages to Try

- **Spam**: "Congratulations! You've won $1,000,000! Click here now!"
- **Ham**: "Hi team, the meeting is scheduled for tomorrow at 3 PM"
- **Spam**: "URGENT: Your account will be suspended unless you verify now"

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **react-markdown** - Markdown rendering
- **lucide-react** - Beautiful icons
- **FastAPI Backend** - Python backend with ML model

## Features Explained

### Chat Interface
- Clean, modern design with gradient backgrounds
- Message bubbles with timestamps
- User messages on the right (blue), AI responses on the left (gray)

### Classification Badges
- 🚫 Red badge for Spam
- ✅ Green badge for Ham
- ⚠️ Yellow badge for errors

### Markdown Support
- AI responses support full markdown formatting
- Bold, italic, lists, links, etc.
- Code blocks with syntax highlighting

### Session Management
- Each session gets a unique ID
- Conversation history maintained
- Clear chat option available

## Troubleshooting

### Backend Connection Error
If you see "Please make sure the backend server is running", check:
- Backend is running on port 8000
- No CORS issues (add CORS middleware to backend if needed)
- Correct backend URL in App.jsx

### Styling Issues
If styles don't load:
```bash
npm install
npm run dev
```

### Port Already in Use
If port 3000 is busy, change it in `vite.config.js`

## Backend CORS Setup (if needed)

Add to your backend `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## License

Created for AidenAI Hackathon 2026

## Support

For issues or questions, please check the backend logs and ensure all services are running properly.
