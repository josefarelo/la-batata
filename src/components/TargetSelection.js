import React from 'react';
import '../styles/TargetSelection.scss';

const TargetSelection = ({ possibleTargets, showTargets, onPlayerClick }) => {

    const handlePlayerClick = (player) => {
        onPlayerClick(player);
        console.log(`target-selection player: ${player}`)
    }

    return (
        <div className='objetive-selection-container'>
            {showTargets && (
                <table>
                    <thead>
                        <tr>
                            <th>Selecciona a tu objetivo</th>
                        </tr>
                    </thead>
                    <tbody>                
                        {possibleTargets.map((player, index) => (
                            <tr key={index}>
                                <td>
                                    <button 
                                        className='player-objetive-button' 
                                        onClick={() => handlePlayerClick(player)}
                                    >
                                        {player}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TargetSelection;