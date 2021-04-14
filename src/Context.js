import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext();

export const useStore = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [itemIsDragging, setItemIsDragging] = useState("");
  const [elements, setElements] = useState([]);

  const dragging = (id) => {
    setItemIsDragging(id);
  };

  const isDrop = (id) => {
    setItemIsDragging("");
  };
  const value = { dragging, isDrop, itemIsDragging, elements, setElements };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
