const fetchPodcasts = (authKey) => {
    return { type: 'FETCHED_PODCASTS', key: authKey }
};

const fetchEpisodes = (podcastID) => {
    return { type: 'FETCHED_EPISODES', id: podcastID }
};

const requestPodcasts = () => {
    return { type: 'REQUESTED_PODCASTS' }
};

const requestPodcastsSuccess = (data) => {
    return { type: 'REQUESTED_PODCASTS_SUCCEEDED', podcasts: data }
};

const requestPodcastsError = () => {
    return { type: 'REQUESTED_PODCASTS_FAILED' }
};

export { fetchPodcasts, requestPodcasts, requestPodcastsSuccess, requestPodcastsError, fetchEpisodes };