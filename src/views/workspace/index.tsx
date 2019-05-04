import React from 'react'

import Article from './components/article'
import Articles from './components/articles'
import Categories from './components/categories'

import './index.scss'

interface WorkspaceProps {

}

class Workspace extends React.Component<WorkspaceProps> {
    render() {
        return (
            <section className="layout-workspace" >
                <div className="layout-workspace__categories">
                    <Categories />
                </div>
                <div className="layout-workspace__articles">
                    <Articles />
                </div>
                <div className="layout-workspace__article">
                    <Article />
                </div>
            </section>
        )
    }
}

export default Workspace
