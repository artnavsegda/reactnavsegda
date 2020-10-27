import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

const initialState = {
  url: '',
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state
  }
}

const requestDog = () => {
  return { type: 'REQUESTED_DOG' }
};

const requestDogSuccess = (data) => {
  return { type: 'REQUESTED_DOG_SUCCEEDED', url: data.message }
};

const requestDogError = () => {
  return { type: 'REQUESTED_DOG_FAILED' }
};

const fetchDog = () => {
  return { type: 'FETCHED_DOG' }
};

function* watchFetchDog() {
  yield takeEvery('FETCHED_DOG', fetchDogAsync)
}

function* fetchDogAsync() {
  try {
    yield put(requestDog());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    )
    yield put(requestDogSuccess(data));
  } catch (error) {
    yield put(requestDogError())
  }
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchFetchDog)

class App extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchDog())}>Show Dog</button>
          {this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img src={this.props.url}/></p>}
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
