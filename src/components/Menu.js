import React, { useState } from 'react';
import '../styles/Menu.scss';
import GameRules from './GameRules';
const Menu = () => {

    const [isRulesVisible, setIsRulesVisible] = useState(false);

    const showRules = (e) => {
        e.stopPropagation();
        setIsRulesVisible(!isRulesVisible);
    }

    const showScoreBoard = (e) => {
        e.stopPropagation();
    }

    const reloadPage = (e) => {
        e.stopPropagation();
        window.location.reload();
    }

    return (
        <div className='menu'>
            <ul className='dropdown-menu'>
                <li className='menu-links' onClick={showRules}>Reglas del juego</li>
                <li className='menu-links'onClick={showScoreBoard}>Tabla de puntuación</li>
                <li className='menu-links' onClick={reloadPage}>Reiniciar juego</li>
            </ul>
            {isRulesVisible && <GameRules />}
        </div>
    );
};

export default Menu;