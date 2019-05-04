import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames'

import Icon from '@/components/icon'

import './index.scss'

export interface SidebarProps {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  style?: React.CSSProperties,
  location: any
}

class Sidebar extends React.Component<SidebarProps> {
  static defaultProps = {
    className: 'c-tpl'
  }

  state = {
    navigates: [
      {
        path: '/',
        name: 'Workspace',
        icon: 'experiment',
        exact: true
      },
      {
        path: '/setting',
        name: 'Setting',
        icon: 'setting'
      }
    ]

  }

  render() {
    const {
      className,
      onClick,
      style
    } = this.props
    const classString = classNames({
      [`c-sidebar`]: true,
      [`${className}`]: true
    })

    return (
      <aside className={classString}
        style={style}
        onClick={onClick}>
        <header>
          <Icon className="icon" type='search' style={{ color: '#fff' }} />
        </header>
        <ul className="c-sidebar__navigator">
          {this.state.navigates.map((navigate, index) =>
            <nav className={this.props.location.pathname === navigate.path ? 'active' : ''} key={index}>
              <Link to={navigate.path}>
                <Icon className="c-sidebar__navigator-icon" type={navigate.icon} />
              </Link>
            </nav>
          )}
        </ul>
        <footer>
          <Icon className="icon" type='github' style={{ color: '#fff' }} />
        </footer>
      </aside>
    )
  }
}

export default withRouter(Sidebar as any)
