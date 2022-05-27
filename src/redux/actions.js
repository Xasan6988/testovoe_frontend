import { GET_DATA, START_LOADING, STOP_LOADING, SET_SEARCH_STRING, SET_PROJECT_PER_PAGE, SET_PAGES_COUNT, SET_PAGE, SET_DATA } from './types';

export const startLoading = () => {
  return {
    type: START_LOADING,
    payload: true
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
    payload: false
  }
}

export const getData = (searchString = 'react', page = 1, projectsPerPage = 10) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      fetch('https://api.github.com/search/repositories?q=' + searchString + `&page=${page}&per_page=${projectsPerPage}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: SET_PAGES_COUNT,
          payload: json.total_count
        })
        dispatch({
          type: GET_DATA,
          payload: [...json.items],
        });
        dispatch(stopLoading());
      })
      .catch(e => {
        stopLoading()
        throw new Error(e)
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

export const setData = (data) => {
  return async dispatch => {
    dispatch(startLoading());
    dispatch({
      type: SET_DATA,
      payload: data
    });
    dispatch(stopLoading())
  }
}

export const setSearchString = (string) => {
  return {
    type: SET_SEARCH_STRING,
    payload: string
  }
}

export const setProjectPerPage = (count) => {
  return {
    type: SET_PROJECT_PER_PAGE,
    payload: count
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  }
}
