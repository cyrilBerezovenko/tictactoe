import React from 'react'
import A_FieldButton from '../A_FieldButton/A_FieldButton'
import './M_Gamefield.css'

export default class M_Gamefield extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = (index) => this.props.onclick.apply(this.props.o_game, [index]);
        this.state = {
            squares: this.props.squares.slice().map((value,index) =>
                <A_FieldButton onClick={() => this.handleClick(index)} value={value} key={index} isWin={this.props.winCages[index]}/>)
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