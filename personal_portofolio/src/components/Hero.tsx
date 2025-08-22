import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import videoSource from '../assets/myvideo.mp4';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setVideoEnded(false);
        // Hide controls after 3 seconds when video starts playing
        hideControlsWithDelay();
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
      videoRef.current.currentTime = 0; // Reset to beginning
    }
    setIsPlaying(false);
    setShowControls(true);
    setVideoEnded(false);
    clearControlsTimeout();
  };

  const hideControlsWithDelay = () => {
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoEnded(true);
    setShowControls(true);
    clearControlsTimeout();
  };

  // Show controls when mouse moves
  useEffect(() => {
    const handleMouseMove = () => {
      if (isPlaying && !videoEnded) {
        setShowControls(true);
        hideControlsWithDelay();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearControlsTimeout();
    };
  }, [isPlaying, videoEnded]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        // Video is ready
      };
      
      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background Container */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
          <video
            ref={videoRef}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            muted={isMuted}
            playsInline
            preload="metadata"
          >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle dark overlay for better text readability - always present but lighter when playing */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isPlaying && !videoEnded 
              ? 'bg-black/20' 
              : 'bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-emerald-900/60'
          }`}></div>
        </div>
      </div>
      
      {/* Content Overlay - Disappears when video is playing but not ended */}
      {(!isPlaying || videoEnded) && (
        <div className="container mx-auto px-4 text-center relative z-10 transition-all duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              Full Stack Developer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 drop-shadow-lg">
              Passionate about creating robust web applications with Python Django, 
              Java Spring Boot, and modern technologies
            </p>
            
            {/* Play Button */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={handlePlayPause}
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all text-white hover:scale-110 shadow-xl"
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
            
            {videoEnded && (
              <div className="mb-8">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      handlePlayPause();
                    }
                  }}
                  className="bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-700/80 px-6 py-3 rounded-full font-semibold text-white transition-all shadow-lg"
                >
                  Play Again
                </button>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-700/80 px-8 py-3 rounded-full font-semibold text-white transition-all shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="#portfolio"
                className="bg-transparent border-2 border-white/80 backdrop-blur-sm hover:bg-white/20 hover:border-white px-8 py-3 rounded-full font-semibold text-white transition-all shadow-lg"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Controls - Appear when video is playing and on hover */}
      {isPlaying && !videoEnded && showControls && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full p-3 z-20 shadow-xl">
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
      
      {/* Click to show controls when hidden during playback */}
      {isPlaying && !videoEnded && !showControls && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={() => {
            setShowControls(true);
            hideControlsWithDelay();
          }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
      
      {/* Scroll Indicator - Only shown when not playing or video ended */}
      {(!isPlaying || videoEnded) && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70 drop-shadow-lg" />
        </div>
      )}
    </section>
  );
};

export default Hero;