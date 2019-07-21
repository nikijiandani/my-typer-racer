import React from 'react';
import './App.css';
import Header from './components/Header'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      time: 10,
      targetWord: "",
      inputWord: "",
      score: 0,
      words: []
    }
    this.timer = 0
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
    this.timer = setInterval(() => {
      let time = this.state.time
      if(time === 0){
        return this.stopTimer();
      }
      this.setState(
        prevState => ({ time: prevState.time - 1 })
      )
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  newGame = () => {
    this.stopTimer()
    this.startTimer()
    this.newWord()
    this.setState({
      time: 10
    })
  }

  newWord = () => {
    let randomWord = Math.floor(Math.random() * this.state.words.length)
    this.setState({
      targetWord: this.state.words[randomWord]
    })
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
        <Header />
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
