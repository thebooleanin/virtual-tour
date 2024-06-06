import { SET_IMAGE } from '../actions/imageActions';

const initialState = {
    image: [],
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGE:
            return {
                ...state,
                image: action.payload,
            };
        default:
            return state;
    }
};

export default imageReducer;
