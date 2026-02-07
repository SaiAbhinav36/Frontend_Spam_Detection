# Spam Detection AI - Frontend

A modern React-based web application that uses machine learning and LLMs to classify email messages as spam or legitimate (ham).

## Features

- 🤖 Real-time spam detection using ML model (TF-IDF + SVM)
- 💬 Enhanced responses powered by LLM (Groq API)
- 🎨 Beautiful glassmorphic UI with gradient animations
- 📊 Dual-mode operation: Chatbot mode and Confidence Score mode
- 💾 Session-based chat history
- 📱 Responsive design

## Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: React Markdown
- **Backend**: FastAPI (http://localhost:8000)

## Installation

```bash
# Install dependencies
npm install react react-dom react-markdown lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Usage

```bash
# Start development server
npm start
```

The app will be available at `http://localhost:3000`

**Important**: Make sure the backend API is running on `http://localhost:8000` before using the app.

## How It Works

1. User enters an email or message text
2. Frontend sends the message to the backend API
3. Backend classifies the message using ML model
4. LLM generates a conversational response (in Chatbot mode) or technical explanation (in Confidence mode)
5. Results displayed with classification badge and confidence score

## Modes

### Chatbot Mode
- Conversational explanations about why a message is spam/ham
- Educational insights about spam characteristics
- Markdown-formatted responses

### Confidence Score Mode
- Focus on ML model's confidence score
- Technical explanation of the score
- Data-driven responses

## Project Structure

```
src/
├── App.js          # Main component with all logic
├── index.js        # Entry point
└── index.css       # Tailwind styles
```

## API Integration

**Endpoint**: `POST http://localhost:8000/chat`

**Request**:
```json
{
  "message": "Email text to analyze",
  "session_id": "session-1234567890",
  "mode": "chatbot" // or "confidence"
}
```

**Response**:
```json
{
  "response": "LLM-generated explanation",
  "classification": "Spam", // or "Ham"
  "confidence_score": 0.9523
}
```

## Configuration

To change the backend API URL, modify the fetch URL in the `sendMessage` function in `App.js`:

```javascript
const response = await fetch('http://YOUR_BACKEND_URL/chat', {
  // ...
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend connection error | Ensure backend is running on port 8000 |
| Styles not loading | Run `npm run build:css` or check Tailwind config |
| Messages not displaying | Check browser console for errors |

## License

Built for AidenAI Hackathon 2026

## Credits

Powered by ML (TF-IDF + SVM) + LLM (Groq)
