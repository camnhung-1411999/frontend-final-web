import React from 'react'
// import './square.css'

export default function Square({ index, onClick, value }) {
    return (
        <button className={`square ${index != null ? 'winner' : ''}`} onClick={onClick}>
            {value}
        </button>
    );
}
