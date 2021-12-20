import { call, select, put, takeLatest, all } from "redux-saga/effects";
import { ERROR_LOGOUT_CHECK } from "../Actions/ActionConstant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

const erroCode = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007];

function* logoutStatusCheck() {
  try {
    const inputData = yield select((state) => state.errorDetails.error);
    console.log("Error Check statrted", inputData);
    if (erroCode.indexOf(inputData.error_code) !== -1) {
      console.log("Error Check true");
      yield AsyncStorage.removeItem("accessToken");
      yield AsyncStorage.removeItem("userId");
      yield AsyncStorage.removeItem("userLoginStatus");
      yield AsyncStorage.removeItem("user_picture");
      yield AsyncStorage.removeItem("username");
      // Toast.show({
      //   type: 'error',
      //   text2: inputData.error,
      // });
      // window.location.assign("/");
    } else {
      console.log("Error Check false");
      // Toast.show({
      //   type: 'error',
      //   text2: response.data.error,
      // });
    }
  } catch (error) {
    console.log("Error Check false", error);
      // Toast.show({
      //   type: 'error',
      //   text2: error.message,
      // });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ERROR_LOGOUT_CHECK, logoutStatusCheck)]);
}
