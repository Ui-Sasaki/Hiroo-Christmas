// src/pages/sales/List.tsx
import React from "react";

type ListProps = {
  title: string;
  numbers: number;
  price: number | string;
  onChange: (nextQty: number) => void;
};

const List: React.FC<ListProps> = ({ title, numbers, price, onChange }) => {
  const handleMinus = () => {
    if (numbers <= 0) return;
    onChange(numbers - 1);
  };

  const handlePlus = () => {
    onChange(numbers + 1);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex-1 mr-2 truncate">{title}</div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleMinus}
          className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center"
        >
          −
        </button>
        <span className="w-6 text-center">{numbers}</span>
        <button
          type="button"
          onClick={handlePlus}
          className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center"
        >
          ＋
        </button>
      </div>

      <div className="w-16 text-right">{price}円</div>
    </div>
  );
};

export default List;