import { call, select, put, takeLatest, all } from 'redux-saga/effects'
import * as RootNavigation from '../../Navigators/Root'
import api from '../../Environment'
import {
  FETCH_WITHDRAWALS_START,
  SEND_WITHDRAW_REQUEST_START,
  CANCEL_WITHDRAW_REQUEST_START,
  FETCH_SINGLE_WITHDRAWALS_START,
  SEARCH_WITHDRAWALS_START,
} from '../Actions/ActionConstant'
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

import {
  fetchWithDrawalsSuccess,
  fetchWithDrawalsFailure,
  sendWithDrawRequestSuccess,
  sendWithDrawRequestFailure,
  cancelWithDrawRequestSuccess,
  cancelWithDrawRequestFailure,
  fetchSingleWithDrawalsSuccess,
  fetchSingleWithDrawalsFailure,
  searchWithDrawalsSuccess,
  searchWithDrawalsFailure,
  fetchWithDrawalsStart,
} from '../Actions/WithDrawAction'
import { fetchWalletDetailsStart } from '../Actions/WalletAction'

function* fetchWithDrawAPI() {
  try {
    const response = yield api.postMethod('withdrawals_index')

    if (response.data.success) {
      yield put(fetchWithDrawalsSuccess(response.data.data))
    } else {
      yield put(fetchWithDrawalsFailure(response.data.error))
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchWithDrawalsFailure(error))
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* sendWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.sendWithDraw.inputData,
    )
    const response = yield api.postMethod(
      'withdrawals_send_request',
      inputData.data,
    )
    if (response.data.success) {
      yield put(sendWithDrawRequestSuccess(response.data))
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      RootNavigation.navigate('Profile', {
        screen: 'Invoice',
        params: {
          data: inputData.data,
          selectedAccount: inputData.selectedAccount,
        },
      })
      yield put(fetchWithDrawalsStart())
      yield put(fetchWalletDetailsStart())
    } else {
      yield put(sendWithDrawRequestFailure(response.data.error))
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(sendWithDrawRequestFailure(error))
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* cancelWithDrawRequestAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.cancelWithDraw.inputData,
    )
    const response = yield api.postMethod(
      'withdrawals_cancel_request',
      inputData,
    )

    if (response.data.success) {
      yield put(cancelWithDrawRequestSuccess(response.data))
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield put(fetchWithDrawalsStart())
    } else {
      yield put(cancelWithDrawRequestFailure(response.data.error))
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(cancelWithDrawRequestFailure(error))
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchSingleWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.singleWithDraw.inputData,
    )
    const response = yield api.postMethod('withdrawals_view', inputData)

    if (response.data.success) {
      yield put(fetchSingleWithDrawalsSuccess(response.data))
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchSingleWithDrawalsFailure(response.data.error))
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleWithDrawalsFailure(error))
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* searchWithDrawAPI() {
  try {
    const inputData = yield select(
      (state) => state.withDraw.searchWithDraw.inputData,
    )
    const response = yield api.postMethod('withdrawals_search', inputData)

    if (response.data.success) {
      yield put(searchWithDrawalsSuccess(response.data))
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(searchWithDrawalsFailure(response.data.error))
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(searchWithDrawalsFailure(error))
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_WITHDRAWALS_START, fetchWithDrawAPI)])
  yield all([
    yield takeLatest(SEND_WITHDRAW_REQUEST_START, sendWithDrawRequestAPI),
  ])
  yield all([
    yield takeLatest(CANCEL_WITHDRAW_REQUEST_START, cancelWithDrawRequestAPI),
  ])
  yield all([
    yield takeLatest(FETCH_SINGLE_WITHDRAWALS_START, fetchSingleWithDrawAPI),
  ])
  yield all([yield takeLatest(SEARCH_WITHDRAWALS_START, searchWithDrawAPI)])
}
