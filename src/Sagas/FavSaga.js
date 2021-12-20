import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  deleteFavFailure,
  deleteFavSuccess,
  fetchFavFailure,
  fetchFavSuccess,
  saveFavFailure,
  saveFavSuccess,
} from "../Actions/FavAction";
import {
  DELETE_FAV_START,
  FETCH_FAV_START,
  SAVE_FAV_START,
} from "../Actions/ActionConstant";

function* fetchFavAPI() {
  try {
    const response = yield api.postMethod("fav_users");
    if (response.data.success) {
      yield put(fetchFavSuccess(response.data.data));
    } else {
      yield put(fetchFavFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchFavFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveFavAPI() {
  try {
    Toast.show({
        type: 'info',
        text2: "Loading... Please Wait",
      });
    const inputData = yield select((state) => state.fav.saveFav.inputData);
    const response = yield api.postMethod("fav_users_save", inputData);
    if (response.data.success) {
      yield put(saveFavSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(saveFavFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveFavFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deleteFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.deleteFav.inputData);
    const response = yield api.postMethod("fav_users_delete", inputData);
    if (response.data.success) {
      yield put(deleteFavSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(deleteFavFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteFavFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_FAV_START, fetchFavAPI)]);
  yield all([yield takeLatest(SAVE_FAV_START, saveFavAPI)]);
  yield all([yield takeLatest(DELETE_FAV_START, deleteFavAPI)]);
}
