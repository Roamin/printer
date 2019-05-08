import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

export interface RouterViewProps {
  routes: any
}

class RouterView extends React.Component<RouterViewProps> {
  render() {
    const { routes = [] } = this.props

    return (
      <Suspense fallback={<div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>Loading</div>}>
        <Switch>
          {
            routes.map((route: any, index: number) =>
              <Route
                key={index}
                path={route.path}
                render={props => (
                  // pass the sub-routes down to keep nesting
                  <route.component {...props} routes={route.routes} exact={route.exact} />
                )}
              />
            )
          }
        </Switch>
      </Suspense>
    )
  }
}

export default RouterView