import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

const initialState = {
  podcasts: '',
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_PODCASTS':
      return {
        podcasts: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_PODCASTS_SUCCEEDED':
      return {
        podcasts: action.podcasts,
        loading: false,
        error: false,
      };
    case 'REQUESTED_PODCASTS_FAILED':
      return {
        podcasts: '',
        loading: false,
        error: true,
      };
    default:
      return state
  }
}

const requestPodcasts = () => {
  return { type: 'REQUESTED_PODCASTS' }
};

const requestPodcastsSuccess = (data) => {
  return { type: 'REQUESTED_PODCASTS_SUCCEEDED', podcasts: data }
};

const requestPodcastsError = () => {
  return { type: 'REQUESTED_PODCASTS_FAILED' }
};

const fetchPodcasts = () => {
  return { type: 'FETCHED_PODCASTS' }
};

function* watchFetchPodcasts() {
  yield takeEvery('FETCHED_PODCASTS', fetchPodcastsAsync)
}

let authHeader = new Headers({'Authorization':'Bearer eyJhcGlfa2V5IjoiNzVkMzc3N2M3NWFhM2QwOTkxOWEyZTI4ZjhiM2M1YTkifQ=='})

function* fetchPodcastsAsync() {
  try {
    yield put(requestPodcasts());
    const data = yield call(() => {
      return fetch('https://api.simplecast.com/podcasts/', {headers: authHeader})
              .then(res => res.json())
      }
    )
    yield put(requestPodcastsSuccess(data));
  } catch (error) {
    yield put(requestPodcastsError())
  }
}

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
