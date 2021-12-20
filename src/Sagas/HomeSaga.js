import { call, select, put, takeLatest, all } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../Environment";
import {
  FETCH_HOME_POSTS_START,
  FETCH_LISTS_DETAILS_START,
  FETCH_OTHERS_SINGLE_POST_START,
  FETCH_POST_SUGGESTION_START,
  POST_PAYMENT_STRIPE_START,
  POST_PAYMENT_WALLET_START,
  SEARCH_USER_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

import {
  fetchHomePostsFailure,
  fetchHomePostsSuccess,
  fetchOtherSinglePostFailure,
  fetchOtherSinglePostSuccess,
  fetchPostSuggesstionFailure,
  fetchPostSuggesstionSuccess,
  searchUserFailure,
  searchUserSuccess,
  postPaymentStripeSuccess,
  postPaymentWalletSuccess,
  postPaymentStripeFailure,
  postPaymentWalletFailure,
  fetchListsDetailsSuccess,
  fetchListsDetailsFailure,
} from "../Actions/HomeAction";

function* fetchHomePostAPI() {
  try {
    const skipCount = yield select((state) => state.home.homePost.skip);
    const response = yield api.postMethod("home", { skip: skipCount });
    if (response.data.success) {
      yield put(fetchHomePostsSuccess(response.data.data));
      if (response.data.data.user) {
        // yield AsyncStorage.setItem(
        //   "total_followers",
        //   response.data.data.user.total_followers
        //     ? response.data.data.user.total_followers
        //     : 0
        // );
        // yield AsyncStorage.setItem(
        //   "total_followings",
        //   response.data.data.user.total_followings
        //     ? response.data.data.user.total_followings
        //     : 0
        // );
        // yield AsyncStorage.setItem(
        //   "is_subscription_enabled",
        //   response.data.data.user.is_subscription_enabled
        // );
        // yield AsyncStorage.setItem("user_picture", response.data.data.user.picture);
        // yield AsyncStorage.setItem("user_cover", response.data.data.user.cover);
        // yield AsyncStorage.setItem("name", response.data.data.user.name);
        // yield AsyncStorage.setItem("username", response.data.data.user.username);
        // yield AsyncStorage.setItem(
        //   "user_unique_id",
        //   response.data.data.user.user_unique_id
        // );
        // yield AsyncStorage.setItem(
        //   "is_document_verified",
        //   response.data.data.user.is_document_verified
        // );
      }
    } else {
      yield put(fetchHomePostsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchHomePostsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* searchUserAPI() {
  try {
    const inputData = yield select((state) => state.home.searchUser.inputData);
    const response = yield api.postMethod("users_search", inputData);
    if (response.data.success) {
      yield put(searchUserSuccess(response.data.data));
    } else {
      yield put(searchUserFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(searchUserFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchOtherSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod("posts_view", inputData);
    if (response.data.success) {
      yield put(fetchOtherSinglePostSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchOtherSinglePostFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchOtherSinglePostFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchPostSuggesstionAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("user_suggestions", inputData);
    if (response.data.success) {
      yield put(fetchPostSuggesstionSuccess(response.data.data));
    } else {
      yield put(fetchPostSuggesstionFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchPostSuggesstionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* postPaymentStripeAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(postPaymentStripeSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(postPaymentStripeFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(postPaymentStripeFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* postPaymentWalletAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(postPaymentWalletSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(postPaymentWalletFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(postPaymentWalletFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchListsAPI() {
  try {
    const response = yield api.postMethod("lists_index");
    if (response.data.success) {
      yield put(fetchListsDetailsSuccess(response.data.data));
    } else {
      yield put(fetchListsDetailsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchListsDetailsFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_HOME_POSTS_START, fetchHomePostAPI)]);
  yield all([yield takeLatest(SEARCH_USER_START, searchUserAPI)]);
  yield all([
    yield takeLatest(FETCH_OTHERS_SINGLE_POST_START, fetchOtherSinglePostAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_POST_SUGGESTION_START, fetchPostSuggesstionAPI),
  ]);
  yield all([
    yield takeLatest(POST_PAYMENT_STRIPE_START, postPaymentStripeAPI),
  ]);
  yield all([
    yield takeLatest(POST_PAYMENT_WALLET_START, postPaymentWalletAPI),
  ]);
  yield all([yield takeLatest(FETCH_LISTS_DETAILS_START, fetchListsAPI)]);
}
