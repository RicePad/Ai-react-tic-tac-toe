import React from 'react';
import ReactDom from 'react-dom';
import TicTacToe from './components/TicTacToe'




ReactDom.render(
  <TicTacToe width={ 3 } singlePlayer />, document.querySelector(".container")
    )