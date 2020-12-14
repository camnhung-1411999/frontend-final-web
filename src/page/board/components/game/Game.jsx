import React, { useState, useEffect } from 'react'
import Board from "./Board";
import './game.css';

function Game() {

    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [historyIndex, setHistoryIndex] = useState([{ index: null }]);
    const [sort, setSort] = useState(false);

    function handleClick(i) {
        const his = history.slice(0, stepNumber + 1);
        const hisIndex = historyIndex.slice(0, stepNumber + 1);
        const current = his[his.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(his.concat([{ squares: squares }]))
        setXIsNext(!xIsNext)
        setStepNumber(his.length)
        setHistoryIndex(hisIndex.concat([{ index: i }]))
    }
    const playAgain = () => {
        setHistory([{ squares: Array(9).fill(null) }])
        setXIsNext(true)
        setStepNumber(0)
        setHistoryIndex([{ index: null }])
    }

    function jumpTo(step) {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = winner && winner.name ? 'Winner: ' + winner.name : winner;
    } else {
        status = '';
    }

    var moves = history.map((step, move) => {
        const index = historyIndex[move].index;
        const desc = move ?
            'Go to move #' + move + ` (${Math.floor(index / 3) + 1}:${index % 3 + 1})` :
            'Go to game start';
        return (
            <li key={move}>
                <button id={move} className="move mt-2" onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    moves = sort ? moves.reverse() : moves;
    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <div className="status">{status}</div>
                    <div>
                        <Board squares={current.squares} indexs={winner ? winner.indexs : null} onClick={(i) => handleClick(i)} />
                        {/* <button className="playagain mt-3" onClick={playAgain}> Play Again</button> */}
                    </div>
                </div>
                {/* <div className="game-info">
                    <button id="sort" className="btn btn-info ml-5 mt-5" onClick={() => setSort(!sort)}> Sort</button>
                    <ul id='move-list'>{moves}</ul>
                </div> */}
            </div>
        </div>
    );

}

export {Game} 

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                name: squares[a],
                indexs: [a, b, c]
            };
        }
    }
    var j = 0;
    for (let i = 0; i < 9; i++) {
        if (squares[i] != null) j++;
    }
    if (j === 9) return "Equal";
    return null;
}