
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Journal = () => {
  const entries = [
    {
      title: 'Exploring AI Integration in Web Development',
      excerpt: 'Recently, I\'ve been experimenting with incorporating AI features into web applications. The possibilities are endless when it comes to enhancing user experiences...',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['AI', 'Web Development', 'Innovation']
    },
    {
      title: 'Building Scalable APIs with Spring Boot',
      excerpt: 'In my latest project, I focused on creating a robust API architecture using Spring Boot. Here are the key principles I followed for scalability...',
      date: '2024-01-10',
      readTime: '8 min read',
      tags: ['Spring Boot', 'API', 'Backend']
    },
    {
      title: 'The Power of Django for Rapid Prototyping',
      excerpt: 'Django continues to be my go-to framework for rapid web application development. Its built-in features and ORM make development incredibly efficient...',
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['Django', 'Python', 'Framework']
    },
    {
      title: 'Git Workflow Best Practices',
      excerpt: 'Version control is crucial for any development project. Here are the Git workflows and practices that have served me well in collaborative environments...',
      date: '2023-12-28',
      readTime: '4 min read',
      tags: ['Git', 'Workflow', 'Collaboration']
    }
  ];

  return (
    <section id="journal" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Reflection Journal</h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            My thoughts on development, technology trends, and personal growth
          </p>
          
          <div className="space-y-8">
            {entries.map((entry, index) => (
              <article key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                  {entry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {entry.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All Entries
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journal;