import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import * as RootNavigation from '../../Navigators/Root';
import {
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  updateUserDetailsSuccess,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  deleteAccountSuccess,
  deleteAccountFailure,
  updateUserDetailsFailure,
  registerVerifyFailure,
  registerVerifyResendFailure,
  registerVerifySuccess,
  registerVerifyResendSuccess,
  notificationStatusUpdateSuccess,
  notificationStatusUpdateFailure,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  saveBlockUserSuccess,
  saveBlockUserFailure,
  fetchBlockUsersSuccess,
  fetchBlockUsersFailure,
} from "../Actions/UserAction";
import Toast from 'react-native-toast-message';

import api from "../../Environment";
import {
  FETCH_USER_DETAILS_START,
  UPDATE_USER_DETAILS_START,
  LOGIN_START,
  REGISTER_START,
  FORGOT_PASSWORD_START,
  DELETE_ACCOUNT_START,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_RESEND_START,
  NOTIFICATION_STATUS_UPDATE_START,
  FETCH_PAYMENTS_START,
  FETCH_BLOCK_USERS_START,
  SAVE_BLOCK_USER_START,
  USER_VERIFY_BADGE_STATUS_START,
} from "../Actions/ActionConstant";

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import { checkLogoutStatus } from "../Actions/ErrorAction";

