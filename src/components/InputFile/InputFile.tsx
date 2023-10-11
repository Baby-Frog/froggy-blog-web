import React from "react";

type TInputFileProps = {
  className?: string;
  children?: React.ReactNode;
  handleChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickOnInput?: () => void;
  buttonClassName?: string;
  inputFileRef?: React.RefObject<HTMLInputElement>;
};

const InputFile = ({
  children,
  className,
  buttonClassName,
  handleChangeFile,
  handleClickOnInput,
  inputFileRef,
}: TInputFileProps) => {
  return (
    <div className={className}>
      <input
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleChangeFile}
        ref={inputFileRef}
      />
      <button
        type="button"
        onClick={handleClickOnInput}
        className={`flex items-center text-sm text-gray-600 ${buttonClassName}`}
      >
        {children}
      </button>
    </div>
  );
};

export default InputFile;
