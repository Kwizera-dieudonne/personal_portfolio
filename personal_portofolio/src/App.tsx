
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Resume />
        <Journal />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;
