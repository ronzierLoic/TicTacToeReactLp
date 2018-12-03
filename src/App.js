import React, { Component } from "react";
import "./App.css";
import { Game } from "./features/game/game";
import { Menu } from "./features/menu/menu";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/game" component={Game} />
      </Switch>
    );
  }
}

export default App;
