import { useState, useEffect } from 'react';
import IntervalButton from './IntervalButton';

function Timer() {

    // This can be reduced more, touch on it later.
    const twentyFiveMinutes: number = (25 * 60 * 1000);
    const fiveMinutes: number = (5 * 60 * 1000);
    const fifteenMinutes: number = (15 * 60 * 1000);
    
    const [isRunning, setIsRunning] = useState(false);
    const [currentInterval, setCurrentInterval] = useState(twentyFiveMinutes)
    const [time, setTime] = useState(new Date(currentInterval));

    const resetTimer = () => {
        setTime(new Date(currentInterval));
        setIsRunning(false);
    }

    const flipRunning = () => {
        if(time.getTime() !== 0){
            setIsRunning(!isRunning);
        }
    }

    const setTimerInterval = (chosenInterval: number) => {
        setIsRunning(false)
        setCurrentInterval(chosenInterval)
        setTime(new Date(chosenInterval))
    }

    // interval decrease function for the timer
    useEffect(() => {
        if(isRunning){
            const interval = setInterval(() => {
                setTime(prevTime => new Date(prevTime.getTime() - 1000));
            }, 1000);
        
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    // Checking for the timer to hit 0
    useEffect(() => {
        if(time.getTime() === 0){
            setIsRunning(false);
        }
    }, [time]);

    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

  return (
    <div className="timer-container">
        <div className="interval-btns-container"> 
            <IntervalButton timerInterval={5} changeInterval={() => setTimerInterval(fiveMinutes)} selected={currentInterval === fiveMinutes}/>
            <IntervalButton timerInterval={15} changeInterval={() => setTimerInterval(fifteenMinutes)} selected={currentInterval === fifteenMinutes}/>
            <IntervalButton timerInterval={25} changeInterval={() => setTimerInterval(twentyFiveMinutes)} selected={currentInterval === twentyFiveMinutes}/>
        </div>
        <div className="countdown">
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="timer-btn-container">
            <button className="timer-btn large-btn" id="reset-btn" onClick={resetTimer}>RESET</button>
            <button className={`timer-btn large-btn ${isRunning ? `running` : ``}`} id="play-btn" onClick={flipRunning}>{isRunning ? 'PAUSE' : 'PLAY'}</button>
        </div>
    </div>
  );
}

export default Timer