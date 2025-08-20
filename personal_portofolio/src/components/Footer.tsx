
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
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
          
          <div className="text-gray-500 text-sm">
            <p>© 2024 Your Name. All rights reserved.</p>
            <p className="mt-2">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;