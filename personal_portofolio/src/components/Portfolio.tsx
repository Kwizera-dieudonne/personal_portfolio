
import { ExternalLink, Github } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution built with Django and React, featuring user authentication, payment integration, and inventory management.',
      tech: ['Python', 'Django', 'React', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Management API',
      description: 'RESTful API built with Spring Boot for task management with role-based authentication and real-time notifications.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive portfolio website with modern design, contact forms, and blog functionality.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Django'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">My Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;