import React from "react";
import List from "./components/List";
import Middle from "./components/Middle";
import ContextProvider from "./Context";
const App = () => {
  return (
    <ContextProvider>
      <div className="root">
        <List />
        <Middle />
      </div>
    </ContextProvider>
  );
};

export default App;
