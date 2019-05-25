import classNames from 'classnames'
import React from 'react'
import '../styles/typeBox.css'

const TYPING_STATE_BACKSPACE = 'TYPING_STATE_BACKSPACE'
const TYPING_STATE_IDLE = 'TYPING_STATE_IDLE'
const TYPING_STATE_TYPING = 'TYPING_STATE_TYPING'

class TypeBox extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      infoIndex: 0,
      renderedText: '',
      typingState: TYPING_STATE_IDLE,
    }
  }

  /**
   * Backspaces the current piece of information.
   * @method
   */
  backspace = () => {
    const { backSpeed } = this.currentInfo()

    this.setState({ typingState: TYPING_STATE_BACKSPACE })
    this.interval = setInterval(() => {
      const { renderedText } = this.state

      // backspace current text
      if (renderedText.length > 0) {
        this.setState({ renderedText: renderedText.slice(0, -1) })
      }
      // finish backspacing (move on to type next thing)
      else {
        clearInterval(this.interval)
        this.setState(({ infoIndex }) => ({
          infoIndex: infoIndex + 1,
          typingState: TYPING_STATE_IDLE,
        }))
        this.type()
      }
    }, backSpeed)
  }

  componentDidMount() {
    this.type()
  }

  /**
   * Gets the current information.
   * @method
   */
  currentInfo = () => {
    if (!this.isInfoAvailable()) return null

    const { info } = this.props
    const { infoIndex } = this.state
    return info[infoIndex]
  }

  done = () => {
    const { onDone } = this.props
    typeof onDone === 'function' && onDone()
  }

  /**
   * Determines whether or not information is available.
   * @method
   */
  isInfoAvailable = () => {
    const { infoIndex } = this.state
    const { info } = this.props
    return Array.isArray(info) && info.length > 0 && infoIndex < info.length
  }

  /**
   * Types out the current piece of information.
   * @method
   */
  type = () => {
    // look for next piece of information to type
    if (this.isInfoAvailable()) {
      // setup typing interval
      const { forwardSpeed: typingSpeed, text: targetText } = this.currentInfo()

      this.setState({ typingState: TYPING_STATE_TYPING })
      this.interval = setInterval(() => {
        const { renderedText } = this.state

        // set new text, and clear interval if done typing
        let newText = renderedText + targetText[renderedText.length]
        this.setState({ renderedText: newText })

        // clear interval if done
        if (newText.length === targetText.length) {
          clearInterval(this.interval)
          this.waitAfterInfoTyped()
        }
      }, typingSpeed)
    }
    // typing finished
    else this.done()
  }

  /**
   * Waits the specified idle time after a piece of text is typed.
   * @method
   */
  waitAfterInfoTyped = () => {
    const { waitAfterDone } = this.currentInfo()

    // setup wait
    this.setState({ typingState: TYPING_STATE_IDLE })
    setTimeout(() => {
      this.backspace()
    }, waitAfterDone)
  }

  render() {
    const { renderedText, typingState } = this.state

    const cursorClasses = classNames({
      blinkingCursorBack: typingState === TYPING_STATE_BACKSPACE,
      blinkingCursorTyping: typingState === TYPING_STATE_TYPING,
    })
    return (
      <div className="typeBox">
        <div>
          <span>{renderedText}</span>
          <span id="blinkingCursor" className={cursorClasses}>
            &nbsp;
          </span>
        </div>
      </div>
    )
  }
}

export default TypeBox
