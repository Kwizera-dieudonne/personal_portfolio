import { ChevronDown, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 flex items-center justify-center text-white relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">
            Passionate about creating robust web applications with Python Django, 
            Java Spring Boot, and modern technologies
          </p>
          
          {/* Intro Video Section */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Get to Know Me</h3>
              <div className="bg-gray-900/50 rounded-xl aspect-video flex items-center justify-center mb-4 cursor-pointer hover:bg-gray-900/70 transition-colors group">
                <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-blue-100">
                Watch my introductory video to learn about my journey, 
                passion for development, and what drives me to create exceptional software.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#contact"
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#portfolio"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;