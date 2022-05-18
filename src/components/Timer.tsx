import React, { FC, useEffect, useRef, useState } from 'react';

// Models
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
// Constants
import { PLAYER_TIME } from '../constants/general';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(PLAYER_TIME);
  const [whiteTime, setWhiteTime] = useState(PLAYER_TIME);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1);
  };

  const handleRestart = () => {
    setWhiteTime(PLAYER_TIME);
    setBlackTime(PLAYER_TIME);
    restart();
  };

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  );
};
