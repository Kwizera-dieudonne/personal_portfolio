import React, { useState } from 'react';
import { Bot, MessageCircle, X, Send } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. I can help answer questions about my background, skills, projects, or anything else you\'d like to know!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    skills: "I specialize in Python Django, Java Spring Boot, HTML/CSS, SQL, and Git/GitHub. I also have experience with JavaScript, various databases, and cloud platforms like AWS and Heroku.",
    experience: "I'm a full-stack developer with expertise in both frontend and backend technologies. I've worked on e-commerce platforms, APIs, and various web applications.",
    projects: "Some of my notable projects include an e-commerce platform built with Django and React, a task management API with Spring Boot, and several portfolio websites. You can check out the portfolio section for more details!",
    contact: "You can reach me through the contact form on this website, or connect with me on LinkedIn, GitHub, or via email. I'm always open to discussing new opportunities!",
    education: "I have a strong background in computer science and software development, with continuous learning in modern web technologies and frameworks.",
    default: "That's an interesting question! Feel free to ask me about my skills, projects, experience, or anything else you'd like to know. You can also use the contact form to reach out directly."
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    // Simple keyword-based responses
    let botResponse = predefinedResponses.default;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      botResponse = predefinedResponses.skills;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      botResponse = predefinedResponses.experience;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      botResponse = predefinedResponses.projects;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      botResponse = predefinedResponses.contact;
    } else if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      botResponse = predefinedResponses.education;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 500);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl transition-all duration-300 z-50 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-blue-100">Ask me anything!</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 h-80 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white ml-4' 
                  : 'bg-gray-100 text-gray-800 mr-4'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about my skills, projects, or experience..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;