import React from 'react'

interface Props{
    timerInterval: number;
    changeInterval: () => void;
    selected: boolean;
}

const IntervalButton: React.FC<Props> = ({ timerInterval, changeInterval, selected }) => {
  return (
    <button className={`interval-btn large-btn ${selected ? `selected` : ``}`} onClick={changeInterval}>{timerInterval}</button>
  )
}

export default IntervalButton