import React from 'react';
import './styles/App.scss';
import Game from './components/Game';
import batataLogo from './assets/la-batata.png'

function App() {
  return (
    <div className="App">
      <h1>La Batata</h1>
      <img 
        src={batataLogo}
        width={100}
        height={100}
        alt="la batata logo"
      />
      <div className='game-container'>
        <Game />
      </div>
    </div>
  );
}

export default App;
