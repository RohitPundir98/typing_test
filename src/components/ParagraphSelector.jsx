import React, { useState, useEffect } from "react";

const ParagraphSelector = ({ onSelect }) => {
  const [paragraphs, setParagraphs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch("/para.json")
      .then((response) => response.json())
      .then((data) => setParagraphs(data));
  }, []);

  const handleClick = (index, para) => {
    setSelectedIndex(index);
    onSelect(para);
  };

  return (
    <div className="flex flex-row items-center justify-center flex-wrap gap-6 p-6">
      {paragraphs.map((para, index) => (
        <div
          key={index}
          className={`w-80 h-80 p-6 rounded-lg shadow-lg cursor-pointer transition-colors flex justify-center overflow-auto
            ${selectedIndex === index ? "bg-gray-600" : "bg-gray-800"}
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
