import React from 'react'

import '../styles/main.css'

import MathGame from '../views/MathGame'

export default class Main extends React.PureComponent {
  render() {
    return (
      <div id="main">
        <MathGame />
      </div>
    )
  }
}
