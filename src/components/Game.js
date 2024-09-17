import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import Modal from './Modal';
import HamburgerMenu from './HamburgerMenu';
import ObjectiveSelection from './TargetSelection';
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
    const [playerMidGame, setPlayerMidGame] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentScoreIndex, setCurrentScoreIndex] = useState(0);
    const [pure, setPure] = useState(false);
    const [forcedThrow, setForcedThrow] = useState(false);
    const [turnCounter, setTurnCounter] = useState(0);
    const [activateTurnCounter, setActivateTurnCounter] = useState(false);
    const [roundCounter, setRoundCounter] = useState(-1);
    const [batataCaliente, setBatataCaliente] = useState(false);
    const [batatearOn, setBatatearON] = useState(false);
    const [canBatatear, setCanBatatear] = useState(false);
    const [fortuneBatataOn, setFortuneBatataOn] = useState([]);
    const [fortuneBatataCounter, setFortuneBatataCounter] = useState([]);
    const [canUseBatatazo, setCanUseBatatazo] = useState(false);
    const [batatazoOn, setBatatazoOn] = useState([]);
    const [batatazoCooldown, setBatatazoCooldown] = useState([]);
    const [showTargets, setShowTargets] = useState(false);
    const [possibleTargets, setPossibleTargets] = useState([]);
    const [target, setTarget] = useState();

    const currentPlayer = players[currentPlayerIndex];

    const isOdd = number => number % 2 !== 0;
    
    const handleCloseModal = () => { // Maneja la ventana de ingreso de jugadores
        setIsModalOpen(false);
    };

    const handleConfirm = (numPlayers, playerNames, playerScores, inGame) => { // Actualiza el estado con los nombres, puntos y estado de juego de los jugadores
        setPlayers(playerNames);
        setTotalScore(playerScores);
        setPlayerInGame(inGame);
    };

    useEffect(() => { // Condiciones por puntaje del jugador (Ingreso al juego, Ganar, Límite para funciones especiales...)
        // Establecer longitud de "Batata de la fortuna"
        if (fortuneBatataOn.length === 0) {
            const updateFortuneBatata = [...playerInGame];
            setFortuneBatataOn(updateFortuneBatata);
            setFortuneBatataCounter(Array.from({ length: updateFortuneBatata.length }, () => 0));
        }

        // Establecer longitud de "Batatazo"
        if (batatazoOn.length === 0) {
            const updateBatatazo = [...playerInGame];
            setBatatazoOn(updateBatatazo);
            setBatatazoCooldown(Array.from({ length: updateBatatazo.length }, () => 0));
        }

        // Entrada al "Juego"
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

        // Límite para funciones especiales
        if (playerMidGame.length === 0) {
            setPlayerMidGame(Array(players.length).fill(false)); 
        }
        if (playerInGame[currentPlayerIndex] && totalScore[currentPlayerIndex] <= 5000) {
            const updatePlayerMidGame = [...playerMidGame];
            updatePlayerMidGame[currentPlayerIndex] = true;
            setPlayerMidGame(updatePlayerMidGame);
        } else if (playerInGame[currentPlayerIndex] && totalScore[currentPlayerIndex] > 5000) {
            const updatePlayerMidGame = [...playerMidGame]; 
            updatePlayerMidGame[currentPlayerIndex] = false;
            setPlayerMidGame(updatePlayerMidGame);
        }

        // Finalizar el turno para el jugador que haya usado la Batata de la fortuna
        if (fortuneBatataOn[currentPlayerIndex] && (fortuneBatataCounter[currentPlayerIndex] === 1 || fortuneBatataCounter[currentPlayerIndex] === 2)) {
            const updateRollCondition = false;
            setRollCondition(updateRollCondition);
            alert(players[currentPlayerIndex] + " debes esperar " + (3 - fortuneBatataCounter[currentPlayerIndex]) + " turno/s para poder lanzar los dados!");
        }
    }, [turnScore, totalScore, currentPlayerIndex]);

    useEffect(() => { // Actualizar cantidad de rondas y habilitar "Batatear"
        // Activar contador de turnos
        if (players.length > 2 && playerInGame.every(player => player) && currentPlayerIndex === 0 && !activateTurnCounter) {
            setActivateTurnCounter(true);
            setTurnCounter(0);
        }

        // Contador de rondas
        if (turnCounter === players.length && turnCounter > 1) {
            if (playerInGame.every(player => player) && currentPlayer[0]){
                setRoundCounter(prevRoundCounter => prevRoundCounter + 1);
            }
            setTurnCounter(0);
        }

        // Habilitar botón de Batatear
        if (playerInGame[currentPlayerIndex]) {
            setCanBatatear(true);
        }
        if (batataCaliente) {
            setCanBatatear (false);
        }
    }, [turnCounter]);

    useEffect(() => { // Batata Caliente ON/OFF
        if (roundCounter === 5) {
            setBatataCaliente(true);
            setForcedThrow(true);
            alert("¡¡¡Batata caliente!!!");
        } else if (roundCounter > 5) {
            setBatataCaliente(false);
            setRoundCounter(0);
        }
    }, [roundCounter]);

    useEffect(() => { // Condiciones para usar Batatazo
        if (!canUseBatatazo || canUseBatatazo) {
            let playersCounter = 0;
            for (let i = 0; i < playerInGame.length; i++) {
                if (playerInGame[i] && !playerMidGame[i]) {
                    playersCounter += 1;
                }
            }
            if (playersCounter > 1) {
                setCanUseBatatazo(true);
            } else if (playersCounter <= 1) {
                setCanUseBatatazo(false);
            }
            console.log("playerCounter: " + playersCounter);
        }

        setPossibleTargets([]); // Limpiar los posibles objetivos
        if (canUseBatatazo) {
            let updateTargets = [];
            for (let i = 0; i < players.length; ++i ) {
                if (playerInGame[i] && !playerMidGame[i]) {
                    updateTargets.push(players[i]);
                }
            }
            setPossibleTargets(updateTargets);
        }
    }, [playerInGame, playerMidGame]);

    const rollDice = () => { // Tirar los dados

        let diceCount = 0;
        let diceAmount = [...Array(6)];

        if (roll === 0) {
            setUpdateNumberOfDice(6);
        }
        let numberOfDice = updateNumberOfDice;
        let mustRollAllTheDice = false;

        if (forcedThrow) {
            setForcedThrow(false);
        }

        // Verificar si el jugador está dentro del juego para permitir más tiradas
        if (roll === 1 && turnScore < 700 &&!playerInGame[currentPlayerIndex]) {
            alert("No puedes tirar más los dados, no estás dentro del juego");
            const updateRollCondition = false;
            setRollCondition(updateRollCondition);
        } else {
            if (batataCaliente) { // Cambia la cantidad de dados para la Batata Caliente
                diceAmount = [1].map(() => Math.floor(Math.random() * 6) + 1);
                if (roll === 0) {
                    setRollCondition(false);
                }
            } else {
                diceAmount = [...Array(numberOfDice)].map(() => Math.floor(Math.random() * 6) + 1); // Generar números aleatorios para cada dado
                if (batatearOn) { // Batatear los dados
                    const invertDice = {
                        1: 6,
                        6: 1,
                        2: 5,
                        5: 2,
                        3: 4,
                        4: 3
                    };
                    diceAmount = diceAmount.map(num => invertDice[num] !== undefined ? invertDice[num] : num);
                };
            }

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
                            mustRollAllTheDice = true;;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                            if (numberOfDice === 0) {
                                mustRollAllTheDice = true;;
                            }
                        }
                        break;
                    }
                
                case 5:
                    // 5 dados iguales
                    if (count[0] === 5) { // Cinco dados de 1
                        newRollScore += 4000;
                        mustRollAllTheDice = true;;
                        break;
                    } else if (count[4] === 5) { // Cinco dados de 5
                        newRollScore += 2000;
                        mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
                            break;
                        }
                    }
    
                    // 4 dados iguales
                    if (count[0] === 4 && count[4] === 1) { // Cuatro dados de 1 y un dado de 5
                        newRollScore += 2050;
                        mustRollAllTheDice = true;;
                        break;
                    } else if (count[0] === 4) { // Cuatro dados de 1
                        newRollScore += 2000;
                        numberOfDice = 1;
                        break;
                    } else if (count[4] === 4 && count[0] === 1) { // Cuatro dados de 5 y un dado de 1
                        newRollScore += 1100;
                        mustRollAllTheDice = true;;
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
                                mustRollAllTheDice = true;;
                                break;
                            } else if (i !== 4 && count[i] === 4 && count[4] === 1) { // Cuatro dados de 2, 3, 4 o 6 y un dado de 5
                                newRollScore += (i + 1) * 200 + 50;
                                foundFourDice = true;
                                mustRollAllTheDice = true;;
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
                        mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
                        } else {
                            numberOfDice = (numberOfDice - diceCount);
                            if (numberOfDice === 0) {
                                mustRollAllTheDice = true;;
                            }
                        }
                        break;
                    }
    
                case 4:
                    // 4 dados iguales
                    if (count[0] === 4) { // Cuatro dados de 1
                        newRollScore += 2000;
                        mustRollAllTheDice = true;;
                        break;
                    } else if (count[4] === 4) { // Cuatro dados de 5
                        newRollScore += 1000;
                        mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
                        } else if (i === 0 && count[i] === 3) { // Tres dados de 1
                            newRollScore += 1000;
                            threeDiceThreeEq = true;
                            mustRollAllTheDice = true;;
                        } else if (i === 4 && count[i] === 3) { // Tres dados de 5
                            newRollScore += 500;
                            threeDiceThreeEq = true;
                            mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
                        } else if ((i === 0 && count[i] === 1) || (i === 4 && count[i] === 2)) { // Dos dados de 5 o Un dado de 1
                            newRollScore += 100;
                            twoDiceTh = true;
                            if (i === 4 && count[i] === 2) {
                                mustRollAllTheDice = true;;
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
                            mustRollAllTheDice = true;;
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
                        mustRollAllTheDice = true;;
                        break;
                    }
    
                default: 
                    numberOfDice = 6;
                    let updatePure = true;
                    if (batataCaliente || !playerInGame[currentPlayerIndex]) {
                        updatePure = false;
                    }
                    if (updatePure) {
                        alert("¡¡¡Te hiciste puré!!! Perdiste todos los puntos de esta ronda");
                    }
                    setPure(updatePure);
                    break;
            }

            // Tirada forzosa
            if (playerInGame[currentPlayerIndex] && mustRollAllTheDice && !batataCaliente) {
                alert("No hay más dados por tirar, debes lanzar todos nuevamente!");
                setForcedThrow(true);
                numberOfDice = 6
                mustRollAllTheDice = false;
            }

            // Actualizar el puntaje del turno y puntaje de la tirada
            if (batataCaliente && isOdd(diceAmount)) { // Actualizacion de puntos por Batata Caliente
                if ((totalScore[currentPlayerIndex] - 1000) < 700 ) {
                    const newTotalScore = [...totalScore];
                    newTotalScore[currentPlayerIndex] = 700;
                    setTotalScore(newTotalScore); 
                } else {
                    const newTotalScore = [...totalScore];
                    newTotalScore[currentPlayerIndex] -= 1000;
                    setTotalScore(newTotalScore); 
                }
            } else {
                setRollScore(newRollScore);
                setTurnScore(turnScore + newRollScore);
                setUpdateNumberOfDice(numberOfDice);
            }

            if (batatearOn) {
                setCanBatatear(false);
                setBatatearON(false);
            }
            setRoll(roll + 1); // Contador de tiradas
        }
    };

    const endTurn = () => { // Finalizar el turno del jugador

        // Actualización de puntajes y cambio de turno
        if (playerInGame[currentPlayerIndex]) {
            if (currentPlayerIndex === currentScoreIndex && !maximumPointsSupperpassed && !pure) { // Actualiza los puntos si no sobrepasa el límite de puntuación
                if (fortuneBatataOn[currentPlayerIndex] && fortuneBatataCounter[currentPlayerIndex] === 3) { // Actualiza el puntaje si se utilizó Batata de la fortuna
                    const newTotalScore = [...totalScore];
                    console.log("totalScore: " + totalScore[currentPlayerIndex]);
                    newTotalScore[currentScoreIndex] += (turnScore*2);
                    setTotalScore(newTotalScore);
                    console.log("newTotalScore: " + totalScore[currentPlayerIndex]);
                } else if (batatazoOn[currentPlayerIndex]) { // Actualiza el puntaje si se utilizó Batatazo
                    const newTotalScore = [...totalScore];
                    if (newTotalScore[target] - turnScore <= 700) {
                        newTotalScore[target] = 700;
                        setTotalScore(newTotalScore);
                    } else {
                        newTotalScore[target] -= turnScore;
                        setTotalScore(newTotalScore);
                    }
                    // Finaliza Batatazo para el jugador que utilizó la función
                    const updateBatatazo = [...batatazoOn];
                    updateBatatazo[currentPlayerIndex] = false;
                    setBatatazoOn(updateBatatazo);
                } else { // Actualiza de forma normal el puntaje del jugador
                    const newTotalScore = [...totalScore];
                    newTotalScore[currentScoreIndex] += turnScore;
                    setTotalScore(newTotalScore);
                }
            }
        }
        if(batataCaliente && !forcedThrow) {
            setForcedThrow(true);
            if (currentPlayerIndex === players.length - 1) {
                setForcedThrow(false);
            }
        }

        // Actualizar contador de espera de Batata de la fortuna
        if ((fortuneBatataOn[currentPlayerIndex] && !batataCaliente) || (fortuneBatataCounter[currentPlayerIndex] > 0 && !batataCaliente)) {
            const updateFortuneBatataCounter = [...fortuneBatataCounter];
            updateFortuneBatataCounter[currentPlayerIndex] += 1;
            setFortuneBatataCounter(updateFortuneBatataCounter);
        }
        //  Finalizar Batata de la fortuna
        if (fortuneBatataOn[currentPlayerIndex] && fortuneBatataCounter[currentPlayerIndex] === 3) {
            const updateFortuneBatata = [...fortuneBatataOn];
            updateFortuneBatata[currentPlayerIndex] = false;
            setFortuneBatataOn(updateFortuneBatata);
            alert("Finalizó la Batata de la fortuna para el " + players[currentPlayerIndex]);
            console.log("Finalizó la Batata de la fortuna para el " + players[currentPlayerIndex]);
        }
        // Resetear tiempo de espera para volver a usar Batata de la fortuna
        if (fortuneBatataCounter[currentPlayerIndex] === 5) {
            const updateFortuneBatataCounter = [...fortuneBatataCounter];
            updateFortuneBatataCounter[currentPlayerIndex] = 0;
            setFortuneBatataCounter(updateFortuneBatataCounter);
        }
        // Actualizar contador de espera de Batatazo
        if (batatazoCooldown[currentPlayerIndex] > 0) {
            const updatePlayerBatatazoCooldown = [...batatazoCooldown];
            updatePlayerBatatazoCooldown[currentPlayerIndex] -= 1;
            setBatatazoCooldown(updatePlayerBatatazoCooldown);
            console.log(`Batatazo cooldown: ${batatazoCooldown[currentPlayerIndex]}`);
        }

        setTurnCounter(prevTurnCounter => prevTurnCounter + 1);
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        setCurrentScoreIndex((prevIndex) => (prevIndex + 1) % totalScore.length);
        setTurnScore(0);
        setRollScore(0);
        setRoll(0);
        setRollCondition(true);
        setMaximumPointsSupperpassed(false);
        setUpdateNumberOfDice(6);
        setPure(false);

        console.log(`playerMidGame: ${playerMidGame}`);
    }

    const batatear = () => { // Función especial Batatear
        if (canBatatear) {
            setBatatearON(true);
        }
    };

    const batataDeLaFortuna = () => { // Función especial Batata de la fortuna
        if (playerMidGame[currentPlayerIndex] && fortuneBatataCounter[currentPlayerIndex] === 0) {
            const updateFortuneBatata = [...fortuneBatataOn];
            updateFortuneBatata[currentPlayerIndex] = true;
            setFortuneBatataOn(updateFortuneBatata);
            alert("Comenzó la Batata de la fortuna para el " + players[currentPlayerIndex]);
            console.log("Comenzó la Batata de la fortuna para el " + players[currentPlayerIndex]);
        }
        if (fortuneBatataCounter[currentPlayerIndex] > 0 && fortuneBatataCounter[currentPlayerIndex] < 6) {
            alert(players[currentPlayerIndex] + " debes esperar " + (6 - fortuneBatataCounter[currentPlayerIndex]) + " turno/s para volver a utilizar la Batata de la fortuna!");
        }
    };

    const batatazo = () => { // Función especial Batatazo
        if (playerInGame[currentPlayerIndex] && !playerMidGame[currentPlayerIndex] && batatazoCooldown[currentPlayerIndex] === 0) {
            const updateBatatazo = [...batatazoOn];
            updateBatatazo[currentPlayerIndex] = true;
            setBatatazoOn(updateBatatazo);
            alert("El " + players[currentPlayerIndex] + " se prepara para tirar una batata!");
            setShowTargets(true);
        }
        if (batatazoCooldown[currentPlayerIndex] > 0) {
            alert(`${players[currentPlayerIndex]} debe esperar ${batatazoCooldown[currentPlayerIndex]} turnos para volver a usar el Batatazo.`);
        }
    };

    const handleCloseTargets = (player) => { // Función para cerrar el panel de selección de objetivos de Batatazo
        for (let i = 0; i < players.length; ++i) {
            if (players[i] === player) {
                setTarget(i);
                alert(`El ${players[currentPlayerIndex]} le tiró un batatazo al ${players[i]}.`);
                // Aplica los turnos de espera para que el jugador vuelva a utilizar Batatazo
                const updatePlayerBatatazoCooldown = [...batatazoCooldown];
                updatePlayerBatatazoCooldown[currentPlayerIndex] = 5;
                setBatatazoCooldown(updatePlayerBatatazoCooldown);
                break;
            }
        }
        setShowTargets(false);
    };

    return (
        <div className="game">
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirm}
            />
            {!isModalOpen && (
                <div className='game-container'>
                    {showTargets && (
                        <ObjectiveSelection 
                            possibleTargets={possibleTargets} 
                            showTargets={showTargets} 
                            onPlayerClick={handleCloseTargets}
                        />
                    )}
                    <HamburgerMenu players={players} totalScore={totalScore} />
                    <div className="dice-container">
                        {diceValues.map((value, index) => (
                            <Dice key={index} number={value} />
                        ))}
                    </div>
                    <div className='buttons-container'>
                        <div className='turn-buttons'>
                            <button className="roll-button" 
                                onClick={rollDice}
                                disabled={!rollCondition || gameOver || maximumPointsSupperpassed || pure}
                            >
                                Tirar los dados
                            </button>
                            <button className="end-turn-button" 
                                onClick={endTurn}
                                disabled={gameOver || forcedThrow}
                            >
                                Finalizar turno
                            </button>
                        </div>
                        <div className='special-buttons'>
                            <button className="batatear" 
                                onClick={batatear}
                                disabled={gameOver || maximumPointsSupperpassed || pure || !canBatatear}
                            >
                                Batatear
                            </button>
                            <button className="batata-de-la-fortuna" 
                                onClick={batataDeLaFortuna}
                                disabled={gameOver || forcedThrow || maximumPointsSupperpassed || pure}
                            >
                                Batata de la fortuna
                            </button>
                            <button className="batatazo" 
                                onClick={batatazo}
                                disabled={gameOver || forcedThrow || maximumPointsSupperpassed || pure || !canUseBatatazo}
                            >
                                Batatazo
                            </button>
                        </div>
                    </div>
                    <div className="player-points">
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