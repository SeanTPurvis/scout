import React, { Component } from 'react';
import './App.css';
import WebcamCapture from 'Components/Webcam'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <WebcamCapture/>
        </header>
      </div>
    );
  }
}

export default App;
