// import React, { Component } from "react";
// import logo from "./friedhead.svg";
// import "../../App.css";
// import Postit from "./Postit";
// import UpdateForm from "./UpdateForm";
// import Form from "./Form";

// class App extends Component {
//   state = {
//     postits: [
//       {
//         title: "Get a haircut!",
//         content: "You look like a caveman",
//         colour: "blue",
//         key: "456def",
//       },
//       {
//         title: "Buy Cheese",
//         content: "gouda, edam, swiss, emmental, blue",
//         colour: "pink",
//         key: "123abc",
//       },
//     ],
//     toggleEditScreen: false,
//     postToEdit: undefined,
//   };

//   removePostByKey = (key) => {
//     let postits = [...this.state.postits];
//     let newPostitsArray = [];
//     postits.forEach((post) => {
//       if (post.key !== key) {
//         newPostitsArray.push(post);
//       }
//     });
//     return newPostitsArray;
//   };

//   setEditStatusByKey = (key) => {
//     let postits = [...this.state.postits];
//     let postToEdit;
//     postits.forEach((post) => {
//       if (post.key === key) {
//         postToEdit = post;
//       }
//     });
//     return postToEdit;
//   };

//   // FINDS DRAGGED POST AND SAVES IT READY FOR DELETE
//   onDragStart = (key) => {
//     let postToEdit = this.setEditStatusByKey(key);
//     this.setState({ postToEdit: postToEdit });
//   };

//   //FINDS POST AND SAVES IT READT FOR EDIT, AND TOGGLES EDIT SCREEN
//   findPostToEdit = (key) => {
//     let postToEdit = this.setEditStatusByKey(key);
//     this.setState({ postToEdit: postToEdit, toggleEditScreen: true });
//   };

//   onDragOver = (e) => {
//     e.preventDefault();
//   };

//   //CRUD FUNCTIONS
//   //CREATE
//   createPostit = (colour, title, content) => {
//     let postits = [...this.state.postits];
//     let newPost = {};
//     newPost.title = title;
//     newPost.content = content;
//     newPost.colour = colour;
//     newPost.key = title + Math.random();
//     postits.push(newPost);
//     this.setState({ postits: postits });
//   };

//   //UPDATE
//   updatePostIt = (colour, title, content) => {
//     let postToEdit = this.state.postToEdit;
//     console.log("postToEdit: ", postToEdit);
//     let postits = this.removePostByKey(postToEdit.key);
//     console.log("postits: ", postits);

//     postToEdit.colour = colour;
//     postToEdit.title = title;
//     postToEdit.content = content;

//     postits.push(postToEdit);
//     this.setState({ postits: postits, toggleEditScreen: false });
//   };

//   //DELETE POST
//   onDrop = () => {
//     let key = this.state.postToEdit.key;
//     let newPostitsArray = this.removePostByKey(key);
//     this.setState({ postits: newPostitsArray });
//   };

//   render() {
//     let postits = (
//       <div>
//         {this.state.postits
//           .map((p) => {
//             return (
//               <Postit
//                 colour={p.colour}
//                 title={p.title}
//                 content={p.content}
//                 key={p.key}
//                 onClick={(key) => this.findPostToEdit(p.key)}
//                 onDragStart={(key) => this.onDragStart(p.key)}
//               />
//             );
//           })
//           //reversing the array so the latest postit shows first
//           .reverse()}
//       </div>
//     );

//     //EDIT SCREEN VIEW
//     let editScreen;
//     if (this.state.toggleEditScreen) {
//       editScreen = (
//         <UpdateForm
//           colour={this.state.postToEdit.colour}
//           title={this.state.postToEdit.title}
//           content={this.state.postToEdit.content}
//           key={this.state.postToEdit.key}
//           updatePostIt={this.updatePostIt}
//         />
//       );
//     } else {
//     }

//     //THE RETURN BLOCK
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1>30 days of React</h1>
//           <h2>Day Twenty Three / Post-it Notes (refractored & deployed)</h2>

//           <div className="wrapper">
//             {/* <Form createPostit={createPostit} />
//             <div
//               className="trash-can"
//               onDrop={onDrop}
//               onDragOver={(e) => onDragOver(e)}
//             >
//               <h2> 🗑️ </h2>
//               <h4> drag & Drop</h4>
//             </div> */}
//           </div>
//         </header>

//         <ul>{postits}</ul>
//         {editScreen}
//       </div>
//     );
//   }
// }

// export default App;
