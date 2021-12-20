import { call, select, put, takeLatest, all } from "redux-saga/effects";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  changePasswordSuccess,
  changePasswordFailure,
} from "../Actions/UserAction";
import * as RootNavigation from '../../Navigators/Root';
import api from "../../Environment";
import { CHANGE_PASSWORD_START } from "../Actions/ActionConstant";
// import { createNotification } from "react-redux-notify";
// import {
//    getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

function* changePasswordAPI() {
  try {
    const inputData = yield select(
      (state) => state.changePassword.inputData.data
    );
    const response = yield api.postMethod("change_password", inputData);
    yield put(changePasswordSuccess(response.data.data));
    if (response.data.success) {
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    yield AsyncStorage.removeItem('accessToken')
    yield AsyncStorage.removeItem('username')
    yield AsyncStorage.removeItem('name')
    yield AsyncStorage.removeItem('user_picture')
    yield AsyncStorage.removeItem('user_cover')
    yield AsyncStorage.removeItem('total_followings')
    yield AsyncStorage.removeItem('total_followers')
    yield AsyncStorage.removeItem('userId')
    RootNavigation.navigate('Homes', { screen: 'Login' })
    } else {
      console.log('err')
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(changePasswordFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(CHANGE_PASSWORD_START, changePasswordAPI)]);
}
