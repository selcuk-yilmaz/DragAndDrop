import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { v4 as uuid } from "uuid";


const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    _id: `action-${k + offset}-${new Date().getTime()}`,
    name: `action-${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
//?--------------
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: item._id });
  return destClone;
};
//?------------------------------
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "50%",
});
//! function component start from here
function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  //!start functi
  useEffect(() => {
    // getTasks();
  }, []);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(
        state,
        state[sInd],
        state[dInd],
        source,
        destination
      );
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }
    //!get image as a ..... from API
  function getTasks() {
    axios
      .get("http://127.0.0.1:5050/api/v1/ros/actions")
      .then((res) => {
        // abc = res.data.data.Actions;
        // console.log(abc);
        setState(res.data.data.Actions);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-------------------------------------------------------
  console.log(state);    
  return (
    <div>
      <div style={{ display: "flex", gap: "55px" }}>
        <button
          type="button"
          // onClick={() => {
          //   setState([...state, []]);
          // }}
          style={{
            fontSize: "150%",
            width: "50%",
            height: "70px",
            background: "yellowgreen",
          }}
        >
          All Duties
        </button>
        <button
          type="button"
          // onClick={() => {
          //   setState([...state, getItems(1)]);
          // }}
          style={{
            fontSize: "150%",
            width: "50%",
            height: "70px",
            background: "yellow",
          }}
        >
          Choosen Duties
        </button>
      </div>
      <div style={{ display: "flex", gap: "50px" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {item.name}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[index].splice(index, 1);
                                setState(
                                  newState.filter((group) => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default QuoteApp;