import React, { Component } from 'react';
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

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.title} ({this.props.link.id})
        </div>
      </div>
    )
  }
}

function App (props) {
  return (
    <div>
      <button onClick={() => props.dispatch(fetchPodcasts())}>Show Podcasts</button>
        {props.loading 
          ? <p>Loading...</p> 
          : props.error
              ? <p>Error, try again</p>
              : 
              <p>
                {props.podcasts.collection ? props.podcasts.collection.map(link => <Link key={link.id} link={link} />) : ""}
                {/* {JSON.stringify(props.podcasts.collection)} */}
              </p>}
    </div>
  )
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
