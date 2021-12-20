import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import Toast from 'react-native-toast-message';

import { FETCH_NOTIFICATIONS_START } from "../Actions/ActionConstant";
// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

import {
  fetchNotificationsFailure,
  fetchNotificationsSuccess,
} from "../Actions/NotificationAction";

function* fetchNotificationAPI() {
  try {
    const inputData = yield select(
      (state) => state.notification.notification.inputData
    );
    const response = yield api.postMethod(
      "bell_notifications_index",
      inputData
    );
    if (response.data.success) {
      yield put(fetchNotificationsSuccess(response.data.data));
    } else {
      yield put(fetchNotificationsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchNotificationsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_NOTIFICATIONS_START, fetchNotificationAPI),
  ]);
}
