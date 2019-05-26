import React from 'react'
import logo from './logo.svg'
import './App.css'

// local
// components
import Main from './components/Main'
import SkipTyping from './components/SkipTyping'
import TypeBox from './components/TypeBox'
// data
import TypeBoxInfo from './data/TypeBoxInfo'

class App extends React.PureComponent {
  constructor(props) {
    super(props)

    this.welcomeInfo = [
      new TypeBoxInfo('Hey. =)', 200, 2000, 500),
      new TypeBoxInfo('This was left for you by Zach.', 100, 3000, 50),
    ]

    this.state = {
      welcomed: false,
    }
  }

  onTypingDone = () => {
    this.setState({ welcomed: true })
  }

  render() {
    const { welcomed } = this.state
    return (
      <div className="App">
        {/* welcome user */}
        {!welcomed && (
          <React.Fragment>
            {/* typing */}
            <TypeBox info={this.welcomeInfo} onDone={this.onTypingDone} />

            {/* skip typing */}
            <SkipTyping onMouseDown={this.onTypingDone} />
          </React.Fragment>
        )}

        {/* main */}
        {welcomed && <Main />}
      </div>
    )
  }
}

export default App
