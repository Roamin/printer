import React from 'react'
import classnames from 'classnames'

import './index.scss'

export interface TabsProps {
  className?: string
  style?: React.CSSProperties
  defaultActiveKey?: string
  activeKey?: string
  onChange?: (key: string) => void
}

export interface TabsState {
  activeKey: string
}

class Tabs extends React.Component<TabsProps, TabsState> {
  defaultProps = {
    className: 'c-tabs',
    defaultActiveKey: '1'
  }

  constructor(props: TabsProps) {
    super(props)

    this.state = {
      activeKey:
        props.activeKey ||
        props.defaultActiveKey ||
        this.defaultProps.defaultActiveKey
    }
  }

  handleChange = (element: any) => {
    const activeKey = element.key
    const onChange = this.props.onChange

    this.setState({
      activeKey
    })

    if (onChange) {
      onChange(activeKey)
    }
  }

  componentDidUpdate(prevProps: TabsProps) {
    const { activeKey } = this.props

    if (activeKey && prevProps.activeKey !== activeKey) {
      this.setState({
        activeKey
      })
    }
  }

  renderHeader() {
    return React.Children.map(
      this.props.children,
      (element: any, index: number) => {
        const isActive =
          element.key === this.state.activeKey ? 'is-active' : null

        return (
          <span
            className={classnames('c-tabs__title', isActive)}
            onClick={() => {
              this.handleChange(element)
            }}
          >
            {element.props.title}
          </span>
        )
      }
    )
  }

  renderContent() {
    return React.Children.map(this.props.children, (element: any) => {
      if (element.key === this.state.activeKey) {
        return (
          <div className="c-tabs__pane">
            {element.props.children}
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div className="c-tabs">
        <div className="c-tabs__header">
          {this.renderHeader()}
        </div>
        <div className="c-tabs__body">
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default Tabs
