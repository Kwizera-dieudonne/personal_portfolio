import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Plus, Heart, MessageCircle, Send, Lock, X } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}

interface JournalEntryFormProps {
  onSave: (entry: { title: string; content: string; excerpt: string; date: string; readTime: string; tags: string[] }) => void;
  onCancel: () => void;
}

interface AdminLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

// Admin Login Component
const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd use a more secure method
    if (password === 'password') { // Change this to your actual password
      localStorage.setItem('journalAuth', 'true');
      onLogin();
      onClose();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Admin Login</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Journal Entry Form Component
const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  
  const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.split(/\s/g).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    onSave({
      title,
      content,
      excerpt: content.slice(0, 150) + '...',
      date: new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(content),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
    
    setTitle('');
    setContent('');
    setTags('');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">New Journal Entry</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Web Development, AI, Django"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Journal Component
const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{[key: string]: string}>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const auth = localStorage.getItem('journalAuth');
    setIsAuthenticated(auth === 'true');
  }, []);

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (e) {
        console.error('Error parsing journal entries:', e);
        // Initialize with sample entries if none exist
        setEntries([
          {
            id: '1',
            title: 'Exploring AI Integration in Web Development',
            content: 'Recently, I\'ve been experimenting with incorporating AI features into web applications. The possibilities are endless when it comes to enhancing user experiences with intelligent interfaces, personalized content, and predictive capabilities. I\'ve been particularly interested in how AI can streamline development workflows and create more engaging user experiences.',
            excerpt: 'Recently, I\'ve been experimenting with incorporating AI features into web applications. The possibilities are endless...',
            date: '2024-01-15',
            readTime: '5 min read',
            tags: ['AI', 'Web Development', 'Innovation'],
            likes: 12,
            comments: [
              {
                id: '1-1',
                author: 'Sarah K',
                content: 'Great insights! I\'ve been exploring AI integration too.',
                date: '2024-01-16'
              }
            ]
          },
          {
            id: '2',
            title: 'Building Scalable APIs with Spring Boot',
            content: 'In my latest project, I focused on creating a robust API architecture using Spring Boot. Here are the key principles I followed for scalability: implementing proper caching strategies, using connection pooling, designing RESTful endpoints with versioning, and implementing comprehensive logging and monitoring.',
            excerpt: 'In my latest project, I focused on creating a robust API architecture using Spring Boot. Here are the key principles...',
            date: '2024-01-10',
            readTime: '8 min read',
            tags: ['Spring Boot', 'API', 'Backend'],
            likes: 8,
            comments: []
          }
        ]);
      }
    } else {
      // Initialize with sample entries if none exist
      setEntries([
        {
          id: '1',
          title: 'Exploring AI Integration in Web Development',
          content: 'Recently, I\'ve been experimenting with incorporating AI features into web applications. The possibilities are endless when it comes to enhancing user experiences with intelligent interfaces, personalized content, and predictive capabilities. I\'ve been particularly interested in how AI can streamline development workflows and create more engaging user experiences.',
          excerpt: 'Recently, I\'ve been experimenting with incorporating AI features into web applications. The possibilities are endless...',
          date: '2024-01-15',
          readTime: '5 min read',
          tags: ['AI', 'Web Development', 'Innovation'],
          likes: 12,
          comments: [
            {
              id: '1-1',
              author: 'Sarah K',
              content: 'Great insights! I\'ve been exploring AI integration too.',
              date: '2024-01-16'
            }
          ]
        },
        {
          id: '2',
          title: 'Building Scalable APIs with Spring Boot',
          content: 'In my latest project, I focused on creating a robust API architecture using Spring Boot. Here are the key principles I followed for scalability: implementing proper caching strategies, using connection pooling, designing RESTful endpoints with versioning, and implementing comprehensive logging and monitoring.',
          excerpt: 'In my latest project, I focused on creating a robust API architecture using Spring Boot. Here are the key principles...',
          date: '2024-01-10',
          readTime: '8 min read',
          tags: ['Spring Boot', 'API', 'Backend'],
          likes: 8,
          comments: []
        }
      ]);
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (entryData: Omit<JournalEntry, 'id' | 'likes' | 'comments'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: Date.now().toString(),
      likes: 0,
      comments: []
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setShowForm(false);
  };

  const handleLike = (id: string) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, likes: entry.likes + 1 } : entry
    ));
  };

  const handleComment = (id: string) => {
    if (!commentText[id]?.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      author: 'Guest',
      content: commentText[id],
      date: new Date().toLocaleDateString()
    };
    
    setEntries(prev => prev.map(entry => 
      entry.id === id 
        ? { ...entry, comments: [...entry.comments, newComment] } 
        : entry
    ));
    
    setCommentText(prev => ({ ...prev, [id]: '' }));
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  return (
    <section id="journal" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Reflection Journal</h2>
            {isAuthenticated ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              >
                <Plus size={20} />
                New Entry
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Admin Login
              </button>
            )}
          </div>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            My thoughts on development, technology trends, and personal growth
          </p>
          
          <div className="space-y-8">
            {entries.map((entry) => (
              <article key={entry.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2 sm:mb-0">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {entry.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {entry.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {expandedEntry === entry.id ? entry.content : entry.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-6">
                  <button 
                    onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                  >
                    {expandedEntry === entry.id ? 'Show Less' : 'Read More'}
                    <ArrowRight 
                      size={16} 
                      className={`group-hover:translate-x-1 transition-transform ${expandedEntry === entry.id ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(entry.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Heart size={18} />
                      <span>{entry.likes}</span>
                    </button>
                    <button 
                      onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{entry.comments.length}</span>
                    </button>
                  </div>
                </div>
                
                {/* Comments Section */}
                {expandedEntry === entry.id && entry.comments.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Comments ({entry.comments.length})</h4>
                    <div className="space-y-4">
                      {entry.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add Comment Form */}
                {expandedEntry === entry.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentText[entry.id] || ''}
                        onChange={(e) => setCommentText({...commentText, [entry.id]: e.target.value})}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleComment(entry.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
            
            {entries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No journal entries yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showForm && (
        <JournalEntryForm 
          onSave={handleSaveEntry} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      {showLogin && (
        <AdminLogin 
          onLogin={() => setIsAuthenticated(true)} 
          onClose={() => setShowLogin(false)} 
        />
      )}
    </section>
  );
};

export default Journal;