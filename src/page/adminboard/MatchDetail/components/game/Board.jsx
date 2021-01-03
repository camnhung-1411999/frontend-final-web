import React from "react";
import Square from "./Square";
export default function Board(props) {
  const renderSquares = (numbs) => {
    return numbs.map((num) => (
      <Square
        key={num}
        value={props.match.result[num]}
      />
    ));
  };
  const getBoard = (nums) => {
    let content = [];
    for (let i = 0; i < nums; i++) {
      content.push(
        <div key={i} className="board-row">
          {" "}
          {renderSquares([
            i * 20,
            i * 20 + 1,
            i * 20 + 2,
            i * 20 + 3,
            i * 20 + 4,
            i * 20 + 5,
            i * 20 + 6,
            i * 20 + 7,
            i * 20 + 8,
            i * 20 + 9,
            i * 20 + 10,
            i * 20 + 11,
            i * 20 + 12,
            i * 20 + 13,
            i * 20 + 14,
            i * 20 + 15,
            i * 20 + 16,
            i * 20 + 17,
            i * 20 + 18,
            i * 20 + 19,

          ])}{" "}
        </div>
      );
    }
    return content;
  };
  return <div>{getBoard(20)}</div>;
}
