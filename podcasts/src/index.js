import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import { watchFetchPodcasts, watchFetchEpisodes } from './sagas'
import {fetchPodcasts, fetchEpisodes} from './actions'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchFetchPodcasts)
sagaMiddleware.run(watchFetchEpisodes)

function Link(props) {
  return (
    <div>
        {props.link.title} ({props.link.id})
        <button onClick={() => props.dispatch(fetchEpisodes(props.link.id))}>list episodes</button>
    </div>
  )
}

const ConnectedLink = connect()(Link)

const authKey = 'eyJhcGlfa2V5IjoiNzVkMzc3N2M3NWFhM2QwOTkxOWEyZTI4ZjhiM2M1YTkifQ==';

function App (props) {
  return (
    <div>
      <button onClick={() => props.dispatch(fetchPodcasts(authKey))}>Show Podcasts</button>
        {props.loading 
          ? <p>Loading...</p> 
          : props.error
              ? <p>Error, try again</p>
              : 
              <div>
                {props.podcasts.collection ? props.podcasts.collection.map(link => <ConnectedLink key={link.id} link={link} />) : "click to load"}
                {/* {JSON.stringify(props.podcasts.collection)} */}
              </div>}
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
