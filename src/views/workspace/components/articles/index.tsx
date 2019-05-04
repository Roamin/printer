import React from 'react'
import classNames from 'classnames'

import './index.scss'

export interface ArticlesProps {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  style?: React.CSSProperties
}

class Articles extends React.Component<ArticlesProps> {
  static defaultProps = {
    className: 'c-tpl'
  }

  state = {
    articles: [
      {
        id: 1,
        title: '匆匆',
        creteTime: '2012-03-12 08:41:55'
      },
      {
        id: 2,
        title: '海角天涯，招之即来',
        creteTime: '2012-03-12 08:41:55'
      },
      {
        id: 3,
        title: '盗墓笔记',
        creteTime: '2012-03-12 08:41:55'
      },
      {
        id: 4,
        title: '沙海',
        creteTime: '2012-03-12 08:41:55'
      },
      {
        id: 5,
        title: '鬼吹灯',
        creteTime: '2012-03-12 08:41:55'
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
      [`workspace__articles`]: true,
      [`${className}`]: true
    })

    return (
      <div className={classString}
        style={style}
        onClick={onClick} >
        <header>
          <div className="handler-bar">
            <h3 className="title">Articles</h3>
            <div className="button-group">
            </div>
          </div>
          <div className="search-bar">
          </div>
        </header>
        <ul className="articles">
          {
            this.state.articles.map((article, index) =>
              <li className={`article ${article.id === 2 ? 'active' : ''}`} key={index}>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">我外婆说，我舅舅小时候性子很揪。跟我外公吵完架，就把眼镜布塞眼镜盒里，拿几本书塞进书包，气哼哼的出门，在门口还会吼一声：我这就去美国！再也不回来了！</p>
                <div>
                  <time className="article-create-time">{article.creteTime}</time>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default Articles
