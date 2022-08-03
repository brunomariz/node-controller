import React from "react";

type Props = {
  label: string;
  large?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function ToolbarButton({ label, large = false, onClick }: Props) {
  return (
    <>
      {large ? (
        <button
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
          className="bottom-border-black ml-1 h-32 w-20 "
        >
          {label}
        </button>
      ) : (
        <button
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
          className="ml-1 py-2 px-2 bg-gray-100 hover:bg-gray-200"
        >
          {label}
        </button>
      )}
    </>
  );
}

export default ToolbarButton;
