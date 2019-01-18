import React from 'react';

export default function A_Winner(props) {
    return (
        <p className='winner-name'>Winner : {props.winner || '...'}</p>
    );
}