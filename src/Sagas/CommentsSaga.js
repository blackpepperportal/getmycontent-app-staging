import { call, select, put, takeLatest, all } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from "../../Environment";
// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  DELETE_COMMENT_START,
  FETCH_COMMENTS_START,
  SAVE_COMMENT_START,
} from "../Actions/ActionConstant";
import {
  deleteCommentFailure,
  deleteCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsSuccess,
  saveCommentFailure,
  saveCommentSuccess,
} from "../Actions/CommentsAction";

function* fetchCommentsAPI() {
  try {
    const inputData = yield select((state) => state.comment.comments.inputData);
    const post_id = yield select((state) => state.comment.comments.inputData.post_id);
    const response = yield api.postMethod("post_comments", inputData);
    if (response.data.success) {
      yield put(fetchCommentsSuccess(response.data.data));
    } else {
      yield put(fetchCommentsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchCommentsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveCommentAPI() {
  try {
    const inputData = yield select(
      (state) => state.comment.saveComment.inputData
    );
    const response = yield api.postMethod("post_comments_save", inputData);
    if (response.data.success) {
      // yield put(saveCommentSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      // yield put(saveCommentFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    // yield put(saveCommentFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deleteCommentAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("documents_delete", inputData);
    if (response.data.success) {
      yield put(deleteCommentSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(deleteCommentFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteCommentFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_COMMENTS_START, fetchCommentsAPI)]);
  yield all([yield takeLatest(SAVE_COMMENT_START, saveCommentAPI)]);
  yield all([yield takeLatest(DELETE_COMMENT_START, deleteCommentAPI)]);
}
