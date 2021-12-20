import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import Toast from 'react-native-toast-message';

// // import { createNotification } from "react-redux-notify";
// // import {
// //   getSuccessNotificationMessage,
// //   getErrorNotificationMessage,
// } from "../../Components/Helper/NotificationMessage";
import {
  fetchChatMessageFailure,
  fetchChatMessageStart,
  fetchChatMessageSuccess,
  searchChatUsersStart,
  searchChatUsersSuccess,
  searchChatUsersFailure,
  fetchChatUsersFailure,
  fetchChatUsersSuccess,
  saveChatUserFailure,
  saveChatUserStart,
  saveChatUserSuccess,
} from "../Actions/ChatAction";
import {
  FETCH_CHAT_MESSAGE_START,
  FETCH_CHAT_USERS_START,
  SEARCH_CHAT_USERS_START,
  SAVE_CHAT_USERS_START,
} from "../Actions/ActionConstant";

function* fetchChatUserAPI() {
  try {
    const response = yield api.postMethod("chat_users");
    if (response.data.success) {
      yield put(fetchChatUsersSuccess(response.data.data));
      if (response.data.data.users.length > 0)
        yield put(
          fetchChatMessageStart({
            to_user_id: response.data.data.users[0].to_user_id,
            from_user_id: response.data.data.users[0].from_user_id,
          })
        );
    } else {
      yield put(fetchChatUsersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchChatUsersFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* searchChatUserAPI() {
  try {
    const inputData = yield select((state) => state.chat.searchUsers.inputData);
    const response = yield api.postMethod("chat_users_search",inputData);
    console.log(response.data.data)
    if (response.data.success) {
      yield put(searchChatUsersSuccess(response.data.data));
    } else {
      yield put(searchChatUsersFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(searchChatUsersFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

function* fetchChatMessageAPI() {
  try {
    const inputData = yield select((state) => state.chat.messages.inputData);
    const response = yield api.postMethod("chat_messages", inputData);
    if (response.data.success) {
      yield put(fetchChatMessageSuccess(response.data.data));
    } else {
      yield put(fetchChatMessageFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(fetchChatMessageFailure(error));
      Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}
function* saveChatUserAPI() {
  try {
    const inputData = yield select(
      (state) => state.chat.saveChatUser.inputData
    );
    const response = yield api.postMethod("chat_users_save", inputData);
    if (response.data.success) {
      yield put(saveChatUserSuccess(response.data.data));
      window.location.assign("/inbox");

    } else {
      yield put(saveChatUserFailure(response.data.error));
      Toast.show({
        type: 'error',
        text2: response.data.error,
      });
    }
  } catch (error) {
    yield put(saveChatUserFailure(error));
    Toast.show({
        type: 'error',
        text2: error.message,
      });
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_CHAT_USERS_START, fetchChatUserAPI)]);
  yield all([yield takeLatest(SEARCH_CHAT_USERS_START, searchChatUserAPI)]);
  yield all([yield takeLatest(FETCH_CHAT_MESSAGE_START, fetchChatMessageAPI)]);
  yield all([yield takeLatest(SAVE_CHAT_USERS_START, saveChatUserAPI)]);
}
