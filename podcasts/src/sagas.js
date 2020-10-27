import { call, put, takeEvery } from 'redux-saga/effects'

import {requestPodcasts, requestPodcastsSuccess, requestPodcastsError} from './actions'

function* fetchPodcastsAsync(action) {
    try {
        yield put(requestPodcasts());
        const data = yield call(() => {
            return fetch('https://api.simplecast.com/podcasts/', {headers: new Headers({'Authorization':'Bearer ' + action.key})})
                    .then(res => res.json())
            }
        )
        yield put(requestPodcastsSuccess(data));
    } catch (error) {
        yield put(requestPodcastsError())
    }
}

function* watchFetchPodcasts() {
    yield takeEvery('FETCHED_PODCASTS', fetchPodcastsAsync)
}

export default watchFetchPodcasts