import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  removeElements,
} from "react-flow-renderer";
import Industry from "./Industry";
import Forest from "./Forest";
import { useStore } from "../Context";
import { useDrop } from "react-dnd";
import { setElementsStore } from "../app/UISlice";
import { useSelector, useDispatch } from "react-redux";

const initialElements = [];

const initBgColor = "#1A192B";

const nodeTypes = {
  industry: Industry,
  forest: Forest,
  atmosphere: Industry,
  climate: Industry,
  city: Industry,
  year: Industry,
  statisticVisualization: Industry,
};

const Middle = () => {
  const { itemIsDragging } = useStore();
  const dispatch = useDispatch();

  const elementsStore = useSelector((state) => state.ui.elements);
  const [rfInstance, setRfInstance] = useState(null);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [elements, setElements] = useState(initialElements);
  console.log("elements: ", elements);
  const [elementClick, setElementClick] = useState({});

  useEffect(() => {
    const action = setElementsStore(elements);
    dispatch(action);
  }, [elements, dispatch]);

  const onElementsRemove = useCallback((id) => {
    console.log("id: ", id);
    setElements((els) => {
      const elementRemove = els.find((el) => {
        console.log("el: ", el);
        return el.id === id;
      });
      const arrayRemoveEl = [];
      const connector = els.find((el) => id === el.source || id === el.target);

      arrayRemoveEl.push(elementRemove);
      connector && arrayRemoveEl.push(connector);

      return removeElements(arrayRemoveEl, els);
    });
  }, []);

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onAdd = useCallback(
    (id, type, targetPosition, x, y) => {
      const uid = `${id}_${Math.floor(Math.random() * 100)}`;
      const newNode = {
        id: uid,
        data: { onElementsRemove, id: uid, name: uid, targetPosition },
        position: {
          x: x - 200,
          y: y - 30,
        },
        type: type,
        targetPosition: targetPosition,
      };
      setElements((els) => els.concat(newNode));
    },
    [onElementsRemove]
  );

  const onAddConnector = useCallback((id, source, target) => {
    console.log("id: ", id);
    const newNode = {
      id: id,
      source: source,
      target: target,
    };
    setElements((els) => els.concat(newNode));
  }, []);

  const typeOfItem = (id, offsetX, offsetY) => {
    onAdd(id, id, "right", offsetX, offsetY);
    onAdd("year", "year", "", offsetX + 300, offsetY - 100);
    onAdd("city", "city", "", offsetX + 300, offsetY + 100);
    onAdd(
      "statisticVisualization",
      "statisticVisualization",
      "",
      offsetX + 300,
      offsetY + 200
    );
    setTimeout(() => {
      drawConnector(id);
    }, 1000);
  };

  const drawConnector = useCallback(
    (id) => {
      console.log("id: ", id);
      console.log("elementsStore: ", elementsStore);
      const idElementDimension = elementsStore.find((el) => {
        const idElSlice = el.id.split("_")[0];
        return idElSlice === id;
      });
      console.log("elementDimension: ", idElementDimension);

      const idElementYear = elementsStore.find((el) => {
        const idElSlice = el.id.split("_")[0];
        return idElSlice === "year";
      });
      console.log("elementYear: ", idElementYear);
      const idElementCity = elementsStore.find((el) => {
        const idElSlice = el.id.split("_")[0];
        return idElSlice === "city";
      });

      // onAddConnector(id, source, target)
      if (idElementDimension && idElementYear && idElementCity) {
        onAddConnector(
          `${idElementDimension}_${idElementYear}`,
          idElementDimension,
          idElementYear
        );
        onAddConnector(
          `${idElementDimension}_${idElementCity}`,
          idElementDimension,
          idElementCity
        );
      }
    },
    [elementsStore, onAddConnector]
  );

  const [, dropList] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      typeOfItem(
        item.id,
        monitor.getClientOffset().x,
        monitor.getClientOffset().y
      );
      return undefined;
    },
  });

  const onElementClick = (event, element) => {
    setElementClick(element);
  };

  return (
    <div className="middle">
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
          nodeTypes={nodeTypes}
          style={{ background: bgColor }}
          ref={dropList}
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "customNode") return bgColor;
              if (n.type === "output") return "#ff0072";
            }}
            nodeColor={(n) => {
              if (
                n.type === "industry" ||
                n.type === "forest" ||
                n.type === "atmosphere" ||
                n.type === "climate" ||
                n.type === "year" ||
                n.type === "city" ||
                n.type === "statisticVisualization"
              )
                return bgColor;
              return "#fff";
            }}
          />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Middle;
