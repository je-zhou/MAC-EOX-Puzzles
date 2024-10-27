import React, { useState, useEffect } from "react";

const TextStream = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayedText.length < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 2); // Adjust speed by changing timeout duration

      return () => clearTimeout(timeout);
    } else if (displayedText.length === text.length) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping]);

  return (
    <div className="w-full flex-1">
      <p className=" leading-relaxed">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-4 bg-gray-800 ml-1 animate-pulse" />
        )}
      </p>
    </div>
  );
};

export default TextStream;
