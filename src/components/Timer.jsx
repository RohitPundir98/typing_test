import React, { useState, useEffect } from "react";

const Timer = ({ duration, isTestOver }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (isTestOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestOver]);

  return (
    <div className="text-xl font-semibold">
      Time Left: {Math.floor(timeLeft / 60)}:
      {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
    </div>
  );
};

export default Timer;
