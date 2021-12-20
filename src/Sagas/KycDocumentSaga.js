import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  ADD_KYC_DOCUMENT_START,
  GET_KYC_DOCUMENT_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';
import * as RootNavigation from '../../Navigators/Root';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  addKycDocumentSuccess,
  addKycDocumentFailure,
  getKycDocumentSuccess,
  getKycDocumentFailure,
} from "../Actions/KycDocumentAction";

function* addKycDocumentAPI() {
  try {
    const inputData = yield select(
      (state) => state.kycDocument.addKycDocInput.inputData
    );
    if (inputData.document_id && inputData.document_file) {
      const response = yield api.postMethod("documents_save", inputData);
      yield put(addKycDocumentSuccess(response.data.data));
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
        RootNavigation.navigate('Account')
      } else {
        yield put(addKycDocumentFailure(response.data.error));
        Toast.show({
          type: 'error',
          text2: response.data.error,
        });
      }
    } else {
      let errorMessage = "Please upload the file and choose document";
      yield put(addKycDocumentFailure(errorMessage));
      Toast.show({
        type: 'error',
        text2: errorMessage,
      });
    }
  } catch (error) {
    yield put(addKycDocumentFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* getKycDocumentAPI() {
  try {
    const response = yield api.postMethod("documents_list");
    yield put(getKycDocumentSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing..
    } else {
      yield put(getKycDocumentFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(getKycDocumentFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ADD_KYC_DOCUMENT_START, addKycDocumentAPI)]);
  yield all([yield takeLatest(GET_KYC_DOCUMENT_START, getKycDocumentAPI)]);
}
