import React, { Component } from "react";
import "./information.css";
import { Link } from "react-router-dom";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namePlayer1: "",
      namePlayer2: ""
    };
  }

  handleNamePlayer1Change = event => {
    this.setState({ namePlayer1: event.target.value });
  };

  handleNamePlayer2Change = event => {
    this.setState({ namePlayer2: event.target.value });
  };

  render() {
    return (
      <form>
        <Link className="back" to="/" href="/">
          MENU
        </Link>
        <table className="table-info">
          <tbody>
            <tr className="cell-taille">
              <td className="label-name">Name player 1 :</td>
              <td>
                <input
                  className="input-text-name"
                  type="text"
                  maxLength="20"
                  value={this.state.namePlayer1}
                  onChange={this.handleNamePlayer1Change}
                />
              </td>
            </tr>
            <tr className="cell-taille">
              <td className="label-name">Name player 2 :</td>
              <td>
                <input
                  className="input-text-name"
                  type="text"
                  maxLength="20"
                  value={this.state.namePlayer2}
                  onChange={this.handleNamePlayer2Change}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="center">
          <Link
            className="button-next"
            to={{ pathname: "/game", param1: this.state }}
            href="/game"
          >
            NEXT
          </Link>
        </div>
      </form>
    );
  }
}

export { Info };
