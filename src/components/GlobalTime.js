import React, { useState, useEffect } from 'react';
import './GlobalTime.css';

const GlobalTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="global-time">
      <h1 className="time">{time.toLocaleTimeString()}</h1>
      <h2 className="date">{time.toLocaleDateString()}</h2>
    </div>
  );
};

export default GlobalTime;
