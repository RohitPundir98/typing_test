import React, { useState } from "react";
import ParagraphSelector from "./components/ParagraphSelector";
import TypingTest from "./components/TypingTest";

function App() {
  // This will store the paragraph that the user chooses to type out.
  const [selectedParagraph, setSelectedParagraph] = useState("");

  // This keeps track of whether the typing test has started or not.
  const [isTesting, setIsTesting] = useState(false);

  // Setting a default test duration of 60 seconds (could be customizable later).
  const [testDuration, setTestDuration] = useState(60);

  // When the user clicks "Start Test," we flip the switch to begin the test.
  const handleStartTest = () => {
    setIsTesting(true);
  };

  return (
    <div className="App bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Typing Speed Test</h1>

      {/* If the test hasn't started yet, show the paragraph selector and start button. */}
      {!isTesting ? (
        <>
          {/* ParagraphSelector lets the user pick a paragraph to type. */}
          <ParagraphSelector onSelect={setSelectedParagraph} />

          {/* The start button gets the test going. */}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleStartTest}
          >
            Start Test
          </button>
        </>
      ) : (
        // Once the test starts, we display the TypingTest component with the chosen paragraph and timer.
        <TypingTest paragraph={selectedParagraph} duration={testDuration} />
      )}
    </div>
  );
}

export default App;
