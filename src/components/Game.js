import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import Modal from './Modal';
import '../styles/Game.scss';

const Game = () => {
    const [roll, setRoll] = useState(0);
    const [rollScore, setRollScore] = useState(0);
    const [rollCondition, setRollCondition] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [maximumPointsSupperpassed, setMaximumPointsSupperpassed] = useState(false);
    const [turnScore, setTurnScore] = useState(0);
    const [diceValues, setDiceValues] = useState([1, 1, 1, 1, 1, 1]);
    const [updateNumberOfDice, setUpdateNumberOfDice] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [players, setPlayers] = useState([]);
    const [totalScore, setTotalScore] = useState([]);
    const [playerInGame, setPlayerInGame] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentScoreIndex, setCurrentScoreIndex] = useState(0);
    const [pure, setPure] = useState(false);

    const currentPlayer = players[currentPlayerIndex];
    
    const handleCloseModal = () => { // Maneja la ventana de ingreso de jugadores
        setIsModalOpen(false);
    };

    const handleConfirm = (numPlayers, playerNames, playerScores, inGame) => { // Actualiza el estado con los nombres, puntos y estado de juego de los jugadores
        setPlayers(playerNames);
        setTotalScore(playerScores);
        setPlayerInGame(inGame);
    };

    useEffect(() => { // Entrada al "Juego"
        if (turnScore >= 700 && !playerInGame[currentPlayerIndex]) { 
            // El jugador ingresa al juego
            const updatePlayerInGame = [...playerInGame];
            updatePlayerInGame[currentPlayerIndex] = true;
            setPlayerInGame(updatePlayerInGame);
            alert("El " + currentPlayer + " ha entrado al juego!");
            
            // Finaliza el turno para el jugador recién ingresado al juego
            const updateRollCondition = false;
            setRollCondition(updateRollCondition);
            alert("Tu turno ha finalizado!");
        }

        // Ganar el juego
        if ((totalScore[currentScoreIndex] + turnScore) === 10000) {
            const updateGameState = true;
            setGameOver(updateGameState);
            alert("Felicitaciones " + currentPlayer + ", has ganado el juego!!!")
        } else if ((totalScore[currentScoreIndex] + turnScore) > 10000) {
            const updateGameState = true;
            setMaximumPointsSupperpassed(updateGameState);
            alert("Te has excedido del puntaje final pero estas muy cerca, sigue intentándolo!");
        }
    }, [turnScore]);


    const rollDice = () => { // Tirar los dados

        let diceCount = 0;
        
        if (roll === 0) {
            setUpdateNumberOfDice(6);
        }
        console.log("updateNumberOfDice: " + updateNumberOfDice);
        let numberOfDice = updateNumberOfDice;
        console.log("numberOfDice parte 1: " + numberOfDice);

        // Verificar si el jugador está dentro del juego para permitir más tiradas
        if (roll === 1 && turnScore < 700 &&!playerInGame[currentPlayerIndex]) {
            alert("No puedes tirar más los dados, no estás dentro del juego");
            const updateRollCondition = false;
            setRollCondition(updateRollCondition);
        } else {

            // Generar números aleatorios para cada dado
            const diceAmount = [...Array(numberOfDice)].map(() => Math.floor(Math.random() * 6) + 1);

            // Actualizar valores de los dados
            setDiceValues(diceAmount);
    
            // Contador de cada número del 1 al 6
            const count = [0, 0, 0, 0, 0, 0];
            diceAmount.forEach(value => {
                count[value - 1]++;
            });
    
            // Calcular puntaje de la tirada
            let newRollScore = 0;
    
            // Puntajes según las combinaciones de dados
            switch (diceAmount.length) {
                
                // Cada Case es la cantidad de dados tirados
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
                        newRollScore += 4050;
                        break;
                    } else if (count[0] === 5) { // Cinco dados de 1
                        newRollScore += 4000;
                        numberOfDice = 1;
                        break;
                    } else if (count[4] === 5 && count[0] === 1) { // Cinco dados de 5 y un dado de 1
                        newRollScore += 2100;
                        break;
                    } else if (count[4] === 5) { // Cinco dados de 5
                        newRollScore += 2000;
                        numberOfDice = 1;
                        break;
                    } else {
                        let foundFiveDice = false;
                        for (let i = 1; i < 6; i++) {
                            if (i !== 4 && count[i] === 5 && count[0] === 1) { // Cinco dados de 2, 3, 4 o 6 y un dado de 1
                                newRollScore += (i + 1) * 400 + 100;
                                foundFiveDice = true;
                                break;
                            } else if (i !== 4 && count[i] === 5 && count[4] === 1) { // Cinco dados de 2, 3, 4 o 6 y un dado de 5
                                newRollScore += (i + 1) * 400 + 50;
                                foundFiveDice = true;
                                break;
                            } else if (i !== 4 && count[i] === 5) { // Cinco dados de 2, 3, 4 o 6
                                newRollScore += (i + 1) * 400;
                                foundFiveDice = true;
                                numberOfDice = 1;
                                break;
                            }
                        }
                        if (foundFiveDice) {
                            break;
                        }
                    }

                    // 4 dados iguales
                    if (count[0] === 4 && count[4] === 2) { // Cuatro dados de 1 y dos dados de 5
                        newRollScore += 2100;
                        break;
                    } else if (count[0] === 4 && count[4] === 1) { // Cuatro dados de 1 y un dado de 5
                        newRollScore += 2050;
                        numberOfDice = 1;
                        break;
                    } else if (count[0] === 4) { // Cuatro dados de 1
                        newRollScore += 2000;
                        numberOfDice = 2;;
                        break;
                    } else if (count[4] === 4 && count[0] === 2) { // Cuatro dados de 5 y dos dados de 1
                        newRollScore += 1200;
                        break;
                    } else if (count[4] === 4 && count[0] === 1) { // Cuatro dados de 5 y un dado de 1
                        newRollScore += 1100;
                        numberOfDice = 1;
                        break;
                    } else if (count[4] === 4) { // Cuatro dados de 5
                        newRollScore += 1000;
                        numberOfDice = 2;;
                        break;
                    } else {
                        let foundFourDice = false;
                        for (let i = 1; i < 6; i++) {
                            if (i !== 4 && count[i] === 4 && count[0] === 2) { // Cuatro dados de 2, 3, 4 o 6 y dos dados de 1
                                newRollScore += (i + 1) * 200 + 200;
                                foundFourDice = true;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[4] === 2) { // Cuatro dados de 2, 3, 4 o 6 y dos dados de 5
                                newRollScore += (i + 1) * 200 + 100;
                                foundFourDice = true;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[0] === 1 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 1 y un dado de 5
                                newRollScore += (i + 1) * 200 + 150;
                                foundFourDice = true;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[0] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 1
                                newRollScore += (i + 1) * 200 + 100;
                                foundFourDice = true;
                                numberOfDice = 1;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 5
                                newRollScore += (i + 1) * 200 + 50;
                                foundFourDice = true;
                                numberOfDice = 1;
                                break;
                            } else if (i !== 4 && count[i] === 4) { // Cuatro dados de 2, 3, 4 o 6
                                newRollScore += (i + 1) * 200;
                                foundFourDice = true;
                                numberOfDice = 2;;
                                break;
                            }
                        }
                        if (foundFourDice) {
                            break;
                        }
                    }
    
                    // Escalera
                    const sixDiceladder1 = count[0] >= 1 && count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1;
                    const sixDiceladder2 = count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1;
                    const sixDiceladder3 = count[0] === 1 && count[1] === 1 && count[2] === 1 && count[3] === 1 && count[4] === 1 && count[5] === 1;
    
                    if (sixDiceladder3) { // 1, 2, 3, 4, 5, 6
                        newRollScore += 2000;
                        break;    
                    } else if (sixDiceladder1 && count[0] === 2) { // 1, 2, 3, 4, 5 y 1
                        newRollScore += 1600;
                        break;
                    } else if ((sixDiceladder1 && count[4] === 2) || (sixDiceladder2 && count[4] === 2)) { // 1, 2, 3, 4, 5 y 5  o  2, 3, 4, 5, 6 y 5
                        newRollScore += 1550;
                        break;
                    } else if ((sixDiceladder1) || (sixDiceladder2)) { // 1, 2, 3, 4, 5  o  2, 3, 4, 5, 6
                        newRollScore += 1500;
                        numberOfDice = 1;
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
                    let sixDiceThreeEq = false;
                    for (let i = 0; i < 6; i++) {
                        if (i !== 0 && i !== 4 && count[i] === 3) { // Tres dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 100;
                            sixDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                            newRollScore += 1000;
                            sixDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                            newRollScore += 500;
                            sixDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    // Dados 1 y 5    
                        if (i === 0 && count[i] === 2) { // Dos dados de 1
                            newRollScore += 200;
                            sixDiceThreeEq = true;
                            const updateDiceCount = 2;
                            diceCount = (diceCount + updateDiceCount);
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            sixDiceThreeEq = true;
                            if (i === 4 && count[i] === 2) {
                                const updateDiceCount = 2;
                                diceCount = (diceCount + updateDiceCount);
                            } else {
                                const updateDiceCount = 1;
                                diceCount = (diceCount + updateDiceCount);
                            }
                        } else if (i === 4 && count[i] === 1) { // Un dado de 5
                            newRollScore += 50;
                            sixDiceThreeEq = true;
                            const updateDiceCount = 1;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    }
                    if (sixDiceThreeEq) {
                        if (diceCount === 6) {
                            numberOfDice = 6;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                            if (numberOfDice === 0) {
                                numberOfDice = 6;
                            }
                        }
                        break;
                    }
                
                case 5:
                    // 5 dados iguales
                    if (count[0] === 5) { // Cinco dados de 1
                        newRollScore += 4000;
                        numberOfDice = 6;
                        break;
                    } else if (count[4] === 5) { // Cinco dados de 5
                        newRollScore += 2000;
                        numberOfDice = 6;
                        break;
                    } else {
                        let foundFiveDice = false;
                        for (let i = 1; i < 6; i++) {
                            if (i !== 4 && count[i] === 5) { // Cinco dados de 2, 3, 4 o 6
                                newRollScore += (i + 1) * 400;
                                foundFiveDice = true;
                                break;
                            }
                        }
                        if (foundFiveDice) {
                            numberOfDice = 6;
                            break;
                        }
                    }
    
                    // 4 dados iguales
                    if (count[0] === 4 && count[4] === 1) { // Cuatro dados de 1 y un dado de 5
                        newRollScore += 2050;
                        numberOfDice = 6;
                        break;
                    } else if (count[0] === 4) { // Cuatro dados de 1
                        newRollScore += 2000;
                        numberOfDice = 1;
                        break;
                    } else if (count[4] === 4 && count[0] === 1) { // Cuatro dados de 5 y un dado de 1
                        newRollScore += 1100;
                        numberOfDice = 6;
                        break;
                    } else if (count[4] === 4) { // Cuatro dados de 5
                        newRollScore += 1000;
                        numberOfDice = 1;
                        break;
                    } else {
                        let foundFourDice = false;
                        for (let i = 1; i < 6; i++) {
                            if (i !== 4 && count[i] === 4 && count[0] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 1
                                newRollScore += (i + 1) * 200 + 100;
                                foundFourDice = true;
                                numberOfDice = 6;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 5
                                newRollScore += (i + 1) * 200 + 50;
                                foundFourDice = true;
                                numberOfDice = 6;
                                break;
                            } else if (i !== 4 && count[i] === 4) { // Cuatro dados de 2, 3, 4 o 6
                                newRollScore += (i + 1) * 200;
                                foundFourDice = true;
                                numberOfDice = 1;
                                break;
                            }
                        }
                        if (foundFourDice) {
                            break;
                        }
                    }
    
                    // Escalera
                    const fiveDiceladder1 = count[0] >= 1 && count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1;
                    const fiveDiceladder2 = count[1] >= 1 && count[2] >= 1 && count[3] >= 1 && count[4] >= 1 && count[5] >= 1;
    
                    if ((fiveDiceladder1) || (fiveDiceladder2)) { // 1, 2, 3, 4, 5  o  2, 3, 4, 5, 6
                        newRollScore += 1500;
                        numberOfDice = 6;
                        break;
                    }
    
                    // 3 dados iguales
                    let fiveDiceThreeEq = false;
                    for (let i = 0; i < 6; i++) {
                        if (i !== 0 && i !== 4 && count[i] === 3) { // Tres dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 100;
                            fiveDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                            newRollScore += 1000;
                            fiveDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                            newRollScore += 500;
                            fiveDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        }
    
                        if (i === 0 && count[i] === 2) { // Dos dados de 1
                            newRollScore += 200;
                            fiveDiceThreeEq = true;
                            const updateDiceCount = 2;
                            diceCount = (diceCount + updateDiceCount);
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            fiveDiceThreeEq = true;
                            if (i === 4 && count[i] === 2) {
                                const updateDiceCount = 2;
                                diceCount = (diceCount + updateDiceCount);
                            } else {
                                const updateDiceCount = 1;
                                diceCount = (diceCount + updateDiceCount);
                            }
                        } else if (i === 4 && count[i] === 1) { // Un dado de 5
                            newRollScore += 50;
                            fiveDiceThreeEq = true;
                            const updateDiceCount = 1;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    }
                    if (fiveDiceThreeEq) {
                        if (diceCount === 5) {
                            numberOfDice = 6;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                            if (numberOfDice === 0) {
                                numberOfDice = 6;
                            }
                        }
                        break;
                    }
    
                case 4:
                    // 4 dados iguales
                    if (count[0] === 4) { // Cuatro dados de 1
                        newRollScore += 2000;
                        numberOfDice = 6;
                        break;
                    } else if (count[4] === 4) { // Cuatro dados de 5
                        newRollScore += 1000;
                        numberOfDice = 6;
                        break;
                    } else {
                        let foundFourDice = false;
                        for (let i = 1; i < 6; i++) {
                            if (i !== 4 && count[i] === 4) { // Cuatro dados de 2, 3, 4 o 6
                                newRollScore += (i + 1) * 200;
                                foundFourDice = true;
                                break;
                            }
                        }
                        if (foundFourDice) {
                            numberOfDice = 6;
                            break;
                        }
                    }
                    
                    // 3 dados iguales
                    let fourDiceThreeEq = false;
                    for (let i = 0; i < 6; i++) {
                        if (i !== 0 && i !== 4 && count[i] === 3) { // Tres dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 100;
                            fourDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                            newRollScore += 1000;
                            fourDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                            newRollScore += 500;
                            fourDiceThreeEq = true;
                            const updateDiceCount = 3;
                            diceCount = (diceCount + updateDiceCount);
                        }
    
                        if (i === 0 && count[i] === 2) { // Dos dados de 1
                            newRollScore += 200;
                            fourDiceThreeEq = true;
                            const updateDiceCount = 2;
                            diceCount = (diceCount + updateDiceCount);
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            fourDiceThreeEq = true;
                            if (i === 4 && count[i] === 2) {
                                const updateDiceCount = 2;
                                diceCount = (diceCount + updateDiceCount);
                            } else {
                                const updateDiceCount = 1;
                                diceCount = (diceCount + updateDiceCount);
                            }
                        } else if (i === 4 && count[i] === 1) { // Un dado de 5
                            newRollScore += 50;
                            fourDiceThreeEq = true;
                            const updateDiceCount = 1;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    }
                    if (fourDiceThreeEq) {
                        if (diceCount === 4) {
                            numberOfDice = 6;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                        }
                        break;
                    }
    
                case 3:
                    // 3 dados iguales
                    let threeDiceThreeEq = false;
                    for (let i = 0; i < 6; i++) {
                        if (i !== 0 && i !== 4 && count[i] === 3) { // Tres dados de 2, 3, 4 o 6
                            newRollScore += (i + 1) * 100;
                            threeDiceThreeEq = true;
                            numberOfDice = 6;
                        } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                            newRollScore += 1000;
                            threeDiceThreeEq = true;
                            numberOfDice = 6;
                        } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                            newRollScore += 500;
                            threeDiceThreeEq = true;
                            numberOfDice = 6;
                        }
    
                        if (i === 0 && count[i] === 2) { // Dos dados de 1
                            newRollScore += 200;
                            threeDiceThreeEq = true;
                            const updateDiceCount = 2;
                            diceCount = (diceCount + updateDiceCount);
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            threeDiceThreeEq = true;
                            if (i === 4 && count[i] === 2) {
                                const updateDiceCount = 2;
                                diceCount = (diceCount + updateDiceCount);
                            } else {
                                const updateDiceCount = 1;
                                diceCount = (diceCount + updateDiceCount);
                            }
                        } else if (i === 4 && count[i] === 1) { // Un dado de 5
                            newRollScore += 50;
                            threeDiceThreeEq = true;
                            const updateDiceCount = 1;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    }
                    if (threeDiceThreeEq) {
                        if (diceCount === 3) {
                            numberOfDice = 6;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                        }
                        break;
                    }
    
                case 2:
                    // 2 dados iguales
                    let twoDiceTh = false;
                    for (let i = 0; i < 6; i++) {
                        if (i === 0 && count[i] === 2) { // Dos dados de 1
                            newRollScore += 200;
                            twoDiceTh = true;
                            numberOfDice = 6;
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            twoDiceTh = true;
                            if (i === 4 && count[i] === 2) {
                                numberOfDice = 6;
                            } else {
                                const updateDiceCount = 1;
                                diceCount = (diceCount + updateDiceCount);
                            }
                        } else if (i === 4 && count[i] === 1) { // Un dado de 5
                            newRollScore += 50;
                            twoDiceTh = true;
                            const updateDiceCount = 1;
                            diceCount = (diceCount + updateDiceCount);
                        }
                    }
                    if (twoDiceTh) {
                        if (diceCount === 2) {
                            numberOfDice = 6;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                        }
                        break;
                    }
    
                case 1:
                    // 1 dado
                    let oneDiceTh = false;
                    if (diceAmount.length === 1) {
                        if (count[0] === 1) { // Un dado de 1
                            newRollScore += 100;
                            oneDiceTh = true;
                        } else if (count[4] === 1) { // Un dado de 5
                            newRollScore += 50;
                            oneDiceTh = true;
                        }
                    }
                    if (oneDiceTh) {
                        numberOfDice = 6;
                        break;
                    }
    
                default: 
                    numberOfDice = 6;
                    setPure(true);
                    alert("¡¡¡Te hiciste puré!!! Perdiste todos los puntos de esta ronda");
                    break;
            }

            // Actualizar el puntaje total del turno y puntaje de la tirada
            setRollScore(newRollScore);
            setTurnScore(turnScore + newRollScore);
            setUpdateNumberOfDice(numberOfDice);
            console.log("numberOfDice: " + numberOfDice);
            console.log(diceAmount);
            console.log(newRollScore);
            console.log("------------------------------------------------");
            
            // Contador de tiradas
            setRoll(roll + 1); 
        }
    };

    const endTurn = () => { // Finalizar el turno del jugador

        // Actualización de puntajes y cambio de turno
        if (playerInGame[currentPlayerIndex]) {
            if (currentPlayerIndex === currentScoreIndex && !maximumPointsSupperpassed && !pure) { // Actualiza los puntos si no sobrepasa el límite de puntuación
                const newTotalScore = [...totalScore];
                newTotalScore[currentScoreIndex] += turnScore;
                setTotalScore(newTotalScore);
            }
        }
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        setCurrentScoreIndex((prevIndex) => (prevIndex + 1) % totalScore.length);
        setTurnScore(0);
        setRollScore(0);
        setRoll(0);
        setRollCondition(true);
        setMaximumPointsSupperpassed(false);
        setUpdateNumberOfDice(6);
        setPure(false);
    }

    return (
        <div className="game">
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirm}
            />
            {!isModalOpen && (
                <div>
                    <div className="dice-container">
                        {diceValues.map((value, index) => (
                            <Dice key={index} number={value} />
                        ))}
                    </div>
                    <div className='buttons-container'>
                        <button className="roll-button" 
                            onClick={rollDice}
                            disabled={!rollCondition || gameOver || maximumPointsSupperpassed || pure}
                        >
                            Tirar los dados
                        </button>
                        <button className="end-turn-button" 
                            onClick={endTurn}
                            disabled={gameOver}
                        >
                            Terminar turno
                        </button>
                    </div>
                    <div className="rolls">
                        <p>{currentPlayer}</p>
                        <p>Puntaje de la tirada: {rollScore}</p>
                        <p>Puntaje acumulado del turno: {turnScore}</p>
                        <p>Puntaje total del jugador: {totalScore[currentScoreIndex]}</p> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
