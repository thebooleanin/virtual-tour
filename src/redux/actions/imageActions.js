// imageActions.js
import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE } from '../types';

export const fetchImagesRequest = () => ({
    type: FETCH_IMAGES_REQUEST,
});

export const fetchImagesSuccess = (images) => ({
    type: FETCH_IMAGES_SUCCESS,
    payload: images,
});

export const fetchImagesFailure = (error) => ({
    type: FETCH_IMAGES_FAILURE,
    payload: error,
});
