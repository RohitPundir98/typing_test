import React, { useState, useEffect } from "react";

const Timer = ({ duration, isTestOver }) => {
  // Set the initial time left to the duration provided (e.g., 60 seconds).
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // If the test is over, we stop the timer from counting down further.
    if (isTestOver) return;

    // Start the timer which ticks down every second (1000ms).
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // If time reaches 0 or less, clear the interval and stop the countdown.
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0; // Time can't go below 0.
        }
        // Otherwise, keep counting down by reducing the time by 1 second.
        return prevTime - 1;
      });
    }, 1000);

    // Clean up the timer when the component unmounts or the test ends.
    return () => clearInterval(timer);
  }, [isTestOver]); // This effect runs again if 'isTestOver' changes.

  return (
    <div className="text-xl font-semibold">
      Time Left: {Math.floor(timeLeft / 60)}:
      {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
    </div>
  );
};

export default Timer;
