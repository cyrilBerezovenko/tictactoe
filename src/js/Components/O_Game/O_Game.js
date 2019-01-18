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
    }

    click(index) {
        let sq = this.state.squares.slice();
        if(sq[index] !== '' || !this.state.started) return;
        if(this.state.isXNow) {
            sq[index] = 'X';
            this.state.xCages.push(index+1);
        } else {
            sq[index] = 'O';
            this.state.oCages.push(index+1);
        }
        this.setState({
            squares: sq,
            isXNow: !this.state.isXNow
        });
    }

    componentDidUpdate() {
        if(!this.state.started) return;
        let sq = this.state.squares;
        let w = this.wins;
        for(let i = 0; i < w.length; i++) {
            if(sq[w[i][0]] !== '' && (sq[w[i][0]] === sq[w[i][1]] && sq[w[i][1]] === sq[w[i][2]])) {
                w[i].forEach(val => this.state.winCages[val] = 1);
                this.setState({
                    started: false,
                    winner: sq[w[i][0]],
                });
            }
        }
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