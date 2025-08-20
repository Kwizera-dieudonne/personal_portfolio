import { Code, Database, Server } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Me</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            I'm a passionate full-stack developer with expertise in modern web technologies. 
            My journey in software development spans multiple frameworks and languages, 
            with a focus on creating scalable, maintainable, and user-friendly applications.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frontend Development</h3>
              <p className="text-gray-600">
                Creating responsive, interactive user interfaces with modern HTML, CSS, 
                and JavaScript frameworks.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Backend Development</h3>
              <p className="text-gray-600">
                Building robust server-side applications with Python Django and 
                Java Spring Boot frameworks.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Database Management</h3>
              <p className="text-gray-600">
                Designing and optimizing SQL databases for efficient data storage 
                and retrieval in web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;