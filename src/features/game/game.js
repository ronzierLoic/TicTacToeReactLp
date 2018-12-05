import React, { Component } from "react";
import { Board } from "../board/board";
import "./game.css";
import { Link } from "react-router-dom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      player1: "X",
      player2: "0",
      scorePlayer1: 0,
      scorePlayer2: 0
    };
    if (this.props.location.param1) {
      this.state.player1 =
        this.props.location.param1.namePlayer1 !== ""
          ? this.props.location.param1.namePlayer1 + " - X"
          : "X";
      this.state.player2 =
        this.props.location.param1.namePlayer2 !== ""
          ? this.props.location.param1.namePlayer2 + " - O"
          : "O";
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const currentStep = this.state.stepNumber;
    const maxStep = history.length;
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    let showWinner;
    if (winner !== "nul" && winner !== undefined) {
      status = "Game Finish";
      showWinner =
        "Winner: " + (winner === "X" ? this.state.player1 : this.state.player2);
    } else if (winner === "nul") {
      status = "Game Finish";
      showWinner = "Match Nul !";
    } else {
      status =
        "Next player: " +
        (this.state.xIsNext ? this.state.player1 : this.state.player2);
      showWinner = "";
    }
    return (
      <div>
        <Link className="back" to="/" href="/">
          MENU
        </Link>
        <div className="game-pad">
          {currentStep - 1 >= 0 ? (
            <button
              className="game-prec"
              onClick={() => this.jumpTo(currentStep - 1)}
            >
              Previous
            </button>
          ) : (
            <div className="game-prec-vide" />
          )}
          <div className="game-num">
            move number : {currentStep}/{maxStep - 1}
          </div>
          {currentStep + 1 <= maxStep - 1 ? (
            <button
              className="game-next"
              onClick={() => this.jumpTo(currentStep + 1)}
            >
              Next
            </button>
          ) : (
            <div className="game-next-vide" />
          )}
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="game-status">{status}</div>
            <br />
            <div>
              <label className="game-status">Score:</label>
              <br />
              <br />

              <div>
                <label>{this.state.player1} : </label>
                {this.state.scorePlayer1}
              </div>
              <div>
                <label>{this.state.player2} : </label>
                {this.state.scorePlayer2}
              </div>
            </div>
            <br />

            <ol>{moves}</ol>
          </div>
        </div>
        {showWinner !== "" ? (
          <React.Fragment>
            {winner === "nul" ? (
              <div className="game-content-nul">
                <div className="game-result">{showWinner}</div>
                <button className="game-restart-nul" onClick={this.reset}>
                  Restart
                </button>
              </div>
            ) : (
              <div className="game-content-win">
                <div className="game-result">{showWinner}</div>
                <button className="game-restart" onClick={this.reset}>
                  Restart
                </button>
              </div>
            )}
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  reset = () => {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let scorePlayer1 = this.state.scorePlayer1;
    let scorePlayer2 = this.state.scorePlayer2;
    if (winner === "X") {
      scorePlayer1++;
    } else if(winner === "O"){
      scorePlayer2++;
    }
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      scorePlayer1: scorePlayer1,
      scorePlayer2: scorePlayer2
    });
  };

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let matchNul = true;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        matchNul = false;
        return;
      }
    }

    if (matchNul === true) {
      return "nul";
    }
    return null;
  };
}
export { Game };
