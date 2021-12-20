import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { FETCH_SINGLE_PAGE_START } from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchSinglePageSuccess,
  fetchSinglePageFailure,
} from "../Actions/PageAction";

function* fetchSinglePage() {
  try {
    const inputData = yield select((state) => state.page.pageData.inputData);
    const response = yield api.postMethod("static_pages", inputData);
    if (response.data.success) {
      yield put(fetchSinglePageSuccess(response.data.data));
    } else {
      yield put(fetchSinglePageFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSinglePageFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SINGLE_PAGE_START, fetchSinglePage)]);
}
