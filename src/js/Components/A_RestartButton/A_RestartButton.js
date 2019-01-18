import React from 'react';
import './A_RestartButton.css'

export default function A_RestartButton(props) {
    return (
        <button className='restart_button' onClick={props.onclick}>Restart</button>
    );
}