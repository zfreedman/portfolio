import classNames from 'classnames'
import React from 'react'

import face from '../images/IMG_4252.jpg'
import '../styles/splash.css'

export default class Splash extends React.PureComponent {
  constructor(props) {
    super(props)

    this.info = [
      {
        text: `My name is Zach Freedman and I'm a software engineer living in San Francisco.`,
      },
      {
        text: `I built this website to showcase a small amount of my engineering ability, but it's a work in progress. I'm currently working on adding more content, and then I'll be moving onto handling mobile access.`,
      },
      {
        text: `I enjoy creating engaging and responsive UI/UX, visualizing data stories, and making entertaining software. Please checkout some of the things in the bar above to see what a little bit of code can do =).`,
      },
      { classes: 'splashInfoRight', text: `Have fun.` },
      // { classes: 'splashInfoRight', text: `Zach` },
    ]
  }
  render() {
    const { info } = this
    return (
      <div className="splash">
        <img src={face} />

        <div className="splashInfo">
          {info.map((section, i) => {
            const { classes, text } = section
            const appliedClasses = classNames({
              [classes]: classes !== undefined,
            })
            return <p className={appliedClasses}>{text}</p>
          })}
        </div>
      </div>
    )
  }
}
