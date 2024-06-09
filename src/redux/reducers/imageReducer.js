// const initialState = {
//     images: [
//         {
//             SceneName: "Beach",
//             Images: {
//                 ImageBase64: `/images/360img.jpg`,
//                 coOrdinates: [100, 0],
//             },

//         },
//         {
//             SceneName: "Room",
//             Images: {
//                 ImageBase64: `/images/img1.png`,
//                 coOrdinates: [-90, -10],
//             },

//         },
//     ],
// };
// imageReducer.js
import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "../types";

const initialState = {
  images: [
    {
      SceneName: "Entrance",
      Images: {
        ImageBase64: `/images/1.jpg`,
        coOrdinates: [-30, -30],
      },
    },
    {
      SceneName: "Reception",
      Images: {
        ImageBase64: `/images/lobbyV2.jpg`,
        coOrdinates: [15, 25],
      },
    },
    {
      SceneName: "Lab",
      Images: {
        ImageBase64: `/images/clinic.jpg`,
        coOrdinates: [15, 25],
      },
    },
    {
      SceneName: "X-ray Lab",
      Images: {
        ImageBase64: `/images/xray.jpg`,
        coOrdinates: [-30, -30],
      },
    },
  ],
  loading: false,
  error: null,
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
      return {
        ...state,
        loading: false,
        images: action.payload ? action.payload : initialState.images,
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