function* getUserDetailsAPI() {
  try {
    const response = yield api.postMethod("profile");

    if (response.data.success) {
      yield put(fetchUserDetailsSuccess(response.data));
      yield AsyncStorage.setItem(
        "is_subscription_enabled",
        JSON.stringify(response.data.data.is_subscription_enabled)
      );
    } else {
      yield put(fetchUserDetailsFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      // Toast.show({
      //   type: 'error',
      //   text2: 'Please login first',
      // });
    }
  } catch (error) {
    yield put(fetchUserDetailsFailure(error));
    Toast.show({
      type: 'error',
     text2: error.message,
    });
  }
}

function* updateUserDetailsAPI() {
  try {
    const userData = yield select((state) => state.users.profileInputData.data);
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      console.log(response.data)
      yield put(updateUserDetailsSuccess(response.data));
      yield AsyncStorage.setItem("user_picture", response.data.data.picture);
      yield AsyncStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      yield AsyncStorage.setItem("user_cover", response.data.data.cover);
      yield AsyncStorage.setItem("name", response.data.data.name);
      yield AsyncStorage.setItem("username", response.data.data.username);
      yield AsyncStorage.setItem(
        "is_document_verified",
        JSON.stringify(response.data.data.is_document_verified)
      );
      yield AsyncStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? JSON.stringify(response.data.data.is_verified_badge)
          : JSON.stringify(0)
      );
      Toast.show({
      type: 'success',
      text2: response.data.message,
    })
      RootNavigation.navigate('Account')
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
      // window.location.assign("/profile");
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
      yield put(updateUserDetailsFailure(response.data.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* userLoginAPI() {
  try {
    const userData = yield select((state) => state.users.loginInputData.data);
    const response = yield api.postMethod("login", userData);
    yield put(userLoginSuccess(response.data));
    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        yield AsyncStorage.setItem("userLoginStatus", JSON.stringify(true));
        yield AsyncStorage.setItem("user_picture", response.data.data.picture);
        yield AsyncStorage.setItem("user_cover", response.data.data.cover);
        yield AsyncStorage.setItem("name", response.data.data.name);
        yield AsyncStorage.setItem("username", response.data.data.username);
        yield AsyncStorage.setItem("total_followings",JSON.stringify(response.data.data.total_followings))
        yield AsyncStorage.setItem("total_followers",JSON.stringify(response.data.data.total_followers))
        yield AsyncStorage.setItem(
          "about", 
          response.data.data.about
          ? response.data.data.about : '')
        yield AsyncStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        yield AsyncStorage.setItem(
          "is_document_verified",
          JSON.stringify(response.data.data.is_document_verified)
        );
        yield AsyncStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? JSON.stringify(response.data.data.is_verified_badge)
            : JSON.stringify(0)
        );
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
        RootNavigation.navigate('Home')
      }
      yield AsyncStorage.setItem("userId", JSON.stringify(response.data.data.user_id));
      yield AsyncStorage.setItem("accessToken", response.data.data.token);
    } else {
      Toast.show({
          type: 'error',
          text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(userLoginFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* userRegisterAPI() {
  try {
    const userData = yield select(
      (state) => state.users.registerInputData.data
    );
    const response = yield api.postMethod("register", userData);
    yield put(userRegisterSuccess(response.data));
    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register/verify");
      else {
        yield AsyncStorage.setItem("userLoginStatus", JSON.stringify(true));
        yield AsyncStorage.setItem("user_picture", response.data.data.picture);
        yield AsyncStorage.setItem("user_cover", response.data.data.cover);
        yield AsyncStorage.setItem("username", response.data.data.username);
        yield AsyncStorage.setItem("name", response.data.data.name);
        yield AsyncStorage.setItem("total_followings",JSON.stringify(response.data.data.total_followings))
        yield AsyncStorage.setItem("total_followers",JSON.stringify(response.data.data.total_followers))
        yield AsyncStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        yield AsyncStorage.setItem(
          "is_document_verified",
          JSON.stringify(response.data.data.is_document_verified)
        );
        yield AsyncStorage.setItem(
          "is_verified_badge",
          response.data.data.is_verified_badge
            ? JSON.stringify(response.data.data.is_verified_badge)
            : JSON.stringify(0)
        );
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
        yield AsyncStorage.setItem("userId", JSON.stringify(response.data.data.user_id));
      yield AsyncStorage.setItem("accessToken", response.data.data.token);
        //window.location.assign("/home");
        RootNavigation.navigate('Home')
      }
      yield AsyncStorage.setItem("userId", JSON.stringify(response.data.data.user_id));
      yield AsyncStorage.setItem("accessToken", response.data.data.token);
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(userRegisterFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* forgotPasswordAPI() {
  try {
    const userData = yield select(
      (state) => state.users.forgotPasswordInputData.data
    );

    if (
      !userData.email ||
      userData.email == undefined ||
      userData.email == null
    ) {
      Toast.show({
        type: 'error',
        text2: "Please enter the email address",
      });
    } else {
      const response = yield api.postMethod("forgot_password", userData);
      yield put(forgotPasswordSuccess(response.data));
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
        RootNavigation.navigate('Homes', { screen: 'Login' })
      } else {
        Toast.show({
          type: 'error',
          text2: response.data.error,
        });
      }
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* deleteAccountAPI() {
  try {
    const userData = yield select(
      (state) => state.users.deleteAccount.inputData
    );
    const response = yield api.postMethod("delete_account", userData);
    yield put(deleteAccountSuccess(response.data));
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
        Toast.show({
          type: 'error',
          text2: response.data.error,
        });
      }
  } catch (error) {
    yield put(deleteAccountFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
    }
}

function* registerVerify() {
  try {
    const inputData = yield select(
      (state) => state.users.registerVerify.inputData
    );

    const response = yield api.postMethod("verify_email", inputData);

    if (response.data.success) {
      yield put(registerVerifySuccess(response.data));
      yield AsyncStorage.setItem("userId", response.data.data.user_id);
      yield AsyncStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      yield AsyncStorage.setItem("accessToken", response.data.data.token);
      yield AsyncStorage.setItem("userLoginStatus", true);
      yield AsyncStorage.setItem("user_picture", response.data.data.picture);
      yield AsyncStorage.setItem("username", response.data.data.first_name);
      yield AsyncStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
      window.location.assign("/welcome");
    } else {
      yield put(registerVerifyFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(registerVerifyFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* registerVerifyResend() {
  try {
    const response = yield api.postMethod("regenerate_email_verification_code");

    if (response.data.success) {
      yield put(registerVerifyResendSuccess(response.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(registerVerifyResendFailure(response.data.error));
     Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(registerVerifyResendFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* notificationStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.notificationUpdate.inputData
    );
    const response = yield api.postMethod(
      "notifications_status_update",
      userData
    );
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* verificationBadgeStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.verifyBadgeUpdate.inputData
    );
    const response = yield api.postMethod("verified_badge_status", userData);
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      
      yield AsyncStorage.setItem(
        "is_verified_badge",
        response.data.data.is_verified_badge
          ? response.data.data.is_verified_badge
          : 0
      );
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* getPaymentsAPI() {
  try {
    const response = yield api.postMethod("payments_index");
    if (response.data.success) {
      yield put(fetchPaymentsSuccess(response.data));
    } else {
      yield put(fetchPaymentsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* fetchBlockUsersAPI() {
  try {
    const response = yield api.postMethod("block_users");
    if (response.data.success) {
      yield put(fetchBlockUsersSuccess(response.data.data));
    } else {
      yield put(fetchBlockUsersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchBlockUsersFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveBlockUserAPI() {
  Toast.show({
        type: 'info',
        text2: 'Loading... Please Wait',
      });
  try {
    const inputData = yield select(
      (state) => state.users.saveBlockUser.inputData
    );
    const response = yield api.postMethod("block_users_save", inputData);
    if (response.data.success) {
      yield put(saveBlockUserSuccess(response.data.data));
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
      // RootNavigation.navigate('Home')

    } else {
      yield put(saveBlockUserFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveBlockUserFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_USER_DETAILS_START, getUserDetailsAPI),
    yield takeLatest(UPDATE_USER_DETAILS_START, updateUserDetailsAPI),
    yield takeLatest(LOGIN_START, userLoginAPI),
    yield takeLatest(REGISTER_START, userRegisterAPI),
    yield takeLatest(FORGOT_PASSWORD_START, forgotPasswordAPI),
    yield takeLatest(DELETE_ACCOUNT_START, deleteAccountAPI),
    yield takeLatest(REGISTER_VERIFY_START, registerVerify),
    yield takeLatest(REGISTER_VERIFY_RESEND_START, registerVerifyResend),
    yield takeLatest(
      NOTIFICATION_STATUS_UPDATE_START,
      notificationStatusUpdateAPI
    ),
    yield takeLatest(FETCH_PAYMENTS_START, getPaymentsAPI),
    yield takeLatest(FETCH_BLOCK_USERS_START, fetchBlockUsersAPI),
    yield takeLatest(SAVE_BLOCK_USER_START, saveBlockUserAPI),
    yield takeLatest(
      USER_VERIFY_BADGE_STATUS_START,
      verificationBadgeStatusUpdateAPI
    ),
  ]);
}
