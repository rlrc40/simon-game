import React, { Component } from 'react';
import './App.css';
import SimonButton from './SimonButton.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttons: [
        {
          element: 'btn_0',
          color: 'red',
          audio: 'https://sound.peal.io/ps/audios/000/003/334/original/youtube.mp3?1503053595',
          img: 'http://image.ibb.co/mL4qcG/pickle_rick.png'
        },
        {
          element: 'btn_1',
          color: 'blue',
          audio: 'https://sound.peal.io/ps/audios/000/000/536/original/Awww_Bitch.wav?1469744431',
          img: 'http://image.ibb.co/djsbHG/Scary_Terry.png'
        },
        {
          element: 'btn_2',
          color: 'green',
          audio: 'https://sound.peal.io/ps/audios/000/000/553/original/oh_man.wav?1469744452',
          img: 'http://preview.ibb.co/iT4OxG/Morty.png'
        },
        {
          element: 'btn_3',
          color: 'yellow',
          audio: "https://sound.peal.io/ps/audios/000/000/548/original/Hi_I'm_mr_meeseeks_look_at_me.wav?1469744301",
          img: 'http://preview.ibb.co/kHnXrb/meeseeks.png'
        }
      ],
      gameState: 'off',
      clickFlow: [],
      clickFlowPlayer: [],
      level: 0,
      boardState: 'board-game-off',
      solved: false
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    console.log(this.state.clickFlow);
  }

  setGameState() {
    let gameState = this.state.gameState === 'on' ? 'off' : 'on';
    if(this.state.gameState === 'off'){
      this.startGame();
    } else {
      this.stopGame();
    }
    this.setState({gameState});
  }

  startGame(){
    this.randomClickFlow();
    this.randomPress();
  }

  stopGame(){
    this.setState({boardState: 'board-game-off'});
    this.setState({level: 0}); 
    this.setState({clickFlow: []}); 
    this.setState({clickFlowPlayer: []});  
    this.changeColorSlide('white');
    this.setState({solved: false});
  }

  restartGame(){
    this.stopGame();
    const that = this;
    setTimeout(function() {
      that.startGame();   
    }, 500);
  }

  randomClickFlow(){
    let clickFlow = this.state.clickFlow.slice();
    let randomNumber = Math.floor((Math.random() * 4));
    clickFlow.push(randomNumber);
    this.setState({clickFlow});
    this.setState({clickFlowPlayer: clickFlow});
  }

  randomPress() {
    this.setState({boardState: 'board-game-off'});
    const that = this;
    var i = 0;

    myLoop();

    function myLoop () {
      setTimeout(function () {
        let clickFlow = that.state.clickFlow.slice();
        if(clickFlow.length > 0){
          that.pressButton(clickFlow[i]);
        }
        i++; 
        if (i <= that.state.level && that.state.gameState === 'on') {
          myLoop();
        } else if (that.state.gameState === 'on') {
          setTimeout(function() {
            that.setState({boardState: 'board-game-on'});
          }, 2000);
        }
      }, 2000);
    }
  }

  pressButton(i){
    this.state.buttons[i].element.pressButton();
    this.state.buttons[i].element.playAudio();

    let k = i;
    let that = this;
    setTimeout(function() {
      that.state.buttons[k].element.pressButton();
    }, 500);

  }

  clickColor(idBtn, btn) {
    let clickFlowPlayer = this.state.clickFlowPlayer.slice();
    let that = this;

    if(clickFlowPlayer[0] === idBtn){
      clickFlowPlayer.shift();
      that.setState({clickFlowPlayer});
      that.changeColorSlide('green');
    } else {
      that.setState({boardState: 'board-game-off'});
      that.changeColorSlide('red');
      setTimeout(function() {
        that.changeColorSlide('white'); 
        that.randomPress();     
      }, 500);
    }

    if(clickFlowPlayer.length === 0){
      that.setState({boardState: 'board-game-off'});
      setTimeout(function() {
        that.changeColorSlide('white');
        that.setState({level: that.state.level + 1});
        if (that.state.level === 20) {
          that.setState({solved: true});
        } else{
          that.randomClickFlow();
          that.randomPress(); 
        }     
      }, 500);
    } 
  }

  changeColorSlide(color){
    // New style tag
    var style = document.createElement("style");
    document.head.appendChild(style);
    var sheet = style.sheet;
    sheet.addRule('.slider:before','background-color:' + color);
    if(color === 'red'){
      sheet.addRule('.switch','animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both');
    } else {
      sheet.addRule('.switch','animation: none');
    }
  }

  render() {
    const buttons = this.state.buttons;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title noselect">Rick & Morty Simon Game</h1>
          <div>
            <label className="switch" >
              <input type="checkbox"
                onChange={() => this.setGameState()} />
              <span className="slider round" ></span>
            <span className="level noselect">{this.state.level}</span>
            </label>
          </div>
        </header>
        <div className={this.state.boardState}>
          {
            buttons.map((button, b) => {
              return (
                <div 
                  key={b}
                  className="bttn"
                  onClick={() => this.clickColor(b, button)}
                  >
                  <SimonButton 
                    button = {this.state.buttons[b]} 
                    ref={(simonButton) => { this.state.buttons[b].element = simonButton }} 
                  />
                </div>
              )
            })
          }
        </div>
        <div className="win-message" 
        style={{display: this.state.solved === true ? 'flex' : 'none'}} >
          <p className="noselect">Has completado el nivel 20</p>
          <div className="restart noselect"
            onClick = {() => this.restartGame()}>
            <p>RESTART GAME</p>
          </div>
        </div>
      </div>
    );   
  }
}

export default App;