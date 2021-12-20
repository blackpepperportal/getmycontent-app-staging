import {
  FETCH_SINGLE_USER_PROFILE_START,
  FETCH_SINGLE_USER_PROFILE_SUCCESS,
  FETCH_SINGLE_USER_PROFILE_FAILURE,
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_POSTS_SUCCESS,
  FETCH_SINGLE_USER_POSTS_FAILURE,
} from "./ActionConstant";

export function fetchSingleUserProfileStart(data) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_START,
    data,
  };
}

export function fetchSingleUserProfileSuccess(data) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_SUCCESS,
    data,
  };
}

export function fetchSingleUserProfileFailure(error) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchSingleUserPostsStart(data) {
  return {
    type: FETCH_SINGLE_USER_POSTS_START,
    data,
  };
}

export function fetchSingleUserPostsSuccess(data) {
  return {
    type: FETCH_SINGLE_USER_POSTS_SUCCESS,
    data,
  };
}

export function fetchSingleUserPostsFailure(error) {
  return {
    type: FETCH_SINGLE_USER_POSTS_FAILURE,
    error,
  };
}
