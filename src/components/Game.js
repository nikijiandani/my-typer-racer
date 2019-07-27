import React, { useState, useRef } from 'react';
import '../styles/game.css'

function Game(props) {
  let timer = useRef(10)
  let [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [inputWord, setInputWord] = useState("");

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);
  }

  const newWord = () => {
    let randomWord = Math.floor(Math.random() * props.words.length)
    setTargetWord(props.words[randomWord])
  }

  const newGame = () => {
    // console.log(props.words)
    newWord()
    startTimer()
  }

  const restartGame = () => {
    window.location.reload()
  }

  const stopTimer = () => {
    clearInterval(timer.current)
  }

  const onChange = (e) => {
    setInputWord(e.target.value)
  }

  const onKeyPress = (e) => {
    if(e.key === "Enter") {
      if(e.target.value.toLowerCase() === targetWord){
        setScore(score + 1)
        setInputWord("")
        newWord()
      }
    }
  }

  if(time <= 0) stopTimer()

  return (
    <>
    <div className="game">{targetWord === "" ? (
      <div>
        <p>Click on New Game to begin</p>
        <button onClick={newGame}>New Game</button>
      </div>
      ):(
      <div>
        {time <= 0 ? (
          <div>
            <p><strong>Game Over!!!</strong></p>
            <p>Your Score: {score}</p>
            <button onClick={restartGame}>Replay?</button>
          </div>
          ) : (
          <div>
            <p>Time left: {time} s</p>
            <p>Score: {score}</p>
            <p><span>Type this: </span><br /> {targetWord}</p>
            <input type="text" onChange={onChange} onKeyPress={onKeyPress} value={inputWord}/><br/>
          </div>
        )}
      </div>)}
    </div>
  </>
  )
}

export default Game