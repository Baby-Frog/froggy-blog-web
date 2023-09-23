import React, { useState, useEffect } from "react";

type TTextToSpeechProps = {
  text: string;
  children: React.ReactNode;
};

const TextToSpeech: React.FC<TTextToSpeechProps> = ({ text, children }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [paused, setPaused] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (speaking) {
      if (paused) {
        window.speechSynthesis.resume();
        setPaused(false);
      } else {
        window.speechSynthesis.pause();
        setPaused(true);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices?.[0];
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
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
