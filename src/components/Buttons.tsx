import React from "react";

export type SalesView = "history" | "summary";

type Props = {
  // どの画面が選ばれているか
  view: SalesView;
  // ボタンを押したときに親コンポーネントへ知らせる
  onChangeView: (v: SalesView) => void;
};

const Buttons: React.FC<Props> = ({ view, onChangeView }) => {
  return (
    <div className="flex justify-center gap-8 mt-4 mb-6">
      {/* 決済履歴ボタン */}
      <button
        type="button"
        onClick={() => onChangeView("history")}
        className={`min-w-[200px] px-10 py-3 rounded font-semibold text-lg shadow
          transition transform hover:-translate-y-0.5
          ${
            view === "history"
              ? "bg-[#FFC20E] text-white"
              : "bg-[#FFE89A] text-green-800"
          }`}
      >
        決済履歴
      </button>

      {/* 集計表示ボタン */}
      <button
        type="button"
        onClick={() => onChangeView("summary")}
        className={`min-w-[200px] px-10 py-3 rounded font-semibold text-lg shadow
          transition transform hover:-translate-y-0.5
          ${
            view === "summary"
              ? "bg-[#2F855A] text-white"
              : "bg-[#C6F6D5] text-green-900"
          }`}
      >
        集計表示
      </button>
    </div>
  );
};

export default Buttons;