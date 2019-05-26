// react
import classNames from 'classnames'
import React from 'react'

// styles
import '../styles/math.css'

/**
 * Determines whether or not the test is the last for the given level. Here,
 * this method expects to be called AFTER the last test has been passed, meaning
 * the last test should have already been finished.
 * @method
 * @param {number} test test number
 * @param {number} level level number
 * @returns {boolean} has the level been completed
 */
const isLastTest = (test, level) => test > level

/**
 * Renders a simple math game.
 */
export default class MathGame extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      correct: false,
      input: '',
      left: 0,
      level: 0,
      test: 0,
      right: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('animationend', this.onAnimationEnd)
  }

  /**
   * Keydown listener, which is used to update the user's answer for numeric or
   * delete presses.
   * @method
   * @param {Object} event native JS keydown event
   */
  keydown = ({ key }) => {
    const { correct } = this.state
    if (correct) return

    let { input } = this.state
    if (key === 'Backspace' || key === 'Delete') {
      input = input.slice(0, -1) || ''
    } else if (!isNaN(+key)) input += +key

    const { left, right } = this.state
    const stateUpdate = {
      correct: input.length > 0 && left + right === +input,
      input,
    }
    this.setState(stateUpdate)
  }

  /**
   * Animation end handler used to detect when the "correct" animation is
   * finished.
   * @method
   * @param {Object} event native JS animationend event
   */
  onAnimationEnd = ({ animationName }) => {
    if (animationName === 'mathCorrect') this.passTest()
  }

  /**
   * Passes the current level.
   * @method
   */
  passLevel = () => {
    const level = this.state.level + 1
    const left = Math.round(Math.random() * level)
    const right = Math.round(Math.random() * level)
    this.setState({ left, level, right, test: 0 })
  }
  /**
   * Passes the current test.
   * @method
   */
  passTest = () => {
    const { level } = this.state
    let { test } = this.state
    test = this.state.test + 1

    const left = Math.round(Math.random() * level)
    const right = Math.round(Math.random() * level)

    this.setState({ correct: false, input: '', left, right, test })
    if (isLastTest(test, level)) this.passLevel()
  }

  render() {
    const { correct, input, left, level, right, test } = this.state

    const inputClasses = classNames('mathInput', 'mathOperand', {
      mathCorrect: correct,
    })
    const levelClasses = classNames({
      mathLevelUp: isLastTest(test, level),
    })

    const trueLevel = level + 1
    const trueTest = test + 1

    return (
      <div id="math">
        {/* equation */}
        <div>
          <div className="equation">
            <span className="mathOperand">{left}</span>
            <span className="mathOperator">+</span>
            <span className="mathOperand">{right}</span>
            <span className="mathOperator mathEquals">=</span>
            <span className={inputClasses}>{input}</span>
          </div>
        </div>

        {/* scoreboard */}
        <div id="mathScoreboard">
          <div>
            Level <span className={levelClasses}>{trueLevel}</span>
          </div>
          <div>Test {`${trueTest} / ${trueLevel}`}</div>
        </div>
      </div>
    )
  }
}
