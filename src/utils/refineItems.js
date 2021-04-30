export default function refineItems(listItems, result) {
  let { destination, source, draggableId } = result;
  draggableId = +draggableId;
  const STATUS = ["todo", "in-progress", "completed"];

  let destinationList = [],
    sourceList = [],
    neutralList = [];

  const requiredItem = listItems.filter((item) => {
    return item.id === draggableId;
  });

  STATUS.forEach((item) => {
    if (destination.droppableId === item) {
      destinationList = listItems
        .filter((subitem) => subitem.status === item)
        .filter((item) => item.id !== draggableId);
      destinationList.splice(destination.index, 0, {
        ...requiredItem[0],
        status: destination.droppableId,
      });
      destinationList = destinationList.filter(
        (item) => item !== "placeholder"
      );
    }
    if (source.droppableId === item && destination.droppableId !== item) {
      sourceList = listItems
        .filter((subitem) => subitem.status === item)
        .filter((item) => item.id !== draggableId);
    }
    if (source.droppableId !== item && destination.droppableId !== item) {
      neutralList.push(
        ...listItems.filter((subitem) => subitem.status === item)
      );
    }
  });
  return [...destinationList, ...sourceList, ...neutralList];
}
