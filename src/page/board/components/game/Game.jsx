import React, {useState, useEffect} from 'react'
import Board from "./Board";
import './game.css';
import {useParams} from "react-router-dom"
import usePlay from "../../../../sockets/usePlay";
import {isWin} from "./algorithm/main";

function Game({isPlay}) {
    const {id} = useParams();
    const {isNext, index, value, boards, playTo} = usePlay(id);

    function handleClick(i, isFlag) {
        if (isPlay  && pieces_win.length < 0) {
            const data = {
                roomId: id,
                index: i,
                chessman: true
            }
            if (isFlag)
                playTo(data)
        }
    }

    const pieces_win = isWin(boards, index, value);

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <div>
                        {/*<Board squares={boards} indexs={winner ? winner.indexs : null} onClick={(i) => handleClick(i, isNext)} />*/}
                        <Board squares={boards} onClick={(i) => handleClick(i, isNext)}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export {Game} 
