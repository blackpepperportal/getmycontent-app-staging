import { call, select, put, takeLatest, all } from "redux-saga/effects";
import Toast from 'react-native-toast-message';
import * as RootNavigation from '../../Navigators/Root';
import api from "../../Environment";
import {
  ADD_BANK_ACCOUNT_START,
  GET_BANK_ACCOUNT_START,
  MAKE_DEFAULT_BANK_ACCOUNT_START,
  DELETE_BANK_ACCOUNT_START,
  FETCH_SINGLE_BANK_ACCOUNT_START,
} from "../Actions/ActionConstant";
// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  addBankAccountSuccess,
  addBankAccountFailure,
  getBankAccountSuccess,
  getBankAccountFailure,
  getBankAccountStart,
  makeDefaultBankAccountSuccess,
  makeDefaultBankAccountFailure,
  deleteBankAccountSuccess,
  deleteBankAccountFailure,
  fetchSingleBankAccountSuccess,
  fetchSingleBankAccountFailure,
} from "../Actions/BankAccountAction";

function* addBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.addBankAccountInput.inputData
    );
    const response = yield api.postMethod("billing_accounts_save", inputData);
    if (response.data.success) {
      yield put(addBankAccountSuccess(response.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/billing-accounts");
      RootNavigation.navigate('Account')
    } else {
      yield put(addBankAccountFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(addBankAccountFailure(error));
    Toast.show({
      type: 'error',
      text2: error.message,
    });
  }
}

function* getBankAccountAPI() {
  try {
    const response = yield api.postMethod("billing_accounts_list");

    if (response.data.success) {
      yield put(getBankAccountSuccess(response.data.data));
    } else {
      yield put(getBankAccountFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(getBankAccountFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* makeDefaultBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.makeDefault.inputData
    );
    const response = yield api.postMethod(
      "billing_accounts_default",
      inputData
    );

    if (response.data.success) {
      yield put(makeDefaultBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(makeDefaultBankAccountFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(makeDefaultBankAccountFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deleteAccountBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.deleteAccount.inputData
    );
    const response = yield api.postMethod("billing_accounts_delete", inputData);
    if (response.data.success) {
      yield put(deleteBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/billing-accounts");
    } else {
      yield put(deleteBankAccountFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteBankAccountFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchSingleBankAccountAPI() {
  try {
    const inputData = yield select(
      (state) => state.bankAccount.singleAccount.inputData
    );
    const response = yield api.postMethod("users_accounts_save", inputData);

    if (response.data.success) {
      yield put(fetchSingleBankAccountSuccess(response.data));
      yield put(getBankAccountStart());
      Toast.show({
        type: 'success',
        text2: response.data.error,
      });
    } else {
      yield put(fetchSingleBankAccountFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleBankAccountFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ADD_BANK_ACCOUNT_START, addBankAccountAPI)]);
  yield all([yield takeLatest(GET_BANK_ACCOUNT_START, getBankAccountAPI)]);
  yield all([
    yield takeLatest(
      MAKE_DEFAULT_BANK_ACCOUNT_START,
      makeDefaultBankAccountAPI
    ),
  ]);
  yield all([
    yield takeLatest(DELETE_BANK_ACCOUNT_START, deleteAccountBankAccountAPI),
  ]);
  yield all([
    yield takeLatest(
      FETCH_SINGLE_BANK_ACCOUNT_START,
      fetchSingleBankAccountAPI
    ),
  ]);
}
