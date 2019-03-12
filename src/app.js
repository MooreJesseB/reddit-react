import React, { Component } from "react";
import ReactDOM from "react-dom";
import Index from "./components/containers/index.jsx";
import "./style.css";

class App extends Component {
  render() {
    return <div id="app"><Index /></div>;
  }
}

const app = document.getElementById("app");
app ? ReactDOM.render(<App />, app) : false;

export default App;