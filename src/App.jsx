import React, { useState } from "react";
import ParagraphSelector from "./components/ParagraphSelector";
import TypingTest from "./components/TypingTest";

function App() {
  const [selectedParagraph, setSelectedParagraph] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [testDuration, setTestDuration] = useState(60);

  const handleStartTest = () => {
    setIsTesting(true);
  };

  return (
    <div className="App bg-gray-900 text-white min-h-screen flex flex-col items-center p-4"> 
      <h1 className="text-3xl font-bold mb-4">Typing Speed Test</h1>
      {!isTesting ? (
        <>
          <ParagraphSelector onSelect={setSelectedParagraph} />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleStartTest}
          >
            Start Test
          </button>
        </>
      ) : (
        <TypingTest paragraph={selectedParagraph} duration={testDuration} />
      )}
    </div>
  );
}

export default App;
