import React, { useState, useEffect } from 'react'
import Board from "./Board";
import './game.css';
import {roomActions} from '../../../../actions';
// import {useDispatch, useSelector} from 'react-redux';
import {useParams} from "react-router-dom"
import usePlay from "../../../../sockets/usePlay";


function Game({isPlay}) {

    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([{ squares: Array(9*9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [historyIndex, setHistoryIndex] = useState([{ index: null }]);
    const [sort, setSort] = useState(false);
    const {id} = useParams();
    const {isNext, boards, playTo } = usePlay(id);

    function handleClick(i, isFlag) {
        if(isPlay) {
            const data = {
                roomId: id,
                index: i,
                chessman: true
            }
            if (isFlag)
                playTo(data)
        }
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

    const winner = calculateWinner(boards);
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
                    <div >
                        <Board squares={boards} indexs={winner ? winner.indexs : null} onClick={(i) => handleClick(i, isNext)} />
                    </div>
                </div>
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

