import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//COMPONENT/REACT COMPONENT CLASS (components here: Square, Board, Game)
// ^Takes in parameters aka PROPS and returns views via render method
// Render returns 'description' of what will be displayed aka a REACT ELEMENT

//OLD SQAURE --<class>--- (changed to function):
// class Square extends React.Component {  
//   render() {                                
//     return (                                      //onClick auto listens for event, button clicked, React calls onClick
//       <button                                     //Square component now a CONTROLLED COMPONENT; their state is maintained by the Board Component
//         className="square"                      
//         onClick={() => this.props.onClick()}>           
//         {this.props.value}      
//       </button>
//     );
//   }
// }

/////SQUARE COMPONENT/////
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// class Board extends React.Component {
  // constructor(props) {                    //CONSTRUCTOR initializes state
  //   super(props);                             //super(): always use to define constructor of child class
  //   this.state = {
  //     squares: Array(9).fill(null),  // <---MOVED TO GAME WHEN LIFTED STATE
  //     xIsNext: true,                    //lifted to Game in order for game to collected Data from both children - Square and Board
  //   };
  // }
  // handleClick(i) {
  //   const squares = this.state.squares.slice();  //.slice() creates a copy of the squares array to modify when squares are clicked
  //   if (calculateWinner(squares) || squares[i]) { // = go no further if winner declared or target already handled
  //     return;      // <-- MOVED TO GAME WHEN LIFTED STATE
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';   //Changing the copy allows change of data without mutating original
  //   this.setState({                                   //This lets us keep previous versions of data to make complex features elsewhere in the game (ie undo/redo historical actions)
  //     squares: squares ,                                  //Also easier to detect historical changes --> more data to reference
  //     xIsNext: !this.state.xIsNext,                         //Also allows creating of PURE COMPONENTS and determine if changes occured which helps determine when to re-render
  //     });          //^ '!':used as negation operator for truth tests on a variable            
  // }

/////BOARD COMPONENT/////
class Board extends React.Component {                                                              
  renderSquare(i) {                                                     
    return (
      <Square 
        value={this.props.squares[i]}           //changed values in 53+54 from this.state to this.props because we lifted state to Game
        onClick={() => this.props.onClick(i)}   // but Board still needs o receive squares and onClick props from Game
      />
    );
  }

  render() {
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); //"IF xIsNext is true...'X'...ELSE 'O"
        //^ Old status declaration
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;          //MOVED LINES 62-68 TO GAME WHEN LIFTED STATE
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
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

/////GAME COMPONENT/////
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext:true,
    };
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];  //moved handleClick from board + added concatenation of new history entries for array
    const squares = current.squares.slice();      ////.slice() creates a copy of the squares array to modify when squares are clicked
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{            //using concat method here because we dont want to mutate the original
        squares: squares,                      //we don't want to mutate the orig so that we can keep track of diff versions of data to add complex features in the game
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
