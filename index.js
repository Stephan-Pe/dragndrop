const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  // set class for dragged Element
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  // remove class after dragend
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});
// capture dragging area
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    // dragging by default is not allowed
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  // select all Elements exept one you drag :notSelector
  // spreadOperator spread into new Array
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  // loop through Elements and get Position
  return draggableElements.reduce(
    (closest, child) => {
      // get DomRect with getBoundingClientRect()
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
