import React from "react";
import Square from "./Square";
export default function Board(props) {
  const renderSquares = (numbs) => {
    return numbs.map((num) => (
      <Square
        key={num}
        index={props.indexs != null && props.indexs.includes(num) ? num : null}
        value={props.squares[num]}
        onClick={() => props.onClick(num)}
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
            i * 9,
            i * 9 + 1,
            i * 9 + 2,
            i * 9 + 3,
            i * 9 + 4,
            i * 9 + 5,
            i * 9 + 6,
            i * 9 + 7,
            i * 9 + 8,
          ])}{" "}
        </div>
      );
    }
    return content;
  };
  return <div>{getBoard(9)}</div>;
}
