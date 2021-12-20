import { call, select, put, takeLatest, all } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../Navigators/Root';
import api from "../../Environment";
import {
  FETCH_FOLLOWERS_START,
  FETCH_ACTIVE_FOLLOWERS_START,
  FETCH_EXPIRED_FOLLOWERS_START,
  FETCH_FOLLOWING_START,
  FOLLOW_USER_START,
  UNFOLLOW_USER_START,
  FETCH_ACTIVE_FOLLOWING_START,
  FETCH_EXPIRED_FOLLOWING_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchFollowersFailure,
  fetchFollowersSuccess,
  fetchActiveFollowersFailure,
  fetchActiveFollowersSuccess,
  fetchExpiredFollowersFailure,
  fetchExpiredFollowersSuccess,
  fetchFollowingFailure,
  fetchFollowingSuccess,
  followUserFailure,
  followUserSuccess,
  unFollowUserFailure,
  unFollowUserSuccess,
  fetchActiveFollowingSuccess,
  fetchActiveFollowingFailure,
  fetchExpiredFollowingSuccess,
  fetchExpiredFollowingFailure,
} from "../Actions/FollowAction";

function* followUserAPI() {
  try {
    Toast.show({
        type: 'info',
        text2: "Loading... Please Wait",
      });
    const inputData = yield select(
      (state) => state.follow.followUser.inputData
    );
    const response = yield api.postMethod("follow_users", inputData);
    if (response.data.success) {
      yield put(followUserSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield AsyncStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      yield AsyncStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      var reload = new Date().getTime()
      RootNavigation.navigate('Homes', {
        screen: 'CelebrityProfile',
        params: {
          user_unique_id: inputData.user_unique_id,
          reload: reload,
        },
      })
    } else {
      yield put(followUserFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(followUserFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* unFollowUserAPI() {
  try {
    Toast.show({
        type: 'info',
        text2: "Loading... Please Wait",
      });
    const inputData = yield select(
      (state) => state.follow.unFollowUser.inputData
    );
    const response = yield api.postMethod("unfollow_users", inputData);
    if (response.data.success) {
      yield put(unFollowUserSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield AsyncStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      yield AsyncStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      var reload = new Date().getTime()
      RootNavigation.navigate('Homes', {
        screen: 'CelebrityProfile',
        params: {
          user_unique_id: inputData.user_unique_id,
          reload: reload,
        },
      })
      // window.location.reload();
    } else {
      yield put(unFollowUserFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(unFollowUserFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchFollowersAPI() {
  try {
    const response = yield api.postMethod("followers");
    if (response.data.success) {
      yield put(fetchFollowersSuccess(response.data.data));
    } else {
      yield put(fetchFollowersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchFollowersFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchActiveFollowersAPI() {
  try {
    const response = yield api.postMethod("active_followers");
    if (response.data.success) {
      yield put(fetchActiveFollowersSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchActiveFollowersFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchExpiredFollowersAPI() {
  try {
    const response = yield api.postMethod("expired_followers");
    if (response.data.success) {
      yield put(fetchExpiredFollowersSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchExpiredFollowersFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchFollowingAPI() {
  try {
    const response = yield api.postMethod("followings");
    if (response.data.success) {
      yield put(fetchFollowingSuccess(response.data.data));
    } else {
      yield put(fetchFollowingFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchFollowingFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchActiveFollowingAPI() {
  try {
    const response = yield api.postMethod("active_followings");
    if (response.data.success) {
      yield put(fetchActiveFollowingSuccess(response.data.data));
    } else {
      yield put(fetchActiveFollowingFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchActiveFollowingFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchExpiredFollowingAPI() {
  try {
    const response = yield api.postMethod("expired_followings");
    if (response.data.success) {
      yield put(fetchExpiredFollowingSuccess(response.data.data));
    } else {
      yield put(fetchExpiredFollowingFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchExpiredFollowingFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FOLLOW_USER_START, followUserAPI)]);
  yield all([yield takeLatest(UNFOLLOW_USER_START, unFollowUserAPI)]);
  yield all([yield takeLatest(FETCH_FOLLOWERS_START, fetchFollowersAPI)]);
  yield all([
    yield takeLatest(FETCH_ACTIVE_FOLLOWERS_START, fetchActiveFollowersAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_EXPIRED_FOLLOWERS_START, fetchExpiredFollowersAPI),
  ]);
  yield all([yield takeLatest(FETCH_FOLLOWING_START, fetchFollowingAPI)]);
  yield all([
    yield takeLatest(FETCH_ACTIVE_FOLLOWING_START, fetchActiveFollowingAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_EXPIRED_FOLLOWING_START, fetchExpiredFollowingAPI),
  ]);
}
