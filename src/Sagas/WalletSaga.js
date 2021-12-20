import { call, select, put, takeLatest, all } from "redux-saga/effects";

import api from "../../Environment";
import {
  FETCH_WALLET_DETAILS_START,
  ADD_MONEY_VIA_BANK_START,
  ADD_MONEY_VIA_CARD_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchWalletDetailsSuccess,
  fetchWalletDetailsFailure,
  addMoneyViaCardSuccess,
  addMoneyViaCardFailure,
  addMoneyViaBankSuccess,
  addMoneyViaBankFailure,
} from "../Actions/WalletAction";
import { checkLogoutStatus } from "../Actions/ErrorAction";

function* fetchWalletDetailsAPI() {
  try {
    const response = yield api.postMethod("wallets_index");
    if (response.data.success) {
      yield put(fetchWalletDetailsSuccess(response.data.data));
      // Do nothing
    } else {
      yield put(checkLogoutStatus(response.data));
      yield put(fetchWalletDetailsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchWalletDetailsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* addMoneyViaCardAPI() {
  try {
    const inputData = yield select((state) => state.wallet.addMoneyInput.data);
    const response = yield api.postMethod(
      "wallets_add_money_by_stripe",
      inputData
    );
    if (response.data.success) {
      yield put(addMoneyViaCardSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/wallet");
    } else {
      yield put(addMoneyViaCardFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(addMoneyViaCardFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* addMoneyViaBankAPI() {
  try {
    const inputData = yield select((state) => state.wallet.addMoneyInput.data);
    const response = yield api.postMethod(
      "wallets_add_money_by_bank_account",
      inputData
    );
    if (response.data.success) {
      yield put(addMoneyViaBankSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/wallet");
    } else {
      yield put(addMoneyViaBankFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(addMoneyViaBankFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_WALLET_DETAILS_START, fetchWalletDetailsAPI),
    yield takeLatest(ADD_MONEY_VIA_BANK_START, addMoneyViaBankAPI),
    yield takeLatest(ADD_MONEY_VIA_CARD_START, addMoneyViaCardAPI),
  ]);
}
