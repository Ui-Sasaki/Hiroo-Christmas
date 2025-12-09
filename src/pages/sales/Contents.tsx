// src/pages/sales/Contents.tsx
import React from "react";

type ContentsProps = {
  title: string;
  subTitle: string;
  price: number | string;
  onClick?: () => void;
};

const Contents: React.FC<ContentsProps> = ({
  title,
  subTitle,
  price,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[230px] h-[150px] bg-white rounded shadow-md px-6 py-4 text-left
                 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
    >
      <p className="text-sm text-gray-500 mb-1">{subTitle}</p>
      <p className="text-2xl font-semibold mb-2 break-words">{title}</p>
      <p className="text-green-600 font-semibold">{price}円</p>
    </button>
  );
};

export default Contents;