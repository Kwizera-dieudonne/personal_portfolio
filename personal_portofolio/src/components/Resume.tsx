
import { Download, FileText, Mail } from 'lucide-react';

const Resume = () => {

  const handleDownload = (fileName: string) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = `/documents/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Resume & Communications</h2>
          <p className="text-xl text-gray-600 mb-12">
            Download my resume, cover letter, and other professional documents
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Comprehensive overview of my experience, skills, and achievements
              </p>
              <button 
                onClick={() => handleDownload('resume.pdf')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 mx-auto">
                <Download size={16} />
                Download PDF
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Personalized cover letter template highlighting my passion and goals
              </p>
              <button
                onClick={() => handleDownload('cover-letter.pdf')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 mx-auto">
                <Download size={16} />
                Download PDF
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">References</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Professional references and recommendation letters
              </p>
              <button 
                onClick={() => handleDownload('references.pdf')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 mx-auto">
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;