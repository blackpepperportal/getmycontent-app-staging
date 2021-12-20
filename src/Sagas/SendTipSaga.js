import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  sendTipStripeFailure,
  sendTipStripeSuccess,
  sendTipWalletFailure,
  sendTipWalletSuccess,
  sendTipPaypalSuccess,
  sendTipPaypalFailure,
} from "../Actions/SendTipAction";
import {
  SEND_TIP_BY_STRIPE_START,
  SEND_TIP_BY_WALLET_START,
  SEND_TIP_BY_PAYPAL_START,
} from "../Actions/ActionConstant";

function* sendTipStripeAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipStripe.inputData);
    const response = yield api.postMethod("tips_payment_by_stripe", inputData);
    if (response.data.success) {
      yield put(sendTipStripeSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(sendTipStripeFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(sendTipStripeFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* sendTipPaypalAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipPaypal.inputData);
    const response = yield api.postMethod("tips_payment_by_paypal", inputData);
    if (response.data.success) {
      yield put(sendTipPaypalSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(sendTipPaypalFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(sendTipPaypalFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* sendTipWalletAPI() {
  try {
    const inputData = yield select((state) => state.tip.tipWallet.inputData);
    const response = yield api.postMethod("tips_payment_by_wallet", inputData);
    if (response.data.success) {
      yield put(sendTipWalletSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(sendTipWalletFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(sendTipWalletFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SEND_TIP_BY_STRIPE_START, sendTipStripeAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_WALLET_START, sendTipWalletAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_PAYPAL_START, sendTipPaypalAPI)]);
}
