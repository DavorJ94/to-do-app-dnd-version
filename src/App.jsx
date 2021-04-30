import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import idGenerator from "./utils/idGenerator";
import { columns } from "./utils/columnsData";
import refineItems from "./utils/refineItems";

function App() {
  const [toDoText, setToDoText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [handleSubmit]);

  function handleChange(e) {
    setWarningMessage("");
    setToDoText(() => e.target.value);
  }

  function handleSubmit(e) {
    if (toDoText === "") {
      if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
        setWarningMessage("You cannot add an empty to do item.");
      }
      return;
    }
    if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
      const id = idGenerator(listItems);
      setListItems((prevItems) => [
        ...prevItems,
        { text: toDoText, status: "todo", id: id },
      ]);
      setToDoText(() => "");
    }
  }

  function deleteItem(input) {
    const itemsWithoutDeleted = listItems.filter((item) => {
      return item.id !== input;
    });
    setListItems(() => itemsWithoutDeleted);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    setListItems(() => refineItems(listItems, result));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input
          value={toDoText}
          onChange={handleChange}
          className="input-todo"
        ></input>
        <button
          className="btn-add-todo"
          data-clicked={true}
          onClick={handleSubmit}
        >
          Add to do item
        </button>
      </div>
      <div className="warning-message">
        {warningMessage ? warningMessage : ""}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="column-container">
          {columns.map((item, index) => {
            return (
              <Column
                title={item.title}
                type={item.type}
                items={listItems}
                deleteItem={deleteItem}
                key={index}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
