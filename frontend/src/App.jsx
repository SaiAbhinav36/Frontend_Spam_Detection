import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Trash2, Shield, Mail } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [mode, setMode] = useState('chatbot'); // 'chatbot' or 'confidence'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };   

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
          mode: mode
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        classification: data.classification,
        confidence_score: data.confidence_score,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the backend server is running on http://localhost:8000',
        classification: 'Error',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 animate-gradient">
      {/* Header with Glassmorphism */}
      <header className="glass-effect shadow-lg border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 fade-in">
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-2.5 rounded-xl shadow-lg hover:shadow-xl smooth-transition hover:scale-110" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Spam Detection AI</h1>
              <p className="text-sm text-gray-600 font-medium">ML-Powered Email Classification</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Mode Toggle with Enhanced Styling */}
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl p-1 shadow-md border border-white/30">
              <button
                onClick={() => setMode('chatbot')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg smooth-transition ${mode === 'chatbot'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
              >
                💬 Chatbot
              </button>
              <button
                onClick={() => setMode('confidence')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg smooth-transition ${mode === 'confidence'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
              >
                📊 Confidence
              </button>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl smooth-transition hover:scale-105 shadow-sm hover:shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Chat Container with Glassmorphism */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="glass-effect rounded-3xl shadow-2xl border border-white/40 overflow-hidden flex flex-col fade-in" style={{ height: 'calc(100vh - 180px)' }}>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md fade-in">
                  <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                    <Mail className="w-12 h-12 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">Welcome to Spam Detection AI</h2>
                  <p className="text-gray-600 mb-8 text-lg font-medium">
                    Send me any email or message, and I'll analyze it to determine if it's spam or legitimate (ham).
                  </p>
                  <div className="glass-effect border border-blue-200/50 rounded-2xl p-6 text-left shadow-lg hover:shadow-xl smooth-transition">
                    <p className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
                      <span className="text-lg">✨</span> Try examples like:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>"Congratulations! You've won $1,000,000! Click here now!"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">•</span>
                        <span>"Hi team, the meeting is scheduled for tomorrow at 3 PM"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">•</span>
                        <span>"URGENT: Your account will be suspended unless you verify now"</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-4 smooth-transition hover:scale-[1.02] ${msg.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg hover:shadow-2xl'
                        : 'glass-effect-dark text-gray-800 shadow-md hover:shadow-xl border border-white/30'
                        }`}
                    >
                      {msg.role === 'assistant' && msg.classification && (
                        <div className="mb-3 pb-3 border-b border-gray-300/50">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-md smooth-transition hover:scale-105 ${msg.classification === 'Spam'
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                                : msg.classification === 'Ham'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                  : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                                }`}
                              style={{ boxShadow: msg.classification === 'Spam' ? '0 4px 15px rgba(239, 68, 68, 0.4)' : msg.classification === 'Ham' ? '0 4px 15px rgba(34, 197, 94, 0.4)' : '0 4px 15px rgba(251, 191, 36, 0.4)' }}
                            >
                              {msg.classification === 'Spam' ? '🚫' : msg.classification === 'Ham' ? '✅' : '⚠️'} {msg.classification}
                            </span>
                            {msg.confidence_score !== undefined && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md smooth-transition hover:scale-105" style={{ boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }}>
                                📊 Score: {msg.confidence_score.toFixed(4)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                      <div className={`text-xs mt-2 font-medium ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start fade-in">
                    <div className="glass-effect-dark rounded-2xl px-5 py-4 shadow-md border border-white/30">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-pink-500 to-red-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area with Enhanced Styling */}
          <div className="border-t border-white/30 p-5 glass-effect">
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste an email or message to analyze..."
                className="flex-1 px-5 py-3.5 border-2 border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent smooth-transition bg-white/80 backdrop-blur-sm font-medium placeholder-gray-400 shadow-sm hover:shadow-md"
                disabled={isLoading}
                style={{ transition: 'all 0.3s ease' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-8 py-3.5 rounded-xl hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition flex items-center gap-2 font-bold shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
                style={{ boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)' }}
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer with Enhanced Styling */}
      <footer className="text-center py-4 text-sm font-medium">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Powered by ML (TF-IDF + SVM) + LLM (Groq) | AidenAI Hackathon 2026
        </span>
      </footer>
    </div>
  );
}

export default App;
