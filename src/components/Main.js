import React from 'react';
import useFetch from './useFetch';
import Game from './Game'

function Main() {
  let myKey = process.env.REACT_APP_API_KEY
  const words = useFetch(`https://random-word-api.herokuapp.com/word?key=${myKey}&number=100`)

  return (
    <Game words={words} />
  )
}

export default Main;
