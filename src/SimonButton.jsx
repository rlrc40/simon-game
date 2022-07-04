import React, { Component } from 'react';

class SimonButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: props.button.color,
            img: props.button.img,
            audio: props.button.audio,
            style: 'simon-button'
        }
    }

    pressButton() {
        // console.log(this.state.color, this.state.style);
        let style = this.state.style === 'simon-button' ? 'simon-button-pressed' : 'simon-button';
        this.setState({style});
    }

    playAudio () {
        let audio = new Audio(this.state.audio);
        audio.play();
    }

    render () {
        return (
            <div 
                className={this.state.style}
                style={{backgroundColor: this.state.color}}
                onMouseDown={() => this.pressButton() }
                onClick={() => this.playAudio()}
                onMouseUp={() => this.pressButton()}
            >
                <img alt={this.state.img} src={require(`./assets/images/${this.state.img}`)}/>
            </div>
        )
    }

}

export default SimonButton ;