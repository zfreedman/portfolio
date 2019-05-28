import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'

import '../styles/main.css'

import ComponentBar from './ComponentBar'
import MathGame from '../views/MathGame'
import Splash from '../views/Splash'
import TopBar from '../components/TopBar'

class Main extends React.PureComponent {
  constructor(props) {
    super(props)

    this.components = [
      { Component: Splash, label: 'Home', path: '/' },
      { Component: MathGame, label: 'Math Game', path: '/math/' },
    ]
  }
  render() {
    return (
      <div id="main">
        <TopBar />
        <Router>
          <ComponentBar components={this.components} />

          <div className="mainContent">
            {this.components.map(({ Component, label, path }) => (
              <Route
                component={Component}
                exact={path === '/'}
                key={label}
                path={path}
              />
            ))}
          </div>
        </Router>
      </div>
    )
  }
}

export default Main
