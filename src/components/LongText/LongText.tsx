import { useState } from "react";

type TLongText = {
  children: string;
  className?: string;
};

const MAX_LENGTH = 200;

const LongText = ({ children, className }: TLongText) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleShowFullText = () => {
    setShowFullText(true);
  };
  const handleShowLessText = () => {
    setShowFullText(false);
  };
  return (
    <div>
      {showFullText ? (
        <>
          <p className={className}>{children}</p>
          <button
            className="block text-normalGreen hover:text-normalGreenHover"
            onClick={handleShowLessText}
          >
            Show less
          </button>
        </>
      ) : (
        <p className={className}>
          {children.slice(0, MAX_LENGTH)}
          {children.length > MAX_LENGTH && "..."}
          {children.length >= MAX_LENGTH && (
            <button
              className="block text-normalGreen hover:text-normalGreenHover"
              onClick={handleShowFullText}
            >
              Read more
            </button>
          )}
        </p>
      )}
    </div>
  );
};

export default LongText;
