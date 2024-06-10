import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from "../types";

const initialState = {
  scenes: [
    {
      name: "Entrance",
      image: "/images/1.jpg",
      hotspots: [
        {
          position: [-30, -30],
          targetScene: "Reception"
        }
      ]
    },
    {
      name: "Reception",
      image: "/images/lobbyV2.jpg",
      hotspots: [
        {
          position: [15, 25],
          targetScene: "Lab"
        },
        {
          position: [-30, -30],
          targetScene: "Entrance"
        }
      ]
    },
    {
      name: "Lab",
      image: "/images/clinic.jpg",
      hotspots: [
        {
          position: [15, 40],
          targetScene: "Reception"
        },
        {
          position: [-30, 40],
          targetScene: "X-ray Lab"
        }
      ]
    },
    {
      name: "X-ray Lab",
      image: "/images/xray.jpg",
      hotspots: [
        {
          position: [-30, -30],
          targetScene: "Lab"
        }
      ]
    }
  ]
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
