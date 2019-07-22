import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

function Main() {
  let timer = 0
  const words = useFetch("")
  let [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [inputWord, setInputWord] = useState("");

  const newGame = () => {
    newWord()
    startTimer()
  }

  const startTimer = () => {
    timer = setInterval(() => {
      if(!time){
        return stopTimer()
      }
      setTime(time => time - 1);
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(timer)
  }

  const newWord = () => {
    let randomWord = Math.floor(Math.random() * words.length)
    setTargetWord(words[randomWord])
  }

  const onChange = (e) => {
    setInputWord(e.target.value)
  }

  const onKeyPress = (e) => {
    if(e.key === "Enter") {
      if(e.target.value === targetWord){
        setScore(score + 1)
        e.target.value = ""
        newWord()
      }
    }
  }

  return (
    <>
      <div>{targetWord === "" ? (
        <div>
          <p>Click on New Game to begin</p>
          <button onClick={newGame}>New Game</button>
        </div>
        ):(
        <div>
          <p>Time left: {time} s</p>
          <p>Score: {score}</p>
          <p><span>Type this: </span><br /> {targetWord}</p>
          <input type="text" onChange={onChange} onKeyPress={onKeyPress}/><br/>
        </div>)}
      </div>
    </>
  )
}

export default Main;
