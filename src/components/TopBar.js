import React from 'react'

import '../styles/topBar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class TopBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      linkData: [
        {
          icon: ['fab', 'linkedin'],
          link: 'https://www.linkedin.com/in/zach-freedman/',
          tooltip: 'LinkedIn',
        },
        {
          icon: ['fab', 'github-square'],
          link: 'https://github.com/zfreedman',
          tooltip: 'GitHub',
        },
        {
          icon: 'laptop-code',
          link: 'https://www.udemy.com/user/5539ab2518198/',
          tooltip: 'Udemy',
        },
      ],
    }
  }
  render() {
    const { linkData } = this.state
    return (
      <div className="topBar">
        <div className="links">
          {linkData.map((item, i) => {
            const { icon, link, tooltip } = item
            return (
              <div key={i}>
                <a href={link} target="_blank" title={tooltip}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
