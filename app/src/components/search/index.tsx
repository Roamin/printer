import React from 'react'
import classNames from 'classnames'

import Icon from '../icon'

import './index.scss'

export interface SearchProps {
  className?: string
  onSearch?: any
  style?: React.CSSProperties
}
export interface SearchState {
  value: string
}

class Search extends React.Component<SearchProps, SearchState> {
  static defaultProps = {
    className: 'c-search'
  }

  constructor(props: SearchProps) {
    super(props)

    this.state = {
      value: ''
    }
  }

  search(keyword: string) {
    this.props.onSearch(keyword)
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value.trim()
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    this.search(this.state.value)
  }

  handleClear = () => {
    this.setState({
      value: ''
    })
  }

  render() {
    const { className, style } = this.props
    const classString = classNames({
      [`c-search`]: true,
      [`${className}`]: true
    })

    return (
      <form className={classString} style={style} onSubmit={this.handleSubmit}>
        <Icon className="icon icon-search" type="search" />
        <input
          type="text"
          placeholder="Search ..."
          autoComplete="off"
          spellCheck={false}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Icon
          className="icon icon-close"
          type="close-fill"
          onClick={this.handleClear}
        />
      </form>
    )
  }
}

export default Search
