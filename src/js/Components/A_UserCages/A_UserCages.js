import React from 'react';

export default function A_UserCages(props) {
    return (
        <p>{props.name} : {props.cages.toString()}</p>
    );
}