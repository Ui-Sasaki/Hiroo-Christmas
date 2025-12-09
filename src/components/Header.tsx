// src/components/Header.tsx
import React from "react";

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="text-3xl font-bold text-green-700 text-center tracking-wide">
      {title}
    </h1>
  );
};

export default Header;