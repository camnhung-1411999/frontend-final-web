import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./game.css";

function Game() {
    const boards = Array(20 * 20).fill(null);
    boards[4]='X';
    boards[5]='X';
    boards[6]='O';
    boards[7]='O';
    boards[24]='O';
    boards[25]='X';
    boards[26]='O';
    boards[44]='O';
    boards[46]='X';
  const historyMatch = {
      "_id":{"$oid":"5fd9d2436f0c375c583576d3"},
      "result": boards,
      "winner":"nhi",
      "loser":"lu",
      "datatime":"16-12-2020 16:24:19",
      "chat":null,
      "__v":0
    }
  
  return (
    <div>
      <div className="game">
        <div className="game-board">
          <div className="status"> {historyMatch.winner ? 'Winner '+historyMatch.winner : 'Game End With Draw' }</div>
          <div>
            <Board match={historyMatch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Game };
