import React from 'react';
import '../styles/ScoreBoard.scss';

const ScoreBoard = ({ players, scores }) => {
    
    return (
        <div className="scoreboard">
        <h3>Tabla de Puntuaciones</h3>
        <ul>
            {players.map((player, index) => (
            <li key={index}>
                {player.name}: {scores[player.name] || 0} puntos
            </li>
            ))}
        </ul>
        </div>
    );
};

export default ScoreBoard;
