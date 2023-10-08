import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { path } from "src/constants/path";
import PlayVoiceIcon from "../Icon/PlayVoiceIcon";
import PauseVoiceIcon from "../Icon/PauseVoiceIcon";

type TTextToSpeechProps = {
  text: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const TextToSpeech: React.FC<TTextToSpeechProps> = ({ text, ...props }) => {
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
      {speaking && !paused ? (
        <PauseVoiceIcon
          color="#6b6b6b"
          width={24}
          height={24}
          className="cursor-pointer hover:text-softBlack"
        ></PauseVoiceIcon>
      ) : (
        <PlayVoiceIcon
          color="#6b6b6b"
          width={24}
          height={24}
          className="cursor-pointer hover:text-softBlack"
        ></PlayVoiceIcon>
      )}
    </button>
  );
};

export default TextToSpeech;
