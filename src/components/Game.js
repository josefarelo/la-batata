import React, { useState } from 'react';
import Player from './Player';
import ScoreBoard from './ScoreBoard';
import SpecialButtons from './SpecialButtons';
import '../styles/Game.scss';

const Game = () => {
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [scores, setScores] = useState({});
    
    // Acá poner la lógica del juego
    
    return (
        <div className="game">
        <ScoreBoard players={players} scores={scores} />
        {currentPlayer && <Player player={currentPlayer} />}
        <SpecialButtons />
        </div>
    );
};

export default Game;
