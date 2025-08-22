import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import videoSource from '../assets/myvideo.mp4';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        // Hide controls after 3 seconds when video starts playing
        setTimeout(() => setShowControls(false), 3000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const exitVideoMode = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setShowControls(true);
  };

  // Show controls when mouse moves
  useEffect(() => {
    const handleMouseMove = () => {
      if (isPlaying) {
        setShowControls(true);
        // Hide controls again after 3 seconds of inactivity
        setTimeout(() => setShowControls(false), 3000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background - Always visible but text disappears when playing */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Color Overlay - Only visible when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/70 to-emerald-800/70"></div>
        )}
      </div>
      
      {/* Content Overlay - Disappears when video is playing */}
      {!isPlaying && (
        <div className="container mx-auto px-4 text-center relative z-10 transition-opacity duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Full Stack Developer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Passionate about creating robust web applications with Python Django, 
              Java Spring Boot, and modern technologies
            </p>
            
            {/* Play Button - Only shown when video is not playing */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={handlePlayPause}
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all text-white hover:scale-110"
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-full font-semibold text-white transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#portfolio"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold text-white transition-colors"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Controls - Appear when video is playing and on hover */}
      {isPlaying && showControls && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full p-3 z-20">
          <button
            onClick={handlePlayPause}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <Pause className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleMuteToggle}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={exitVideoMode}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Play Button Overlay - Appears when video is playing but controls are hidden */}
      {isPlaying && !showControls && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => setShowControls(true)}
            className="bg-black/30 backdrop-blur-sm rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity"
          >
            <Play className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
      
      {/* Scroll Indicator - Only shown when not playing */}
      {!isPlaying && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      )}
    </section>
  );
};

export default Hero;