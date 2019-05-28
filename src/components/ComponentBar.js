import classNames from 'classnames'
import { Link } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router'

class ComponentBar extends React.PureComponent {
  render() {
    const {
      components,
      location: { pathname: activePath },
    } = this.props
    return (
      <div className="componentBar">
        {components.map(({ label, path }) => {
          const routeClasses = classNames({
            componentActive: activePath === path,
          })

          return (
            // <div className={routeClasses} key={label}>
            <Link className={routeClasses} key={label} to={path}>
              {label}
            </Link>
            // </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(ComponentBar)
