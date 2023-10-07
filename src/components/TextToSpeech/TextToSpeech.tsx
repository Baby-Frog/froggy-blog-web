import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { path } from "src/constants/path";

type TTextToSpeechProps = {
  text: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

const TextToSpeech: React.FC<TTextToSpeechProps> = ({ text, children, ...props }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [paused, setPaused] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const location = useLocation();
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

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (speaking) {
        window.speechSynthesis.cancel();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, [speaking]);

  useEffect(() => {
    if (location.pathname === path.HOMEPAGE || location.pathname === path.PROFILE) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [location.pathname, speaking]);

  return (
    <button
      className={props.className}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default TextToSpeech;
