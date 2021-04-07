import React from "react";
import { useDrag } from "react-dnd";
import { useStore } from "../Context";

const items = [
  {
    name: "climate",
    id: "climate",
  },
  {
    name: "atmosphere",
    id: "atmosphere",
  },
  {
    name: "forest",
    id: "forest",
  },
  {
    name: "industry",
    id: "industry",
  },
];

const List = () => {
  return (
    <div className="left">
      {items.map((item) => (
        <Item {...item} key={item.id} />
      ))}
    </div>
  );
};

const Item = ({ name, id }) => {
  const { dragging, isDrop } = useStore();

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => {
      dragging(id);
      return { id };
    },
    end: () => {
      isDrop(id);
    },
  });
  const opacity = isDragging ? 0.7 : 1;
  return (
    <button className="item" key={id} ref={drag} style={{ opacity: opacity }}>
      {name}
    </button>
  );
};

export default List;
