import React from 'react';
import '../styles/Dice.scss';

const Dice = ({ dice }) => {
    return (
        <div className="dice-container">
        {dice.map((die, index) => (
            <div key={index} className={`die die-${die}`}>{die}</div>
        ))}
        </div>
    );
};

export default Dice;
