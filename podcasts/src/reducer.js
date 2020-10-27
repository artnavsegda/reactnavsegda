const initialState = {
  podcasts: '',
  episodes: '',
  loading: false,
  error: false,
  episodesLoading: false,
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
      case 'REQUESTED_EPISODES':
        return {
          podcasts: 'loading episodes',
          loading: true,
          error: false,
        };
      case 'REQUESTED_EPISODES_SUCCEEDED':
        return {
          podcasts: 'loaded episodes',
          episodes: action.episodes,
          loading: false,
          error: false,
        };
      case 'REQUESTED_EPISODES_FAILED':
        return {
          podcasts: '',
          episodes: '',
          loading: false,
          error: true,
        };
    default:
      return state
  }
}

export default reducer;