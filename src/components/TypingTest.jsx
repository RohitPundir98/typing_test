import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";

const TypingTest = ({ paragraph, duration }) => {
  const [inputText, setInputText] = useState("");
  const [isTestOver, setIsTestOver] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [backspaceCount, setBackspaceCount] = useState(0); // Keeping track of how many times backspace was pressed
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Listen for key presses and update the typed text accordingly
    const handleKeyDown = (e) => {
      if (isTestOver) return;

      if (e.key === "Backspace") {
        setTypedText((prevText) => prevText.slice(0, -1)); // Remove the last character on backspace
        setBackspaceCount((prevCount) => prevCount + 1); // Increase backspace count
      } else if (e.key.length === 1) {
        setTypedText((prevText) => prevText + e.key); // Add the typed character to the text
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTestOver]);

  useEffect(() => {
    // Don't start the timer if the test is over
    if (isTestOver) return;

    // If the timer hasn't started yet, start it now
    if (startTime === null) {
      setStartTime(Date.now());
    }

    const timer = setTimeout(() => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Calculate elapsed time in seconds
      const timeLeft = duration - elapsedTime;

      // If time runs out or the user finishes typing the paragraph, end the test
      if (timeLeft <= 0 || typedText === paragraph) {
        setIsTestOver(true);
        setErrors(countErrors()); // Count the errors made
        calculateWPM(); // Calculate words per minute
      }
    }, 1000);

    // Cleanup when the timer is no longer needed
    return () => clearTimeout(timer);
  }, [startTime, duration, isTestOver, typedText]);

  // This function compares the typed text with the paragraph and counts the errors
  const countErrors = () => {
    let errorCount = 0;
    const minLength = Math.min(paragraph.length, typedText.length);

    for (let i = 0; i < minLength; i++) {
      if (paragraph[i] !== typedText[i]) errorCount++; // Increment error count for mismatched characters
    }

    // If the user typed more than the paragraph, count the extra characters as errors
    if (typedText.length > paragraph.length) {
      errorCount += typedText.length - paragraph.length;
    }

    return errorCount;
  };

  // This function calculates words per minute (WPM) based on the typed text and time elapsed
  const calculateWPM = () => {
    const wordCount = typedText.trim().split(/\s+/).length; // Count the number of words typed
    const minutes = (Date.now() - startTime) / 60000; // Convert elapsed time to minutes
    setWpm(Math.round(wordCount / minutes));
  };

  // This function highlights correct and incorrect characters in the paragraph
  const getHighlightedText = () => {
    return paragraph.split("").map((char, index) => {
      const userChar = typedText[index] || "";
      const isCorrect = char === userChar; // Check if the character is correct
      return (
        <span
          key={index}
          className={`${
            isCorrect ? "text-green-400" : userChar ? "text-red-400" : ""
          }`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Timer duration={duration} isTestOver={isTestOver} />
      <div
        className="mt-2 p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-3xl"
        style={{
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          fontSize: "1.5rem",
        }}
        ref={paragraphRef}
      >
        {getHighlightedText()}{" "}
      </div>
      <div className="mt-4 text-lg">
        {isTestOver && (
          <>
            <h4 className="inline mr-4">Errors: {errors}</h4>{" "}
            <h4 className="inline mr-4">WPM: {wpm}</h4>{" "}
            <h4 className="inline mr-4">Backspaces: {backspaceCount}</h4>{" "}
          </>
        )}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Restart
      </button>
    </div>
  );
};

export default TypingTest;
