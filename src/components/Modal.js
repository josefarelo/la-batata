import React, { useState } from 'react';
import '../styles/Modal.scss';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    const [players, setPlayers] = useState('');

    const handleChange = (e) => {
        setPlayers(e.target.value);
    };

    const handleSubmit = () => {
        const numPlayers = parseInt(players, 10);
        if (numPlayers >= 2 && numPlayers <= 10) {
            const playerNames = Array.from({ length: numPlayers }, (_, index) => `Jugador ${index + 1}`);
            if (typeof onConfirm === 'function') {
                onConfirm(numPlayers, playerNames);
            } else {
                console.error('onConfirm is not a function');
            }
            onClose();
        } else {
            alert('La cantidad de jugadores debe ser entre 2 y 10');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Ingrese la cantidad de jugadores</h2>
                <input
                    type="number"
                    value={players}
                    onChange={handleChange}
                    min="2"
                    max="10"
                />
                <button onClick={handleSubmit}>Aceptar</button>
            </div>
        </div>
    );
};

export default Modal;
