import React from 'react';
import '../styles/ScoreBoard.scss';

const ScoreBoard = ({ players, totalScore}) => {
    const handleClick = (e) => {
        e.stopPropagation(); // Evita que el click se propague y cierre el menú.
    };
    
    return (
        <div className="scoreboard" onClick={handleClick}>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                            <td>{totalScore[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoreBoard;
