import React from 'react'
import classNames from 'classnames'

import './index.scss'

export interface TplProps {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  style?: React.CSSProperties
}

class Tpl extends React.Component<TplProps> {
  static defaultProps = {
    className: 'c-tpl'
  }

  constructor(props: TplProps) {
    super(props)
  }

  render() {
    const {
      className,
      onClick,
      style
    } = this.props
    const classString = classNames({
      [`c-icon`]: true,
      [`${className}`]: true
    })

    return (
      <div className={classString}
        style={style}
        onClick={onClick} >
      </div>
    )
  }
}

export default Tpl
