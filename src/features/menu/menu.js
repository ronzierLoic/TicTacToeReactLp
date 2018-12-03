import React, { Component } from "react";
import "./menu.css";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="menu-title">Welcome to Tic tac toe !!</h2>
        <div className="menu-content">
          <div>
            <Link className="menu-button" to="/game" href="/game">
              Play
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Menu };
