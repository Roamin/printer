import React from 'react'
import classNames from 'classnames'

import './index.scss'

export interface LayoutProps {
  className?: string
  style?: React.CSSProperties
}

class Layout extends React.Component<LayoutProps> {
  static defaultProps = {
    className: 'c-layout'
  }

  constructor(props: LayoutProps) {
    super(props)
  }

  render() {
    const { className, style } = this.props
    const classString = classNames({
      [`c-layout`]: true,
      [`${className}`]: true
    })

    return (
      <div className={classString} style={style}>
        <div className="c-layout__content" />
      </div>
    )
  }
}

export default Layout
