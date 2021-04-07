import React, { memo } from "react";

import Connector from "./Connector";

export default memo(({ data }) => {
  const targetPosition = data.targetPosition;
  return (
    <div className="widget">
      <Connector targetPosition={targetPosition} />
      <div>{data.name}</div>
      <button onClick={() => data.onElementsRemove(data.id)}>close</button>
    </div>
  );
});
