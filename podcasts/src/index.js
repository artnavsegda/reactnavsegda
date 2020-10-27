import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import watchFetchPodcasts from './sagas'
import fetchPodcasts from './actions'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchFetchPodcasts)

class App extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchPodcasts())}>Show Podcasts</button>
          {this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p>Error, try again</p>
                : <p>{JSON.stringify(this.props.podcasts.collection)}</p>}
      </div>
    )
  }
}

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
