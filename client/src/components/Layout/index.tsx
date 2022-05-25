import React, { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return <div className="h-full mx-auto">{children}</div>;
};
