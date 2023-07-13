import React from "react";

export default function Modal({
  description,
  buttonText,
  isCancelBtn,
  onClick,
  setVisible,
}: {
  description: string;
  buttonText: string;
  isCancelBtn: boolean;
  onClick: () => void;
  setVisible: () => void;
}) {
  return (
    <>
      <div
        onClick={setVisible}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60 z-10"
      />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/6 min-w-[200px] max-w-[500px] h-1/6 min-h-[150px] max-h-[300px] p-6 z-50 flex flex-col items-center justify-center gap-10 bg-white rounded-2xl`}
      >
        <p className="text-xs md:text-sm xl:text-md 2xl:text-lg font-bold text-black">
          {description}
        </p>
        <div className="flex gap-8">
          {isCancelBtn && (
            <button
              onClick={setVisible}
              className="px-4 py-1 bg-gray-700 text-xs xl:text-sm 2xl:text-lg rounded-lg font-bold hover:opacity-90"
            >
              {"취소"}
            </button>
          )}

          <button
            onClick={onClick}
            className="px-4 py-1 bg-purple-600 text-xs xl:text-sm 2xl:text-lg rounded-lg font-bold hover:opacity-90"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
