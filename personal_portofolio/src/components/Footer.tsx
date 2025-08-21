
import { Github, Linkedin} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Kwizera-dieudonne/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://https://www.linkedin.com/in/kwizera-dieudonne-915434359/', label: 'LinkedIn' },
   
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
          <p className="text-gray-400 mb-8">
            Connect with me on social media or check out my work on various platforms
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;