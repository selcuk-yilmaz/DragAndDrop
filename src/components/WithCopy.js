import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

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

const Content = styled.div`
  margin-right: 200px;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? "dashed #000" : "solid #ddd")};
`;

const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

const grid = 8;

const ITEMS = [
  {
    id: uuid(),
    content: "ACTİON-1",
  },
  {
    id: uuid(),
    content: "ACTİON-2",
  },
  {
    id: uuid(),
    content: "ACTİON-3",
  },
  {
    id: uuid(),
    content: "ACTİON-4",
  },
  {
    id: uuid(),
    content: "ACTİON-5",
  },
  {
    id: uuid(),
    content: "ACTİON-6",
  },
  {
    id: uuid(),
    content: "ACTİON-7",
  },
  {
    id: uuid(),
    content: "ACTİON-8",
  },
  {
    id: uuid(),
    content: "ACTİON-9",
  },
];

const uid = uuid();

const App = (props) => {
  const [state, setState] = useState({
    [uid]: [],
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  //!get image as a ..... from API
  function getTasks() {
    axios
      .get("http://127.0.0.1:5050/api/v1/ros/actions")
      .then((res) => {
        // abc = res.data.data.Actions;
        // console.log(abc);
        console.log(res.data.data.Actions);
        setData(res.data.data.Actions);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-------------------------------------------------------
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState((prevState) => ({
          ...prevState,
          [destination.droppableId]: reorder(
            state[source.droppableId],
            source.index,
            destination.index
          ),
        }));
        break;
      case "ITEMS":
        setState((prevState) => ({
          ...prevState,
          [destination.droppableId]: copy(
            data,
            prevState[destination.droppableId],
            source,
            destination
          ),
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          ...move(
            prevState[source.droppableId],
            prevState[destination.droppableId],
            source,
            destination
          ),
        }));
        break;
    }
  };

  const addList = () => {
    setState((prevState) => ({ ...prevState, [uuid()]: [] }));
  };
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  // const handleDelete = (index) => {
  //   console.log(Object.keys(state));
  //   const newState = [...state];
  //   console.log(newState);
  //   console.log(newState.splice(index, 1));
  //   console.log(newState);
  //   setState(newState);
  // };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {data.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.name}
                    </Item>
                    {snapshot.isDragging && <Clone>{item.name}</Clone>}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
          </Kiosk>
        )}
      </Droppable>
      <Content>
        <Button onClick={addList}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
          <ButtonText>Add List</ButtonText>
        </Button>
        
        {Object.keys(state).map((list, i) => (
          <Droppable key={list} droppableId={list}>
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {state.length
                  ? state[list].map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                            style={provided.draggableProps.style}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "250px",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <Handle {...provided.dragHandleProps}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                    />
                                  </svg>
                                </Handle>
                                <div>{item.name}</div>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    console.log(state);
                                    var newList = [...state[list]];
                                    console.log(newList);
                                    console.log(item, index);
                                    newList.splice(index, 1);
                                    console.log(newList);
                                    setState({
                                      uid: newList,
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </Item>
                        )}
                      </Draggable>
                    ))
                  : !provided.placeholder && <Notice>Drop items here</Notice>}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        ))}
      </Content>
    </DragDropContext>
  );
};
export default App;
