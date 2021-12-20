import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";
import {
  FETCH_ALL_TRANSACTION_START,
  FETCH_SENT_PAYMENT_TRANSACTION_START,
  FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
  FETCH_DEPOSIT_TRANSACTION_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchAllTransactionSuccess,
  fetchAllTransactionFailure,
  fetchSentPaymentTransactionSuccess,
  fetchSentPaymentTransactionFailure,
  fetchReceivedPaymentTransactionSuccess,
  fetchReceivedPaymentTransactionFailure,
  fetchDepositTransactionSuccess,
  fetchDepositTransactionFailure,
} from "../Actions/TransactionAction";
import { checkLogoutStatus } from "../Actions/ErrorAction";

function* fetchAllTransactionAPI() {
  try {
    const response = yield api.postMethod("wallets_history");
    if (response.data.success) {
      yield put(fetchAllTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchAllTransactionFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchAllTransactionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchSentPaymentTransAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_sent");
    if (response.data.success) {
      yield put(fetchSentPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchSentPaymentTransactionFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSentPaymentTransactionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchReceivedPayTransAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_received");
    if (response.data.success) {
      yield put(fetchReceivedPaymentTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchReceivedPaymentTransactionFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchReceivedPaymentTransactionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchDepositTransactionAPI() {
  try {
    const response = yield api.postMethod("wallets_history_for_add");
    if (response.data.success) {
      yield put(fetchDepositTransactionSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchDepositTransactionFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchDepositTransactionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_ALL_TRANSACTION_START, fetchAllTransactionAPI),
    yield takeLatest(
      FETCH_SENT_PAYMENT_TRANSACTION_START,
      fetchSentPaymentTransAPI
    ),
    yield takeLatest(
      FETCH_RECEIVED_PAYMENT_TRANSACTION_START,
      fetchReceivedPayTransAPI
    ),
    yield takeLatest(
      FETCH_DEPOSIT_TRANSACTION_START,
      fetchDepositTransactionAPI
    ),
  ]);
}
