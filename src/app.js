import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return <div id="app">Hello World</div>;
  }
}

const app = document.getElementById("app");
app ? ReactDOM.render(<App />, app) : false;

export default App;