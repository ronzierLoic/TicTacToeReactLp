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
      xIsNext: true
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
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
      showWinner = "Winner: " + winner;
    } else if (winner === "nul") {
      status = "Game Finish";
      showWinner = "Match Nul !";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      showWinner = "";
    }
    return (
      <div>
        <Link className="back" to="/" href="/">
          Back
        </Link>
        <div className="game-pad">
          {currentStep - 1 >= 0 ? (
            <button
              className="game-prec"
              onClick={() => this.jumpTo(currentStep - 1)}
            >
              Précedent
            </button>
          ) : (
            <div className="game-prec-vide" />
          )}
          <div className="game-num">
            move numéro : {currentStep}/{maxStep - 1}
          </div>
          {currentStep + 1 <= maxStep - 1 ? (
            <button
              className="game-next"
              onClick={() => this.jumpTo(currentStep + 1)}
            >
              Suivant
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
    if (calculateWinner(squares) || squares[i]) {
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
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    });
  };
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
}

export { Game };
