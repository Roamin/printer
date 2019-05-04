import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import routes from '@/routes'
import RouterView from '@/components/router-view'
import Sidebar from '@/components/sidebar'

import './index.scss'

ReactDOM.render(<BrowserRouter>
    <Sidebar />
    <main>
        <RouterView routes={routes} />
    </main>
</BrowserRouter>, document.getElementById('root'))