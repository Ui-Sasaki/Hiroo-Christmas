import React from 'react';

const Buttons = () => {
  return (
    <div className="space-x-4">
      <button
        className="text-white px-4 py-2 rounded min-w-[200px] min-h-[45px]"
        style={{ backgroundColor: '#FFC20E' }}
      >
        決済履歴
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded min-w-[200px] min-h-[45px]" style={{backgroundColor: '#3F861E'}}>
        集計表示
      </button>
    </div>
  );
};

export default Buttons;
