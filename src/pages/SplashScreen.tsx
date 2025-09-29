import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Sparkles } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate('/login'), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 bg-gradient-hero flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center animate-scale-in">
        <div className="flex items-center justify-center mb-6 relative">
          <div className="relative">
            <Scissors className="h-16 w-16 text-white mb-2 animate-pulse" />
            <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
          Saloon
          <span className="block text-2xl md:text-3xl font-light text-white/90">
            Marketplace
          </span>
        </h1>
        
        <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
          Your gateway to beauty business management
        </p>
        
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;