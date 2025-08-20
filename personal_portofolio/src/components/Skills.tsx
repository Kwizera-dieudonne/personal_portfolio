const Skills = () => {
  const skills = [
    { name: 'Python Django', level: 90, color: 'bg-green-500' },
    { name: 'Java Spring Boot', level: 80, color: 'bg-orange-500' },
    { name: 'REACT', level: 50, color: 'bg-blue-500' },
    { name: 'SQL', level: 80, color: 'bg-purple-500' },
    { name: 'Git & GitHub', level: 88, color: 'bg-gray-700' },
    { name: 'JavaScript', level: 75, color: 'bg-yellow-500' },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['VS Code', 'IntelliJ IDEA', 'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'Heroku', 'Postman'].map((tool) => (
                <span
                  key={tool}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;