import React from 'react'
import classNames from 'classnames'

import Icon from '@/components/icon'

import './index.scss'

export interface CategoriesProps {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
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
        icon: 'dashboard',
        name: 'Dashboard'
      },
      {
        id: 1,
        icon: 'experiment',
        name: 'Experiment'
      },
      {
        id: 2,
        icon: 'android',
        name: 'Android'
      },
      {
        id: 3,
        icon: 'apple',
        name: 'Apple'
      },
      {
        id: 4,
        icon: 'windows',
        name: 'Windows'
      },
      {
        id: 5,
        icon: 'chrome',
        name: 'Chrome'
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
      [`workspace__categories`]: true,
      [`${className}`]: true
    })

    return (
      <div className={classString}
        style={style}
        onClick={onClick} >
        <ul className="categories">
          {
            this.state.categories.map((category, index) =>
              <li className={`category ${category.id === 1 ? 'active' : ''}`} key={index}>
                <Icon className="category-icon" type={category.icon} />
                <span className="category-name">{category.name}</span>
              </li>
            )}

        </ul>
      </div>
    )
  }
}

export default Categories
