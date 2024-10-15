const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
    useEffect(() => {
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
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="flex space-x-4 text-2xl text-white">
        <div>{timeLeft.days}d</div>
        <div>{timeLeft.hours}h</div>
        <div>{timeLeft.minutes}m</div>
        <div>{timeLeft.seconds}s</div>
      </div>
    );
  };
  