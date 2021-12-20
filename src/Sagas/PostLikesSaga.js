import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_POST_LIKED_START,
  SAVE_POST_LIKE_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchPostLikedFailure,
  fetchPostLikedSuccess,
  savePostLikeFailure,
  savePostLikeSuccess,
} from "../Actions/PostLikesAction";

function* savePostLikesAPI() {
  try {
    const inputData = yield select(
      (state) => state.postLike.saveLike.inputData
    );
    const response = yield api.postMethod("post_likes_save", inputData);
    if (response.data.success) {
      yield put(savePostLikeSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(savePostLikeFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(savePostLikeFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchPostLikesAPI() {
  try {
    const inputData = yield select(
      (state) => state.postLike.saveLike.inputData
    );
    const response = yield api.postMethod("post_likes", inputData);
    if (response.data.success) {
      yield put(fetchPostLikedSuccess(response.data.data));
    } else {
      yield put(fetchPostLikedFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchPostLikedFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_LIKE_START, savePostLikesAPI)]);
  yield all([yield takeLatest(FETCH_POST_LIKED_START, fetchPostLikesAPI)]);
}
