import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "../types";

const initialState = {
  scenes: []
};

const imageReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_IMAGES_SUCCESS:
      console.log(action.payload?.length, 'action.payload')
      return {
        ...state,
        loading: false,
        images: action.payload?.length ? action.payload : initialState.images,
        scenes: action.payload?.length ? action.payload : initialState.images,
      };
    case FETCH_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
