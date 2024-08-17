import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";

const TypingTest = ({ paragraph, duration }) => {
  const [inputText, setInputText] = useState("");
  const [isTestOver, setIsTestOver] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [backspaceCount, setBackspaceCount] = useState(0); // State to track backspace presses
  const paragraphRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTestOver) return;

      if (e.key === "Backspace") {
        setTypedText((prevText) => prevText.slice(0, -1));
        setBackspaceCount((prevCount) => prevCount + 1); // Increment backspace count
      } else if (e.key.length === 1) {
        setTypedText((prevText) => prevText + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTestOver]);

  useEffect(() => {
    if (isTestOver) return;

    if (startTime === null) {
      setStartTime(Date.now());
    }

    const timer = setTimeout(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const timeLeft = duration - elapsedTime;
      if (timeLeft <= 0 || typedText === paragraph) {
        setIsTestOver(true);
        setErrors(countErrors());
        calculateWPM();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [startTime, duration, isTestOver, typedText]);

  const countErrors = () => {
    let errorCount = 0;
    const minLength = Math.min(paragraph.length, typedText.length);

    // Count errors for mismatched characters within the length of the paragraph
    for (let i = 0; i < minLength; i++) {
      if (paragraph[i] !== typedText[i]) errorCount++;
    }

    // Count extra characters typed beyond the paragraph length
    if (typedText.length > paragraph.length) {
      errorCount += typedText.length - paragraph.length;
    }

    return errorCount;
  };

  const calculateWPM = () => {
    const wordCount = typedText.trim().split(/\s+/).length;
    const minutes = (Date.now() - startTime) / 60000;
    setWpm(Math.round(wordCount / minutes));
  };

  const getHighlightedText = () => {
    return paragraph.split("").map((char, index) => {
      const userChar = typedText[index] || "";
      const isCorrect = char === userChar;
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
        {getHighlightedText()}
      </div>
      <div className="mt-4 text-lg">
        {isTestOver && (
          <>
            <h4 className="inline mr-4">Errors: {errors}</h4>
            <h4 className="inline mr-4">WPM: {wpm}</h4>
            <h4 className="inline mr-4">Backspaces: {backspaceCount}</h4>
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
