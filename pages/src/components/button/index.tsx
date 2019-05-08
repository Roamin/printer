import React from 'react'
import classNames from 'classnames'

import Icon from '../icon'

import './index.scss'

export interface ButtonProps {
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  icon?: string
}

class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    className: 'c-button'
  }

  render() {
    const { className, onClick, style, icon } = this.props
    const classString = classNames({
      [`c-button`]: true,
      [`${className}`]: true
    })

    return (
      <button className={classString} style={style} onClick={onClick}>
        {icon && <Icon type={icon} />}
        {this.props.children}
      </button>
    )
  }
}

export default Button
