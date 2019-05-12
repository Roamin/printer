import React from 'react'
import classNames from 'classnames'

import './index.scss'

export interface GroupProps {
  className?: string
  style?: React.CSSProperties
}

class Group extends React.Component<GroupProps> {
  static defaultProps = {
    className: 'c-group'
  }

  constructor(props: GroupProps) {
    super(props)
  }

  render() {
    const { className, style } = this.props
    const classString = classNames({
      [`c-group`]: true,
      [`${className}`]: true
    })

    return (
      <section className={classString} style={style}>
        <header>H</header>
        <footer>F</footer>
      </section>
    )
  }
}

export default Group
