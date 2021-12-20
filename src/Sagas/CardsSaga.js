import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import Toast from 'react-native-toast-message';
import {
  fetchCardDetailsSuccess,
  fetchCardDetailsFailure,
  deleteCardSuccess,
  deleteCardFailure,
  selectDefaultCardSuccess,
  selectDefaultCardFailure,
  fetchCardDetailsStart,
} from "../Actions/CardsAction";

import api from "../../Environment";
import {
  FETCH_CARD_DETAILS_START,
  DELETE_CARD_START,
  SELECT_DEFAULT_CARD_START,
} from "../Actions/ActionConstant";

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";

function* getCardDetailsAPI() {
  try {
    const response = yield api.postMethod("cards_list");
    if (response.data.success) {
      yield put(fetchCardDetailsSuccess(response.data.data));
    } else {
      yield put(fetchCardDetailsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchCardDetailsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deleteCardAPI() {
  try {
    const deleteCard = yield select((state) => state.cards.deleteCard.data);
    const response = yield api.postMethod("cards_delete", deleteCard);
    yield put(deleteCardSuccess(response.data.data));
    if (response.data.success) {
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield put(fetchCardDetailsStart());
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteCardFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* selectDefaultCardAPI() {
  try {
    const selectDefaultCard = yield select(
      (state) => state.cards.selectDefaultCard.inputData
    );
    const response = yield api.postMethod("cards_default", selectDefaultCard);
    yield put(selectDefaultCardSuccess(response.data.data));
    if (response.data.success) {
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      yield put(fetchCardDetailsStart());
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(selectDefaultCardFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_CARD_DETAILS_START, getCardDetailsAPI)]);
  yield all([yield takeLatest(DELETE_CARD_START, deleteCardAPI)]);
  yield all([
    yield takeLatest(SELECT_DEFAULT_CARD_START, selectDefaultCardAPI),
  ]);
}
