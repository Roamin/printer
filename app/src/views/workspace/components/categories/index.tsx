import React from 'react'
import classNames from 'classnames'

import fetch from 'utils/fetch'

import Button from 'components/button'
import Icon from 'components/icon'

import './index.scss'

export interface CategoriesProps {
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
}

class Categories extends React.Component<CategoriesProps> {
  static defaultProps = {
    className: 'c-tpl'
  }

  state = {
    categories: [
      {
        id: 0,
        icon: 'folder',
        name: 'JavaScript'
      },
      {
        id: 1,
        icon: 'folder',
        name: 'CSS'
      },
      {
        id: 2,
        icon: 'folder',
        name: 'WebGL'
      },
      {
        id: 3,
        icon: 'folder',
        name: 'PHP'
      },
      {
        id: 4,
        icon: 'folder',
        name: 'Python'
      },
      {
        id: 5,
        icon: 'folder',
        name: 'Go'
      },
      {
        id: 6,
        icon: 'folder',
        name: 'NodeJS'
      },
      {
        id: 7,
        icon: 'folder',
        name: 'Electron'
      }
    ]
  }

  sync() {
    fetch('syncAccount').then(data => {
      console.log(JSON.stringify(data, null, 4))
    })
  }

  render() {
    const { className, onClick, style } = this.props
    const classString = classNames({
      [`workspace-sidebar`]: true,
      [`${className}`]: true
    })

    return (
      <aside className={classString} style={style} onClick={onClick}>
        <header className="workspace-sidebar__header">
          <div className="user">
            <div className="user__avatar" />
            <div className="user__username">
              VinciVinciVinciVinciVinciVinciVinciVinci
            </div>
          </div>
        </header>
        <div className="workspace-sidebar__body">
          <section className="group">
            <header className="group__header">
              <h4 className="title">Categories</h4>
              <Icon className="icon icon-add" type="add" />
            </header>
            <ul className="categories">
              {this.state.categories.map((category, index) =>
                <li
                  className={`category ${category.id === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <Icon className="category-icon" type={category.icon} />
                  <span className="category-name">
                    {category.name}
                  </span>
                </li>
              )}
            </ul>
          </section>
        </div>
        <footer className="workspace-sidebar__footer">
          <Button className="sync-setting" icon="sync" onClick={this.sync} />
          <Button className="btn-setting" icon="setting" />
        </footer>
      </aside>
    )
  }
}

export default Categories
