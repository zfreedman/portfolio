import React from 'react'
import '../styles/skipTyping.css'

export default class SkipTyping extends React.PureComponent {
  onMouseDown = () => this.props.onMouseDown()

  render() {
    return <div id="skipTyping" onMouseDown={this.onMouseDown} />
  }
}
