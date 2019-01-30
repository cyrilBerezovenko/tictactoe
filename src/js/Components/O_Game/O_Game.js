import React from 'react'
import M_Gamefield from '../M_Gamefield/M_Gamefield';
import A_UserCages from '../A_UserCages/A_UserCages'
import './O_Game.css'
import A_Winner from '../A_Winner/A_Winner';
import A_RestartButton from '../A_RestartButton/A_RestartButton';

export default class O_Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            started: true,
            squares: Array(9).fill(''),
            winCages: Array(9).fill(0),
            isXNow: true,
            xCages: [],
            oCages: []
        };
        this.wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        this.click = this.click.bind(this);
    }

    click(index) {
        let sq = this.state.squares.slice();
        if(sq[index] !== '' || !this.state.started) return;
        let newXCages = this.state.xCages.slice();
        let newOCages = this.state.oCages.slice();
        if(this.state.isXNow) {
            sq[index] = 'X';
            newXCages.push(index+1);
        } else {
            sq[index] = 'O';
            newOCages.push(index+1);
        }
        let isWinner = O_Game.checkWinner(sq, this.wins);
        let winCages, winner, started = true;
        if(isWinner) {
            debugger;
            winCages = isWinner.winCages;
            winner = isWinner.winner;
            started = false;
        }
        this.setState({
            squares: sq,
            isXNow: !this.state.isXNow,
            xCages: newXCages,
            oCages: newOCages,
            winCages : winCages || Array(9).fill(0),
            winner : winner,
            started : started
        });
    }

    static checkWinner(squares, wins) {
        for(let i = 0; i < wins.length; i++) {
            if(squares[wins[i][0]] !== '' && (squares[wins[i][0]] === squares[wins[i][1]] && squares[wins[i][1]] === squares[wins[i][2]])) {
                let arr = Array(9).fill(0);
                for(let i of wins[i]) arr[i] = 1;
                return {
                    winner : squares[wins[i][0]],
                    winCages : arr
                };
            }
        }
        return false;
    }

    restart() {
        this.setState({
            squares: Array(9).fill(''),
            started: true,
            isXNow: true,
            winner: undefined,
            winCages: Array(9).fill(0),
            xCages: [],
            oCages: []
        });
    }

    render() {
        return (
            <div className='o_game'>
                <M_Gamefield o_game={this} onclick={this.click} squares={this.state.squares} winCages={this.state.winCages}/>
                <div className='game-info'>
                    <A_UserCages name={'X'} cages={this.state.xCages}/>
                    <A_UserCages name={'O'} cages={this.state.oCages}/>
                    <A_Winner winner={this.state.winner}/>
                    <A_RestartButton onclick={() => this.restart()}/>
                </div>
            </div>
        );
    }
}