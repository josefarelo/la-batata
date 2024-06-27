import React, { useState } from 'react';
import Dice from './Dice';
import '../styles/Player.scss';

const Player = ({ player }) => {
    const [turnScore, setTurnScore] = useState(0);
    const [dice, setDice] = useState([1, 1, 1, 1, 1, 1]);

    const rollDice = () => {
        // Acá poner la lógica para tirar los dados y calcular la puntuación
    };

    return (
        <div className="player">
        <h2>{player.name}</h2>
        <Dice dice={dice} />
        <button onClick={rollDice}>Tirar dados</button>
        <p>Puntuación del turno: {turnScore}</p>
        </div>
    );
};

export default Player;
