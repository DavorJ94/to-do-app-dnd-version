import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

export default function Column({ title, items, type, deleteItem }) {
  const backgroundStyle =
    type === "todo" ? "brown" : type === "in-progress" ? "#2369c5" : "green";
  items = items.filter((item) => item.status === type);
  return (
    <div className="column" style={{ backgroundColor: backgroundStyle }}>
      <div className="column-title">{title}</div>
      <hr />
      <Droppable droppableId={type}>
        {(provided) => (
          <div
            className="cards-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((card, index) => {
              if (type === card.status) {
                return (
                  <Card
                    text={card.text}
                    id={card.id}
                    key={card.id}
                    status={card.status}
                    deleteItem={deleteItem}
                    index={index}
                  />
                );
              } else return;
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
