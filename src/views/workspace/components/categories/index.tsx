import React from 'react';
import classNames from 'classnames';

import Icon from '@/components/icon';

import './index.scss';

export interface CategoriesProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}

class Categories extends React.Component<CategoriesProps> {
  static defaultProps = {
    className: 'c-tpl'
  };

  state = {
    categories: [
      {
        id: 0,
        icon: 'dashboard',
        name: 'JavaScript'
      },
      {
        id: 1,
        icon: 'experiment',
        name: 'CSS'
      },
      {
        id: 2,
        icon: 'android',
        name: 'WebGL'
      },
      {
        id: 3,
        icon: 'android',
        name: 'PHP'
      },
      {
        id: 4,
        icon: 'android',
        name: 'Python'
      },
      {
        id: 5,
        icon: 'android',
        name: 'Go'
      },
      {
        id: 6,
        icon: 'android',
        name: 'NodeJS'
      },
      {
        id: 7,
        icon: 'android',
        name: 'Electron'
      }
    ]
  };

  render() {
    const { className, onClick, style } = this.props;
    const classString = classNames({
      [`workspace-sidebar`]: true,
      [`${className}`]: true
    });

    return (
      <aside className={classString} style={style} onClick={onClick}>
        <header className="workspace-sidebar__header">HHH</header>
        <div className="workspace-sidebar__body">
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
        </div>
        <footer className="workspace-sidebar__footer">FFFF</footer>
      </aside>
    );
  }
}

export default Categories;
