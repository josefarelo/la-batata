import React from 'react';
import '../styles/GameRules.scss';

const GameRules = () => {

    return (
        <div className='game-rules'>
            <h2>Cómo jugar:</h2>
            <ul>
                <li>Cada jugador tirará los 6 dados y sumará los puntos obtenidos en esa ronda.</li>
                <li>En su primer turno, cada jugador tendrá un solo tiro y deberá conseguir 700 puntos o más para ingresar al juego.</li>
                <li>Una vez que un jugador ingrese al juego, su nombre se añadirá a la lista de jugadores y su puntaje total será igual al conseguido en ese turno. El turno concluirá después del ingreso.</li>
                <li>Los jugadores que aún no hayan ingresado seguirán tirando los dados en sus turnos para intentar ingresar al juego. Los jugadores ingresados continuarán sumando puntos.</li>
            </ul>

            <h3>Desarrollo del juego:</h3>
            <ul>
                <li>El jugador tirará los dados y los puntos obtenidos en ese turno se sumarán a su puntaje total. Si todos los dados lanzados en ese turno sumaron puntos, el jugador tendrá que lanzar los dados nuevamente.</li>
                <li><strong>Puré:</strong> Después de tirar los dados y contar los puntos, el jugador puede decidir si continuará tirando los dados. Si decide seguir, solo podrá lanzar los dados que no hayan sumado puntos en esa ronda.</li>
                <li>Si al tirar nuevamente no obtiene puntos, el puntaje de esa ronda se perderá y su turno terminará. Esto se denomina “hacerse puré”.</li>
            </ul>

            <h3>Funciones especiales que podrá usar cada jugador:</h3>
            <ul>
                <li><strong>Batata de la Fortuna:</strong> El jugador perderá sus dos próximos turnos, pero cuando vuelva a jugar, la puntuación obtenida valdrá el doble. Esta función es válida hasta que el jugador llegue a los 5000 puntos y se deberá esperar dos turnos más para volver a utilizarla.</li>
                <li><strong>Batatear:</strong> Se lanzarán los dados y sus caras se girarán al reverso. (1 a 6, 2 a 5, 3 a 4, 4 a 3, 5 a 2, 6 a 1). Esta función puede utilizarse una vez por turno.</li>
                <li><strong>Batatazo:</strong> El jugador elegirá a otro participante en juego, lanzará los dados y el puntaje obtenido se restará del puntaje del jugador elegido. Esta función es válida para jugadores con más de 5000 puntos y solo puede usarse una vez cada dos turnos.</li>
            </ul>

            <h3>Función especial del juego:</h3>
            <ul>
                <li><strong>Batata caliente:</strong> Una vez que todos los jugadores hayan ingresado al juego, cada cinco rondas, todos los jugadores lanzarán un dado. Aquellos que saquen un número impar perderán 1000 puntos de su puntaje total.</li>
            </ul>

            <h2>Cómo ganar:</h2>
            <ul>
                <li>Para ganar, un jugador debe llegar exactamente a 10,000 puntos.</li>
                <li>Si la suma de los puntos de su turno hace que su puntaje total supere los 10,000 puntos, no obtendrá puntos ese turno y sumará 0.
                    <ul>
                        <li>Ejemplo: Si el puntaje total del jugador es 8500 puntos y obtiene 2000 puntos en su turno, su nuevo puntaje será 8500 + 0 = 8500 puntos.</li>
                    </ul>
                </li>
                <li>Si la suma de los puntos de su turno es exactamente 10,000 puntos, el jugador ganará el juego.
                    <ul>
                        <li>Ejemplo: Si el puntaje total del jugador es 8500 puntos y obtiene 1500 puntos en su turno, su nuevo puntaje será 8500 + 1500 = 10,000 puntos.</li>
                    </ul>
                </li>
            </ul>

            <h2>Puntajes:</h2>
            <h3>Dados individuales (número):</h3>
            <ul>
                <li>1 = 100 puntos</li>
                <li>5 = 50 puntos</li>
                <li>2, 3, 4 y 6 = 0 puntos</li>
            </ul>

            <h3>Tres dados iguales:</h3>
            <ul>
                <li>1 = 1000 puntos</li>
                <li>2 = 200 puntos</li>
                <li>3 = 300 puntos</li>
                <li>4 = 400 puntos</li>
                <li>5 = 500 puntos</li>
                <li>6 = 600 puntos</li>
            </ul>

            <h3>Cuatro dados iguales:</h3>
            <ul>
                <li>1 = 2000 puntos</li>
                <li>2 = 400 puntos</li>
                <li>3 = 600 puntos</li>
                <li>4 = 800 puntos</li>
                <li>5 = 1000 puntos</li>
                <li>6 = 1200 puntos</li>
            </ul>

            <h3>Cinco dados iguales:</h3>
            <ul>
                <li>1 = 4000 puntos</li>
                <li>2 = 800 puntos</li>
                <li>3 = 1200 puntos</li>
                <li>4 = 1600 puntos</li>
                <li>5 = 2000 puntos</li>
                <li>6 = 2400 puntos</li>
            </ul>

            <h3>Seis dados iguales:</h3>
            <ul>
                <li>1 = 6000 puntos</li>
                <li>2 = 1200 puntos</li>
                <li>3 = 1800 puntos</li>
                <li>4 = 2400 puntos</li>
                <li>5 = 3000 puntos</li>
                <li>6 = 3600 puntos</li>
            </ul>

            <h3>Escalera:</h3>
            <ul>
                <li>1-2-3-4-5-6 = 2000 puntos</li>
                <li>1-2-3-4-5 = 1500 puntos</li>
                <li>2-3-4-5-6 = 1500 puntos</li>
            </ul>

            <h3>Tres pares de dados:</h3>
            <ul>
                <li>1500 puntos</li>
                <li>Ejemplo: 2-2, 4-4, 1-1</li>
            </ul>
        </div>
    );
};

export default GameRules;