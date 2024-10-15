import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { FaTools, FaLock, FaBell, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import TypingEffect from 'react-typing-effect';

const Preloader = () => (
  <div className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center z-50">
    <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center">TribeLink is loading for you</h2>
    <div className="w-48 sm:w-64 h-2 bg-white rounded-full overflow-hidden">
      <div className="progress-bar h-full bg-green-300 rounded-full"></div>
    </div>
    <style jsx>{`
      .progress-bar {
        width: 0;
        animation: loading 4s ease-in-out infinite;
      }
      @keyframes loading {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 0;
        }
      }
    `}</style>
  </div>
);

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 sm:p-6 bg-gray-900 text-white shadow-lg">
    <div className="text-lg sm:text-2xl font-bold text-green-300">TribeLink</div>
    <div className="space-x-2 sm:space-x-4 text-sm sm:text-base">
      <a href="/app" className="text-green-300 hover:text-green-500 transition">Home</a>
      <a href="/app" className="text-green-300 hover:text-green-500 transition">Services</a>
      <a href="/app" className="text-green-300 hover:text-green-500 transition">Contact</a>
    </div>
  </nav>
);

const FeatureBox = ({ icon: Icon, title, description, animationRef }) => (
  <div 
    ref={animationRef} 
    className="flex flex-col justify-center items-center bg-gray-800 text-white shadow-lg p-4 sm:p-6 rounded-lg m-2 sm:m-4 max-w-full sm:max-w-xs transform transition duration-500 hover:scale-105 hover:bg-green-700"
  >
    <Icon className="text-green-300 text-3xl sm:text-4xl mb-2 sm:mb-4" />
    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
    <p className="text-center text-sm sm:text-base">{description}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 p-4 sm:p-6 text-center text-white shadow-inner">
    <div className="flex justify-center space-x-4 sm:space-x-6 text-green-300">
      <a href="https://facebook.com" className="text-2xl sm:text-3xl hover:text-green-500 transition">
        <FaFacebook />
      </a>
      <a href="https://twitter.com" className="text-2xl sm:text-3xl hover:text-green-500 transition">
        <FaTwitter />
      </a>
      <a href="https://instagram.com" className="text-2xl sm:text-3xl hover:text-green-500 transition">
        <FaInstagram />
      </a>
    </div>
    <p className="text-gray-400 mt-2 sm:mt-4 text-sm">&copy; {new Date().getFullYear()} TribeLink. All rights reserved.</p>
  </footer>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gradientStyle, setGradientStyle] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const feature1Ref = useRef(null);
  const feature2Ref = useRef(null);
  const feature3Ref = useRef(null);

  const title = "We're Coming Soon!";
  const subtitle = "Our ONDC-based service platform will be available soon. Stay tuned!";

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const targetDate = new Date("2024-12-31T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      if (distance < 0) clearInterval(interval);
    }, 1000);

    const updateGradient = () => {
      const gradient = `
        linear-gradient(135deg, 
        rgba(0, 100, 0, 0.9) 0%,     
        rgba(34, 139, 34, 0.8) 40%,  
        rgba(255, 255, 255, 1) 100%  
        )`;
      setGradientStyle(gradient);
    };

    const gradientInterval = setInterval(updateGradient, 2000);

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(feature1Ref.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 });
    tl.fromTo(feature2Ref.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
    tl.fromTo(feature3Ref.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");

    return () => {
      clearInterval(interval);
      clearInterval(gradientInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: gradientStyle }}>
      {isLoading && <Preloader />}
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          <TypingEffect text={title} speed={100} eraseSpeed={50} />
        </h1>
        <p className="text-sm sm:text-lg mb-6 sm:mb-8">{subtitle}</p>

        <div className="mb-6 sm:mb-10 text-lg sm:text-2xl">
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <div className="bg-white text-gray-800 shadow-lg p-2 sm:p-4 rounded-lg transform transition-all duration-500 hover:scale-110">
              <div className="text-2xl sm:text-4xl font-bold">{timeLeft.days}</div>
              <div className="text-xs sm:text-sm text-gray-500">Days</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg p-2 sm:p-4 rounded-lg transform transition-all duration-500 hover:scale-110">
              <div className="text-2xl sm:text-4xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs sm:text-sm text-gray-500">Hours</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg p-2 sm:p-4 rounded-lg transform transition-all duration-500 hover:scale-110">
              <div className="text-2xl sm:text-4xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs sm:text-sm text-gray-500">Minutes</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg p-2 sm:p-4 rounded-lg transform transition-all duration-500 hover:scale-110">
              <div className="text-2xl sm:text-4xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs sm:text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <FeatureBox 
            icon={FaTools} 
            title="Wide Range of Services" 
            description="Get access to a variety of services on one platform." 
            animationRef={feature1Ref}
          />
          <FeatureBox 
            icon={FaLock} 
            title="Secure Transactions" 
            description="Experience fast and secure payments." 
            animationRef={feature2Ref}
          />
          <FeatureBox 
            icon={FaBell} 
            title="Real-Time Updates" 
            description="Track your services in real-time with live notifications." 
            animationRef={feature3Ref}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
