import React, { Component } from 'react';
import Ai from './Ai';
import Board from './Board';

class TicTacToe extends Component {
  constructor(props){
      super(props);
      this.board = new Board(props.width);
      this.state = {player: 1, freezeBoard: false, winner: false};
   }
   
   nextPlayer(){
       return this.state.player === 1 ? 2 : 1;
       
   }
   
   move(x, y, player, callback){
       this.board.move(x, y, player);
       const winner = this.board.checkWin()
   
       if (winner){
           this.setState({winner, freezeBoard: true});
       }else {
           callback();
           
       }
       
       
   }
   
   playerMove(event){
       const [x, y] = event.target.dataset.cell.split('_');
       const cellEmpty = this.board.getCell(x, y) === 0
       
       if (cellEmpty) {
      this.move(x, y, this.state.player, () => {
        if (this.props.singlePlayer) {
          this.setState({player: this.nextPlayer(), freezeBoard: true}, this.aiMove);
        } else {
          this.setState({player: this.nextPlayer()});
        }
      });
    }
   }
   
   aiMove() {
    const [ x, y ] = Ai.move(this.board, this.state.player);

    setTimeout(() => {
      this.move(x, y, this.state.player, () => {
        this.setState({player: this.nextPlayer(), freezeBoard: false});
      });
    }, 200);
  }

 aiInit() {
    if (this.props.singlePlayer) {
      const aiPlayer = Math.floor(Math.random() * 2) + 1;
      if (aiPlayer === 1) {
        this.aiMove();
      }
    }
  }
  
    reset() {
    this.board = new Board(this.props.width);
    this.setState({player: 1, freezeBoard: false, winner: false});
    this.aiInit();
  }

   
   
   componentDidMount() {
    this.aiInit();
  }  
  
  
  
  
  
  
  
  render(){
     
        const { board } = this.board;
        let announcement;
        
          if (this.state.winner) {
          const msg = this.state.winner > 2 ? 'It\'s a tie!' : `Player ${this.state.winner} wins!`;
          announcement = (
            <div className="announcement">
              <p>{ msg }</p>
              <button onClick={ this.reset.bind(this) }>Reset</button>
            </div>
          );
        }
     
      const grid = board.map((row, rowInd) => {
      const cells = row.map((cell, cellInd) => {
        const classString = cell > 0 ? cell === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
        const coords = `${rowInd}_${cellInd}`;
        let clickHandler;

        if (!this.state.freezeBoard) { clickHandler = this.playerMove.bind(this); }

        return <div className={ classString } key={ cellInd } onClick={ clickHandler } data-cell={ coords }></div>;
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

       
     
     
     
return (
      <div className="grid">
        { grid }
        { announcement }
      </div>
    );
  }
}

TicTacToe.propTypes = { width: React.PropTypes.number };
TicTacToe.defaultProps = { width: 3 };
export default TicTacToe;