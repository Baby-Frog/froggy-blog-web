import React, { useState, useEffect } from "react";

type TTextToSpeechProps = {
  text: string;
  children: React.ReactNode;
};

const TextToSpeech: React.FC<TTextToSpeechProps> = ({ text, children }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const handleButtonClick = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices?.[0] || null;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoicesChanged = () => {
    setVoices(window.speechSynthesis.getVoices());
  };

  useEffect(() => {
    setVoices(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  return <button onClick={handleButtonClick}>{children}</button>;
};

export default TextToSpeech;
