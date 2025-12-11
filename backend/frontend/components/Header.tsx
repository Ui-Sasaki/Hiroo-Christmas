import React from "react";

interface HeaderProps {
  title?: string; // make it optional
}

const Header: React.FC<HeaderProps> = ({ title = "メニュー" }) => {
  return (
    <h1 className="text-center text-3xl font-bold text-green-700">
      {title}
    </h1>
  );
};

export default Header;