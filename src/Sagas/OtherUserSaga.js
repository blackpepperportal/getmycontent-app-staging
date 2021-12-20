import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchSingleUserPostsFailure,
  fetchSingleUserPostsSuccess,
  fetchSingleUserProfileFailure,
  fetchSingleUserProfileSuccess,
} from "../Actions/OtherUserAction";
import {
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_PROFILE_START,
} from "../Actions/ActionConstant";

function* fetchOtherUserProfileAPI() {
  try {
    const inputData = yield select(
      (state) => state.otherUser.userDetails.inputData
    );
    // if (inputData.user_unique_id == localStorage.getItem("user_unique_id")) {
    //   window.location.assign("/profile");
    // }
    const response = yield api.postMethod("other_profile", inputData);
    if (response.data.success) {
      yield put(fetchSingleUserProfileSuccess(response.data.data));
    } else {
      yield put(fetchSingleUserProfileFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleUserProfileFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchOtherUserPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.otherUser.userPosts.inputData
    );
    const response = yield api.postMethod("other_profile_posts", inputData);
    if (response.data.success) {
      yield put(fetchSingleUserPostsSuccess(response.data.data));
    } else {
      yield put(fetchSingleUserPostsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleUserPostsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_SINGLE_USER_PROFILE_START, fetchOtherUserProfileAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_USER_POSTS_START, fetchOtherUserPostAPI),
  ]);
}
