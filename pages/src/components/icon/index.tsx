import React from 'react'
import classNames from 'classnames'

import './index.scss'

export interface IconProps {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  style?: React.CSSProperties,
  type?: string
}

class Icon extends React.Component<IconProps, any> {
  static defaultProps = {
    cls: 'c-icon'
  }

  render() {
    const {
      className,
      onClick,
      style,
      type
    } = this.props
    const classString = classNames({
      [`c-icon`]: true,
      [`c-icon-${type}`]: Boolean(type),
      [`${className}`]: true
    })

    return (
      <i className={classString}
        style={style}
        onClick={onClick} >
        <svg aria-hidden="true">
          <use xlinkHref={`#icon-${type}`}></use>
        </svg >
      </i>
    )
  }
}

export default Icon
