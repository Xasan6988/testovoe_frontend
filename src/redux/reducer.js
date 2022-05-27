import { GET_DATA, SET_PAGE, SET_PAGES_COUNT, SET_PROJECT_PER_PAGE, SET_SEARCH_STRING, START_LOADING, STOP_LOADING, SET_DATA } from './types';

const initialState = {
  data: [],
  searchString: '',
  loading: false,
  projectsPerPage: 10,
  pagesCount: 0,
  page: 1
}

const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DATA:
      return {...state, data: [...action.payload]};
    case SET_DATA:
      return {...state, data: [...action.payload]}
    case SET_SEARCH_STRING:
      return {...state, searchString: action.payload};
    case START_LOADING:
      return {...state, loading: true};
    case STOP_LOADING:
      return {...state, loading: false};
    case SET_PROJECT_PER_PAGE:
      return {...state, projectsPerPage: action.payload};
    case SET_PAGES_COUNT:
      return {...state, pagesCount: action.payload}
    case SET_PAGE:
      return {...state, page: action.payload}
    default:
      return state;
    }

}

export default dataReducer;
