import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      time: 0,
      targetWord: "",
      inputWord: "",
      score: 0,
      words: []
    }
  }

  componentDidMount(){
    fetch('').then(result => {
      return result.json()
    })
    .then(body => {
      console.log(body)
      this.setState({
        words: body
      })
    })
  }

  startTimer = () => {
    this.timer = setInterval(
      () => this.setState(prevState => ({ time: prevState.time - 1 })),
      1000
    )
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.setState({
      time: 0
    })
  }

  newGame = () => {
    this.stopTimer()
    this.startTimer()
    this.newWord()
    this.setState({
      time: 10
    })
    if(this.state.time === 0){
      this.gameOver()
    }
  }

  newWord = () => {
    let randomWord = Math.floor(Math.random() * this.state.words.length)
    this.setState({
      targetWord: this.state.words[randomWord]
    })
  }

  gameOver = () => {
    this.stopTimer()
  }

  onChange = (e) => {
    this.setState({
      inputWord: e.target.value
    })
  }

  onKeyPress = (e) => {
    if(e.key === "Enter") {
      if(e.target.value === this.state.targetWord){
        this.setState(prevState => ({
          score: prevState.score + 1,
        }))
        e.target.value = ""
        this.newWord()
      }
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo"/>
          <h1>My Type Racer</h1>
        </header>
        <p>Timer: {this.state.time}</p>
        <p>Score: {this.state.score}</p>
        <div>{this.state.targetWord === "" ? (
          <div>
            <p>Click on New Game to begin</p>
            <button onClick={this.newGame}>New Game</button>
          </div>
        ): (
          <div>
            <p><span>Type this: </span><br /> {this.state.targetWord}</p>
            <input type="text" onChange={this.onChange} onKeyPress={this.onKeyPress}/><br/>
          </div>
        )}</div>
      </div>
    );
  }
}

export default App;
