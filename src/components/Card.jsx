import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ text, deleteItem, id, index }) {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="card-component"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <p className="card-text">{text}</p>
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              deleteItem(id);
            }}
          ></i>
        </div>
      )}
    </Draggable>
  );
}
