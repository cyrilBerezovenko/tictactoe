import React from 'react';
import './A_FieldButton.css'

export default function A_FieldButton(props) {
    return (
        <button className={`field-button ${props.isWin ? 'field-button-win' : ''}`} onClick={props.onClick}>{props.value}</button>
    );
}