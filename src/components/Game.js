import React, { useState } from 'react';
import Dice from './Dice';
import '../styles/Game.scss';

const Game = () => {
    const [roll, setRoll] = useState(0);
    const [turnScore, setTurnScore] = useState(0);
    const [rollScore, setRollScore] = useState(0);
    const [diceValues, setDiceValues] = useState([1, 1, 1, 1, 1, 1]);

    const rollDice = () => {
        setRoll(roll + 1);

        // Generar números aleatorios para cada dado
        const newDiceValues = [...Array(6)].map(() => Math.floor(Math.random() * 6) + 1);

        // Mostrar los valores de los dados en la consola
        console.log('Dados de este turno:', newDiceValues);

        // Actualizar valores de los dados
        setDiceValues(newDiceValues);

        // Contador de cada número del 1 al 6
        const count = [0, 0, 0, 0, 0, 0];
        newDiceValues.forEach(value => {
            count[value - 1]++;
        });

        // Calcular puntaje de la tirada
        let newRollScore = 0;

        // Verificar reglas de puntaje según las combinaciones de dados
        switch (newDiceValues.length) {
            // Cada Case depende de la cantidad de dados tirados
            case 6:
                // 6 dados iguales
                if (count[0] === 6) { // Seis dados de 1
                    newRollScore += 6000;
                    break;
                } else if (count[4] === 6) { // Seis dados de 5
                    newRollScore += 3000;
                    break;
                } else { // Seis dados de 2, 3, 4 o 6
                    let foundSixDice = false;
                    for (let i = 1; i < 6; i++) {
                        if (i !== 4 && count[i] === 6) {
                            newRollScore += (i + 1) * 600;
                            foundSixDice = true;
                            break;
                        }
                    }
                    if (foundSixDice) {
                        break;
                    }
                }

                // 5 dados iguales
                if (count[0] === 5 && count[4] === 1) { // Cinco dados de 1 y un dado de 5
                    newRollScore += 5050;
                    break;
                } else if (count[0] === 5) { // Cinco dados de 1
                    newRollScore += 5000;
                    break;
                } else if (count[4] === 5 && count[0] === 1) { // Cinco dados de 5 y un dado de 1
                    newRollScore += 2600;
                    break;
                } else if (count[4] === 5) { // Cinco dados de 5
                    newRollScore += 2500;
                    break;
                } else {
                    let foundFiveDice = false;
                    for (let i = 1; i < 6; i++) {
                        if (i !== 4 && count[i] === 5 && count[0] === 1) { // Cinco dados de 2, 3, 4 o 6 y un dado de 1
                            newRollScore += (i + 1) * 500 + 100;
                            foundFiveDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 5 && count[4] === 1) { // Cinco dados de 2, 3, 4 o 6 y un dado de 5
                            newRollScore += (i + 1) * 500 + 50;
                            foundFiveDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 5) { // Cinco dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 500;
                            foundFiveDice = true;
                            break;
                        }
                    }
                    if (foundFiveDice) {
                        break;
                    }
                }

                // 4 dados iguales
                if (count[0] === 4 && count[4] === 2) { // Cuatro dados de 1 y dos dados de 5
                    newRollScore += 4100;
                    break;
                } else if (count[0] === 4 && count[4] === 1) { // Cuatro dados de 1 y un dado de 5
                    newRollScore += 4050;
                    break;
                } else if (count[0] === 4) { // Cuatro dados de 1
                    newRollScore += 4000;
                    break;
                } else if (count[4] === 4 && count[0] === 2) { // Cuatro dados de 5 y dos dados de 1
                    newRollScore += 2200;
                    break;
                } else if (count[4] === 4 && count[0] === 1) { // Cuatro dados de 5 y un dado de 1
                    newRollScore += 2100;
                    break;
                } else if (count[4] === 4) { // Cuatro dados de 5
                    newRollScore += 2000;
                    break;
                } else {
                    let foundFourDice = false;
                    for (let i = 1; i < 6; i++) {
                        if (i !== 4 && count[i] === 4 && count[0] === 2) { // Cuatro dados de 2, 3, 4 o 6 y dos dados de 1
                            newRollScore += (i + 1) * 400 + 200;
                            foundFourDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 4 && count[4] === 2) { // Cuatro dados de 2, 3, 4 o 6 y dos dados de 5
                            newRollScore += (i + 1) * 400 + 100;
                            foundFourDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 4 && count[0] === 1 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 1 y un dado de 5
                            newRollScore += (i + 1) * 400 + 150;
                            foundFourDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 4 && count[0] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 1
                            newRollScore += (i + 1) * 400 + 100;
                            foundFourDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 4 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 5
                            newRollScore += (i + 1) * 400 + 50;
                            foundFourDice = true;
                            break;
                        } else if (i !== 4 && count[i] === 4) { // Cuatro dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 400;
                            foundFourDice = true;
                            break;
                        }
                    }
                    if (foundFourDice) {
                        break;
                    }
                }

                // Escalera
                const ladder1 = count[0] >= 1 && count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1;
                const ladder2 = count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1;
                const ladder3 = count[0] === 1 && count[1] === 1 && count[2] === 1 && count[3] === 1 && count[4] === 1 && count[5] === 1;

                if (ladder3) { // 1, 2, 3, 4, 5, 6
                    newRollScore += 2000;
                    break;    
                } else if (ladder1 && count[0] === 2) { // 1, 2, 3, 4, 5 y 1
                    newRollScore += 1600;
                    break;
                } else if ((ladder1 && count[4] === 2) || (ladder2 && count[4] === 2)) { // 1, 2, 3, 4, 5 y 5  o  2, 3, 4, 5, 6 y 5
                    newRollScore += 1550;
                    break;
                } else if ((ladder1) || (ladder2)) { // 1, 2, 3, 4, 5  o  2, 3, 4, 5, 6
                    newRollScore += 1500;
                    break;
                }

                // Tres pares de dados
                let countPairs = 0;
                for (let i = 0; i < 6; i++) {
                    if (count[i] === 2) {
                        countPairs += 1;
                    }
                }
                if (countPairs === 3) {
                    newRollScore += 1500;
                    break;
                }

                // 3 dados iguales
                let someDice = false;
                for (let i = 0; i < 6; i++) {
                    if (i !== 0 && i !== 4 && count[i] === 3) { // Tres dados de 2, 3, 4 o 6
                        newRollScore += (i + 1) * 100;
                        someDice = true;
                    } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                        newRollScore += 1000;
                        someDice = true;
                    } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                        newRollScore += 500;
                        someDice = true;
                    }

                    if (i === 0 && count[i] === 2) { // Dos dados de 1
                        newRollScore += 200;
                        someDice = true;
                    } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                        newRollScore += 100;
                        someDice = true;
                    } else if (i === 4 && count[i] === 1) { // Un dado de 5
                        newRollScore += 50;
                        someDice = true;
                    }
                }
                if (someDice) {
                    break;
                }

            default: 
                newRollScore += 0;
                console.log("default");
                break;
        }

        // Actualizar el puntaje total del turno y puntaje de la tirada
        setTurnScore(turnScore + newRollScore);
        setRollScore(newRollScore);
    };

    return (
        <div className="game">
            <div className="dice-container">
                {diceValues.map((value, index) => (
                    <Dice key={index} number={value} />
                ))}
            </div>
            <button className="roll-button" onClick={rollDice}>Tirar los dados</button>
            <div className="rolls">
                <p>Puntaje de la tirada: {rollScore}</p>
                <p>Puntaje acumulado del turno: {turnScore}</p>
            </div>
        </div>
    );
};

export default Game;
