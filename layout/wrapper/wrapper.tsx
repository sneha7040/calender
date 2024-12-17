import React, { ReactNode } from "react";


import Header from "../header";

interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
     
    </>
  );
};

export default Wrapper;
