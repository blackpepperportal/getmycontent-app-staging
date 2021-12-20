import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import * as RootNavigation from '../../Navigators/Root';
import {
  CHANGE_POST_STATUS_START,
  DELETE_POST_START,
  FETCH_POSTS_START,
  FETCH_SINGLE_POST_START,
  POST_FILE_UPLOAD_START,
  SAVE_POST_START,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_WALLET_START,
  SAVE_REPORT_POST_START,
  FETCH_REPORT_POSTS_START,
  PPV_PAYMENT_PAYPAL_START,
} from "../Actions/ActionConstant";
import Toast from 'react-native-toast-message';

// import { createNotification } from "react-redux-notify";
// import {
//   getSuccessNotificationMessage,
//   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  changePostStatusFailure,
  changePostStatusSuccess,
  deletePostFailure,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsSuccess,
  fetchSinglePostFailure,
  fetchSinglePostSuccess,
  postFileUploadFailure,
  postFileUploadSuccess,
  savePostFailure,
  savePostSuccess,
  PPVPaymentStripeFailure,
  PPVPaymentStripeSuccess,
  PPVPaymentWalletSuccess,
  PPVPaymentWalletFailure,
  saveReportPostSuccess,
  saveReportPostFailure,
  fetchReportPostsSuccess,
  fetchReportPostsFailure,
  PPVPaymentPaypalFailure,
  PPVPaymentPaypalSuccess,
} from "../Actions/PostAction";

function* savePostAPI() {
  try {
    const inputData = yield select((state) => state.post.savePost.inputData);

    if (!inputData.content && !inputData.post_files) {
      yield put(savePostFailure("Please fill the content"));
      Toast.show({
        type: 'error',
        text2: "Please fill the content",
      });
    } else {
      const response = yield api.postMethod("posts_save_for_owner", inputData);
      if (response.data.success) {
        yield put(savePostSuccess(response.data.data));
        Toast.show({
          type: 'success',
          text2: response.data.message,
        });
        // window.location.assign("/post/" + response.data.data.post_unique_id);
        RootNavigation.navigate('Profile', { screen: 'MyProfile' })
      } else {
        yield put(savePostFailure(response.data.error));
        Toast.show({
          type: 'error',
          text2: response.data.error,
        });
      }
    }
  } catch (error) {
    yield put(savePostFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchPostsAPI() {
  try {
    const response = yield api.postMethod("posts_for_owner");
    if (response.data.success) {
      yield put(fetchPostsSuccess(response.data.data));
    } else {
      yield put(fetchPostsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchPostsFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchSinglePostAPI() {
  try {
    const inputData = yield select((state) => state.post.singlePost.inputData);
    const response = yield api.postMethod("posts_view_for_others", inputData);
    if (response.data.success) {
      yield put(fetchSinglePostSuccess(response.data.data));
    } else {
      yield put(fetchSinglePostFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchSinglePostFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* deletePostAPI() {
  try {
    const inputData = yield select((state) => state.post.delPost.inputData);
    const response = yield api.postMethod("posts_delete_for_owner", inputData);
    if (response.data.success) {
      yield put(deletePostSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/profile");
    } else {
      yield put(deletePostFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(deletePostFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* changePostStatusAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.changePostStatus.inputData
    );
    const response = yield api.postMethod("posts_status", inputData);
    if (response.data.success) {
      yield put(changePostStatusSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(changePostStatusFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(changePostStatusFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* postFileUploadAPI() {
  try {
    Toast.show({
      type: 'info',
      text2: "Uploading... Please Wait",
    });
    const inputData = yield select((state) => state.post.fileUpload.inputData);
    const response = yield api.postMethod("post_files_upload", inputData);
    if (response.data.success) {
      yield put(postFileUploadSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(postFileUploadFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(postFileUploadFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* PPVPaymentPaypalAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayPal.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_paypal",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentPaypalSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentPaypalFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(PPVPaymentPaypalFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* PPVPaymentStripeAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayStripe.inputData
    );
    Toast.show({
        type: 'info',
        text2: 'Loading... Please wait',
      });
    const response = yield api.postMethod(
      "posts_payment_by_stripe",
      paymentInputData
    );
    if (response.data.success) {
      yield put(PPVPaymentStripeSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      RootNavigation.navigate('Homes', {
        screen: 'SinglePost',
        params: {
          'notUnlock': false,
        }
      })
    } else {
      yield put(PPVPaymentStripeFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(PPVPaymentStripeFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* PPVPaymentWalletAPI() {
  try {
    const paymentInputData = yield select(
      (state) => state.post.ppvPayWallet.inputData
    );
    const response = yield api.postMethod(
      "posts_payment_by_wallet",
      paymentInputData
    );

    if (response.data.success) {
      yield put(PPVPaymentWalletSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
      // window.location.assign("/post/" + response.data.data.post.post_unique_id);
    } else {
      yield put(PPVPaymentWalletFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(PPVPaymentWalletFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchReportPostsAPI() {
  try {
    const response = yield api.postMethod("report_posts");
    if (response.data.success) {
      yield put(fetchReportPostsSuccess(response.data.data));
    } else {
      yield put(fetchReportPostsFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchReportPostsFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* saveReportPostAPI() {
  try {
    const inputData = yield select(
      (state) => state.post.saveReportPost.inputData
    );
    const response = yield api.postMethod("report_posts_save", inputData);
    if (response.data.success) {
      yield put(saveReportPostSuccess(response.data.data));
      Toast.show({
        type: 'success',
        text2: response.data.message,
      });
    } else {
      yield put(saveReportPostFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveReportPostFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_START, savePostAPI)]);
  yield all([yield takeLatest(FETCH_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_POST_START, fetchSinglePostAPI)]);
  yield all([yield takeLatest(DELETE_POST_START, deletePostAPI)]);
  yield all([yield takeLatest(CHANGE_POST_STATUS_START, changePostStatusAPI)]);
  yield all([yield takeLatest(POST_FILE_UPLOAD_START, postFileUploadAPI)]);

  yield all([yield takeLatest(PPV_PAYMENT_STRIPE_START, PPVPaymentStripeAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_WALLET_START, PPVPaymentWalletAPI)]);
  yield all([yield takeLatest(SAVE_REPORT_POST_START, saveReportPostAPI)]);
  yield all([yield takeLatest(FETCH_REPORT_POSTS_START, fetchPostsAPI)]);
  yield all([yield takeLatest(PPV_PAYMENT_PAYPAL_START, PPVPaymentPaypalAPI)]);
}
