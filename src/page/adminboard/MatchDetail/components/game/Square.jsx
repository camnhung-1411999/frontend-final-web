import React from 'react'
// import './square.css'

export default function Square({value}) {
    return (
        <div className='square-his' style={{color: `${(value === 'X')? 'green' : 'gray' }`}}>
            {value}
        </div>
    );
}
