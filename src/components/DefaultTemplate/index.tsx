import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom"

interface Props {
  children: ReactNode
}

const DefaultTemplate = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <main>{children}</main>
    </BrowserRouter>
  );
};

export default DefaultTemplate;
