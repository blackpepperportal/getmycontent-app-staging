import { call, select, put, takeLatest, all } from "redux-saga/effects";
import Toast from 'react-native-toast-message';
import api from "../../Environment";
// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

import {
  deleteBookmarkFailure,
  deleteBookmarkSuccess,
  fetchBookmarksFailure,
  fetchBookmarksPhotoFailure,
  fetchBookmarksPhotoSuccess,
  fetchBookmarksSuccess,
  fetchBookmarksVideoFailure,
  fetchBookmarksVideoSuccess,
  saveBookmarkFailure,
  saveBookmarkSuccess,
} from "../Actions/BookmarkAction";
import {
  DELETE_BOOKMARK_START,
  FETCH_BOOKMARKS_PHOTO_START,
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_VIDEO_START,
  SAVE_BOOKMARK_START,
} from "../Actions/ActionConstant";

function* fetchBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmark.inputData
    );
    const response = yield api.postMethod("post_bookmarks", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchBookmarksFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchBookmarkPhotoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkPhoto.inputData
    );
    const response = yield api.postMethod("post_bookmarks_photos", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksPhotoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksPhotoFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchBookmarksPhotoFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchBookmarkVideoAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.bookmarkVideo.inputData
    );
    const response = yield api.postMethod("post_bookmarks_videos", inputData);
    if (response.data.success) {
      yield put(fetchBookmarksVideoSuccess(response.data.data));
    } else {
      yield put(fetchBookmarksVideoFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchBookmarksVideoFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveBookmarkAPI() {
  try {
    const inputData = yield select(
      (state) => state.bookmark.saveBookmark.inputData
    );
    const response = yield api.postMethod("post_bookmarks_save", inputData);
    if (response.data.success) {
      yield put(saveBookmarkSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(saveBookmarkFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveBookmarkFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deleteBookmarkAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("post_bookmarks_delete", inputData);
    if (response.data.success) {
      yield put(deleteBookmarkSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(deleteBookmarkFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteBookmarkFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_BOOKMARKS_START, fetchBookmarkAPI)]);
  yield all([
    yield takeLatest(FETCH_BOOKMARKS_PHOTO_START, fetchBookmarkPhotoAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_BOOKMARKS_VIDEO_START, fetchBookmarkVideoAPI),
  ]);
  yield all([yield takeLatest(SAVE_BOOKMARK_START, saveBookmarkAPI)]);
  yield all([yield takeLatest(DELETE_BOOKMARK_START, deleteBookmarkAPI)]);
}
