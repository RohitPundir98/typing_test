import React, { useState, useEffect } from "react";

const ParagraphSelector = ({ onSelect }) => {
  // This will hold all the paragraphs that we fetch from the para.json file.
  const [paragraphs, setParagraphs] = useState([]);

  // Keeps track of which paragraph the user has selected.
  const [selectedIndex, setSelectedIndex] = useState(null);

  // When the component loads, we fetch the paragraphs from the JSON file.
  useEffect(() => {
    fetch("/para.json")
      .then((response) => response.json())
      .then((data) => setParagraphs(data));
  }, []); // This runs only once, when the component is mounted.

  // This function is called when the user clicks on a paragraph.
  const handleClick = (index, para) => {
    setSelectedIndex(index);
    onSelect(para);
  };

  return (
    <div className="flex flex-row items-center justify-center flex-wrap gap-6 p-6">
      {/* Loop through each paragraph and display it in a clickable box */}
      {paragraphs.map((para, index) => (
        <div
          key={index}
          className={`w-80 h-80 p-6 rounded-lg shadow-lg cursor-pointer transition-colors flex justify-center overflow-auto
            ${
              selectedIndex === index ? "bg-gray-600" : "bg-gray-800"
            } // Change background color if it's the selected one.
            hover:bg-gray-700`}
          onClick={() => handleClick(index, para)}
        >
          <p className="text-md text-justify">{para}</p>
        </div>
      ))}
    </div>
  );
};

export default ParagraphSelector;
