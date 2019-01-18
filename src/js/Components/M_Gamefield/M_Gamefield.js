import React from 'react'
import A_FieldButton from '../A_FieldButton/A_FieldButton'
import './M_Gamefield.css'

export default class M_Gamefield extends React.Component {

    constructor(props) {
        super();
        this.handleClick = (index) => props.onclick.apply(props.o_game, [index]);
        this.state = {
            squares: props.squares.slice().map((value,index) =>
                <A_FieldButton onClick={() => this.handleClick(index)} value={value} key={index}/>)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            squares: nextProps.squares.slice().map((value,index) =>
                <A_FieldButton isWin={nextProps.winCages[index]} onClick={() => this.handleClick(index)} value={value} key={index}/>)
        });
    }

    render() {
        return (
            <div className='gamefield'>
                {this.state.squares}
            </div>
        );
    }
}