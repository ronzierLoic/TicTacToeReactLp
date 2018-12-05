import React, { Component } from "react";
import "./menu.css";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    const game = {
      pathname: "/info",
      param1: "Param1"
    }

    return (
      <React.Fragment>
        <h2 className="menu-title">Welcome to Tic tac toe !!</h2>
        <div className="menu-content">
          <div>
            <Link className="menu-button" to={game} href="/info">
              PLAY
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Menu };
