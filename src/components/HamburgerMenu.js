import React, { useState } from 'react';
import '../styles/HamburgerMenu.scss';
import Menu from './Menu';

const HamburgerMenu = () => {
    const [isDeployed, setIsDeployed] = useState(false);

    const dropdownMenu = () => {
        setIsDeployed(!isDeployed);
    };

    return (
        <div
        className={`menu-container ${isDeployed ? 'change' : ''}`} // Agrega clase condicional
        onClick={dropdownMenu}
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            {isDeployed && <Menu />}
        </div>
    );
};

export default HamburgerMenu;
