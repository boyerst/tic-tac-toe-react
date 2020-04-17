import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//COMPONENT/REACT COMPONENT CLASS (components here: Square, Board, Game)
// ^Takes in parameters aka PROPS and returns views via render method
// Render returns 'description' of what will be displayed aka a REACT ELEMENT

class Square extends React.Component {  
  constructor(props) {                  //CONSTRUCTOR initializes state
    super(props);                       //super(): always use to define constructor of child class
    this.state = {
      value: null,
    };
  }    
  render() {                                
    return (                                
      <button 
      className="square" 
      onClick={() => this.setState({value: 'X'})}>           
        {this.state.value} 
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
