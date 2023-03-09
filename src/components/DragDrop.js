import React, { useState } from "react";

import "./styles.css";

const internalDNDType = "somecode";

function App() {
  const [fruits, setFruits] = useState([
    "Banana",
    "Apples",
    "Oranges",
    "Pears",
  ]);
  const [prefered, setPrefered] = useState([]);

  const onDrag = (event) => {
    if (event.target instanceof HTMLLIElement) {
      console.log("event", event);
      const current = event.target.dataset.value;
      event.dataTransfer.setData(internalDNDType, current);
      event.dataTransfer.effectAllowed = "move"; // only allow moves
    } else {
      event.preventDefault(); // don't allow selection to be dragged
    }
  };

  const dragEnterHandler = (event) => {
    const item = event.dataTransfer.items && event.dataTransfer.items[0];
    if (item.kind === "string" && item.type === internalDNDType) {
      event.preventDefault();
      return;
    }
  };
  const dragOverHandler = (event) => {
    console.log(event);
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  };
  //! below is drop
  const dropHandler = (event, drop = false) => {
    var data = event.dataTransfer.getData(internalDNDType);
    const newPrefered = [...prefered];

    if (!drop ) {
      // Add
      newPrefered.push(data);
      setPrefered(newPrefered);
    } else if (drop ) {
      // Delete
      setPrefered(newPrefered.filter((f) => f !== data));
    }
  };

  return (
    <div className="App">
      <div>
        <p>What fruits do you like?</p>
        <ol
          className="moveable"
          onDragStart={onDrag}
          style={{
            border: "2px solid blue",
            gap: "50px",
            width: "400px",
            height: "500px",
          }}
        >
          {fruits.map((fruit, index) => (
            <li
              key={fruit + index}
              draggable="true"
              data-value={fruit}
              style={{ padding: "20px", border: "2px solid green" }}
            >
              {fruit}
            </li>
          ))}
        </ol>
      </div>
      <hr />
      <div>
        <p>Add your favorite fruits below:</p>
        {
        //   <div
        //     onDragEnter={dragEnterHandler}
        //     onDragOver={dragOverHandler}
        //     onDrop={dropHandler}
        //     className="moveable square"
        //     style={{ width: "400px", height: "500px", border: "2px solid red" }}
        //   >
        //     {prefered.length ? (
        //       <ul>
        //         {prefered.map((fruit, index) => (
        //           <li
        //             key={fruit + index}
        //             draggable="true"
        //             data-value={fruit}
        //             style={{ padding: "20px", border: "2px solid green" }}
        //             onDragStart={(event) => {
        //               event.dataTransfer.setData(internalDNDType, index);
        //               event.dataTransfer.effectAllowed = "move";
        //             }}
        //             onDragOver={(event) => {
        //               event.preventDefault();
        //               const itemIndex =
        //                 event.dataTransfer.getData(internalDNDType);
        //               const dropIndex = index;

        //               if (itemIndex !== dropIndex) {
        //                 const newPrefered = [...prefered];
        //                 const [removed] = newPrefered.splice(itemIndex, 1);
        //                 newPrefered.splice(dropIndex, 0, removed);
        //                 setPrefered(newPrefered);
        //                 event.dataTransfer.setData(internalDNDType, dropIndex);
        //               }
        //             }}
        //             onDrop={(event) => {
        //               event.preventDefault();
        //             }}
        //           >
        //             {fruit}
        //           </li>
        //         ))}
        //       </ul>
        //     ) : (
        //       <div>Choose your favorite fruit !</div>
        //     )}
        //   </div>

            <div
              onDragEnter={dragEnterHandler}
              onDragOver={dragOverHandler}
              onDrop={dropHandler}
              onDragStart={onDrag}
              className="moveable square"
              style={{ width: "400px", height: "500px", border: "2px solid red" }}
            >
              {prefered.length ? (
                <ul>
                  {prefered.map((fruit, index) => (
                    <li
                      key={fruit + index}
                      draggable="true"
                      data-value={fruit}
                      style={{ padding: "20px", border: "2px solid green" }}
                    >
                      {fruit}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>Choose your favorite fruit !</div>
              )}
            </div>
        }
      </div>
      <hr />
      <div
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDrop={(e) => dropHandler(e, true)}
        style={{ padding: "20px", border: "2px solid black" }}
      >
        Want to delete some favorite fruits ? Throw it here !
      </div>
    </div>
  );
}

export default App;
