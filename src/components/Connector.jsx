import React from "react";
import { Handle } from "react-flow-renderer";

const Connector = ({ targetPosition }) => {
  let connector;

  const connectorLeft = (
    <>
      <Handle
        type="target"
        position="left"
        style={{ left: "-10px", background: "#555", padding: "5px" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );

  const connectorRight = (
    <>
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ right: "-10px", background: "#555", padding: "5px" }}
      />
    </>
  );

  if (targetPosition === "left") {
    connector = connectorLeft;
  } else if (targetPosition === "right") {
    connector = connectorRight;
  } else {
    connector = (
      <>
        {connectorLeft}
        {connectorRight}
      </>
    );
  }
  return <div>{connector}</div>;
};

export default Connector;
