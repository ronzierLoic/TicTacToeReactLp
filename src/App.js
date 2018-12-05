import React, { Component } from "react";
import "./App.css";
import { Game } from "./features/game/game";
import { Menu } from "./features/menu/menu";
import { Info } from "./features/information/information";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/game" component={Game} />
        <Route path="/info" component={Info} />
      </Switch>
    );
  }
}

export default App;
