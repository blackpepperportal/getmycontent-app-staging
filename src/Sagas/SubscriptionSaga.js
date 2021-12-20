import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../Navigators/Root';
import {
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  fetchMySubscriptionSuccess,
  fetchMySubscriptionFailure,
  fetchSingleSubscriptionSuccess,
  fetchSingleSubscriptionFailure,
  subscriptionAutoRenewalSuccess,
  subscriptionAutoRenewalFailure,
  subscriptionPaymentStripeFailure,
  subscriptionPaymentStripeSuccess,
  subscriptionPaymentWalletSuccess,
  subscriptionPaymentWalletFailure,
  subscriptionPaymentPaypalSuccess,
  subscriptionPaymentPaypalFailure,
} from "../Actions/SubscriptionAction";

import api from "../../Environment";
import {
  FETCH_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_START,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_AUTO_RENEWAL_START,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SUBSCRIPTION_PAYMENT_PAYPAL_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

function* getSubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_index");
    yield put(fetchSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_history");
    yield put(fetchMySubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* getSingleSubscriptionAPI() {
  try {
    const subscriptionInputData = yield select(
      (state) => state.subscriptions.singleSubInputData.data
    );
    const response = yield api.postMethod(
      "subscriptions_view",
      subscriptionInputData
    );
    yield put(fetchSingleSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* subscriptionPaymentStripeAPI() {
  try {
    Toast.show({
        type: 'info',
        text2: "Loading... Please Wait",
      });
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayStripe.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_stripe",
      subscriptioDetails
    );
    console.log(subscriptioDetails.user_unique_id)
    if (response.data.success) {
      yield put(subscriptionPaymentStripeSuccess(response.data.data));
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
      var reload = new Date().getTime()
      RootNavigation.navigate('Homes', {
        screen: 'CelebrityProfile',
        params: {
          user_unique_id: subscriptioDetails.user_unique_id,
          reload: reload,
        },
      })
      // window.location.assign(`${subscriptioDetails.user_unique_id}`);
    } else {
      yield put(subscriptionPaymentStripeFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(subscriptionPaymentStripeFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* subscriptionPaymentPaypalAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayPaypal.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_paypal",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentPaypalSuccess(response.data.data));
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
      // window.location.assign(`${subscriptioDetails.user_unique_id}`);
    } else {
      yield put(subscriptionPaymentPaypalFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(subscriptionPaymentPaypalFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* subscriptionPaymentWalletAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayWallet.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_wallet",
      subscriptioDetails
    );

    if (response.data.success) {
      yield put(subscriptionPaymentWalletSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(subscriptionPaymentWalletFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(subscriptionPaymentWalletFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* subscriptionAutoRenewalAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subscriptionRenew.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_autorenewal_status",
      subscriptioDetails
    );
    yield put(subscriptionAutoRenewalSuccess(response.data.data));
    if (response.data.success) {
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield put(subscriptionAutoRenewalFailure(response.data.error));
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(subscriptionAutoRenewalFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SUBSCRIPTION_START, getSubscriptionAPI)]);
  yield all([
    yield takeLatest(FETCH_MY_SUBSCRIPTION_START, getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_SUBSCRIPTION_START, getSingleSubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_STRIPE_START,
      subscriptionPaymentStripeAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_WALLET_START,
      subscriptionPaymentWalletAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_AUTO_RENEWAL_START,
      subscriptionAutoRenewalAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_PAYPAL_START,
      subscriptionPaymentPaypalAPI
    ),
  ]);
}
