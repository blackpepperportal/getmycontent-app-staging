import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  DELETE_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRODUCTS_PRO_OWNER_START,
  FETCH_PRO_CATE_PRO_OWNER_START,
  FETCH_PRO_IMAGE_PRO_OWNER_START,
  FETCH_PRO_SUBCATE_PRO_OWNER_START,
  FETCH_SINGLE_PRO_OWNER_START,
  PRO_SEARCH_PRO_OWNER_START,
  SAVE_PRO_IMAGE_PRO_OWNER_START,
  SAVE_PRO_OWNER_START,
  SET_VISIBILITY_PRO_OWNER_START,
  UPDATE_AVAILABILITY_PRO_OWNER_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";

// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  deleteProImageProOwnerFailure,
  deleteProImageProOwnerSuccess,
  fetchProCateProOwnerFailure,
  fetchProCateProOwnerSuccess,
  fetchProductsProOwnerFailure,
  fetchProductsProOwnerSuccess,
  fetchProImageProOwnerFailure,
  fetchProImageProOwnerSuccess,
  fetchProSubCateProOwnerFailure,
  fetchProSubCateProOwnerSuccess,
  fetchSingleProOwnerFailure,
  fetchSingleProOwnerSuccess,
  proSearchProOwnerFailure,
  proSearchProOwnerSuccess,
  saveProImageProOwnerFailure,
  saveProImageProOwnerSuccess,
  saveProOwnerFailure,
  saveProOwnerSuccess,
  setVisibilityProOwnerFailure,
  setVisibilityProOwnerSuccess,
  updateAvailabiltyProOwnerFailure,
  updateAvailabiltyProOwnerSuccess,
} from "../Actions/ProductOwnerAction";

function* saveProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProduct.inputData
    );
    const response = yield api.postMethod("user_products_save", inputData);
    if (response.data.success) {
      yield put(saveProOwnerSuccess(response.data.data));
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
      yield put(saveProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(saveProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchSingleProProOwnerAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.singlePro.inputData
    );
    const response = yield api.postMethod("user_products_view", inputData);
    if (response.data.success) {
      yield put(fetchSingleProOwnerSuccess(response.data.data));
    } else {
      yield put(fetchSingleProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSingleProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* setVisibleAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.setVisible.inputData
    );
    const response = yield api.postMethod(
      "user_products_set_visibility",
      inputData
    );
    if (response.data.success) {
      yield put(setVisibilityProOwnerSuccess(response.data.data));
    } else {
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
      yield put(setVisibilityProOwnerFailure(response.data.error));
    }
  } catch (error) {
    yield put(setVisibilityProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* updateAvailabiltyAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.updateAva.inputData
    );
    const response = yield api.postMethod(
      "user_products_update_availability",
      inputData
    );
    if (response.data.success) {
      yield put(updateAvailabiltyProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(updateAvailabiltyProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(updateAvailabiltyProOwnerFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchProductsAPI() {
  try {
    const response = yield api.postMethod("user_products");

    if (response.data.success) {
      yield put(fetchProductsProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchProductsProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchProductsProOwnerFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchProCategoryAPI() {
  try {
    const response = yield api.postMethod("product_categories");

    if (response.data.success) {
      yield put(fetchProCateProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchProCateProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchProCateProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchProSubCategoryAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSubCategory.inputData
    );
    const response = yield api.postMethod("product_sub_categories", inputData);
    if (response.data.success) {
      yield put(fetchProSubCateProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchProSubCateProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchProSubCateProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* proSearchAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proSearch.inputData
    );
    const response = yield api.postMethod("user_products_search", inputData);
    if (response.data.success) {
      yield put(proSearchProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(proSearchProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(proSearchProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.proImage.inputData
    );
    const response = yield api.postMethod("user_product_pictures", inputData);
    if (response.data.success) {
      yield put(fetchProImageProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(fetchProImageProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchProImageProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.saveProImage.inputData
    );
    const response = yield api.postMethod(
      "user_product_pictures_save",
      inputData
    );
    if (response.data.success) {
      yield put(saveProImageProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(saveProImageProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveProImageProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* delProImageAPI() {
  try {
    const inputData = yield select(
      (state) => state.proOwner.delProImage.inputData
    );
    const response = yield api.postMethod(
      "user_product_pictures_delete",
      inputData
    );
    if (response.data.success) {
      yield put(deleteProImageProOwnerSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(deleteProImageProOwnerFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deleteProImageProOwnerFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_PRO_OWNER_START, saveProOwnerAPI)]);
  yield all([
    yield takeLatest(FETCH_SINGLE_PRO_OWNER_START, fetchSingleProProOwnerAPI),
  ]);
  yield all([yield takeLatest(SET_VISIBILITY_PRO_OWNER_START, setVisibleAPI)]);
  yield all([
    yield takeLatest(UPDATE_AVAILABILITY_PRO_OWNER_START, updateAvailabiltyAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRODUCTS_PRO_OWNER_START, fetchProductsAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRO_CATE_PRO_OWNER_START, fetchProCategoryAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_PRO_SUBCATE_PRO_OWNER_START, fetchProSubCategoryAPI),
  ]);
  yield all([yield takeLatest(PRO_SEARCH_PRO_OWNER_START, proSearchAPI)]);
  yield all([
    yield takeLatest(FETCH_PRO_IMAGE_PRO_OWNER_START, fetchProImageAPI),
  ]);
  yield all([
    yield takeLatest(SAVE_PRO_IMAGE_PRO_OWNER_START, saveProImageAPI),
  ]);
  yield all([
    yield takeLatest(DELETE_PRO_IMAGE_PRO_OWNER_START, delProImageAPI),
  ]);
}
