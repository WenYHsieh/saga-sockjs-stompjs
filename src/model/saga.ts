import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { eventChannel, runSaga } from 'redux-saga';
import { takeLatest, put, call, take } from 'redux-saga/effects';
import sockjs from 'sockjs-client';
import Stomp from 'stompjs';
import {
  FETCH_CHANNEL_CONNECTION,
  FETCH_CONNECTION,
  FETCH_SEND_MESSAGE,
  SET_MESSAGE,
  SET_STATUS,
} from '.';
import { store } from '../store';

const WOLF_STOMP_URL = 'http://localhost:8080/stomp';
let stompClient: Stomp.Client;

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createPublicChannel = () => {
  return eventChannel((emitter) => {
    const socket = new sockjs(WOLF_STOMP_URL);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe('/topic/public', (message) => {
          const response = JSON.parse(message.body);
          emitter(response);
        });
      },
      (error) => {
        console.error(error);
        alert('連線出錯，會在 5 後重新連線');
        runSaga(
          {
            dispatch: (FETCH_CONNECTION: AnyAction) =>
              store.dispatch(FETCH_CONNECTION),
          },
          fetchConnectionSaga
        );
      }
    );

    return () =>
      stompClient.disconnect(() => {
        alert('連線已中斷');
      });
  });
};

function* fetchConnectionSaga() {
  yield call(delay, 5000); // 等待 5 秒
  yield put(FETCH_CONNECTION()); // 發送 FETCH_CONNECTION action
}

function* websocketSaga() {
  const channel = createPublicChannel();
  while (true) {
    const response: { message: string } = yield take(channel);
    yield put(SET_MESSAGE(response?.message));
  }
}

function* sendMessage(action: PayloadAction<string>) {
  try {
    // 沒有成功建立連線，不發送訊息
    if (!stompClient.connected) throw Error('尚未建立連線成功，不可發訊息');

    const message = action.payload;

    stompClient.send(
      '/app/sendMessage',
      {},
      JSON.stringify({ clientName: message })
    );

    yield put(SET_STATUS({ code: 200, type: 'send' }));
    console.log('發送訊息成功');
  } catch (error) {
    console.error('發送訊息錯誤', error);
  }
}

const createPrivateChannel = (userName: string) => {
  return eventChannel((emitter) => {
    const socket = new sockjs(`${WOLF_STOMP_URL}?userName=${userName}`);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe('/user/queue/notifications', (message) => {
          const response = JSON.parse(message.body);
          emitter(response);
        });
      },
      (error) => {
        console.error(error);
        alert('連線出錯，會在 5 後重新連線');
        runSaga(
          {
            dispatch: (FETCH_CHANNEL_CONNECTION: AnyAction) =>
              store.dispatch(FETCH_CHANNEL_CONNECTION),
          },
          fetchPrivateConnectionSaga,
          userName
        );
      }
    );

    return () =>
      stompClient.disconnect(() => {
        alert('連線已中斷');
      });
  });
};

function* websocketChannelSaga(action: PayloadAction<string>) {
  const channel = createPrivateChannel(action.payload);
  while (true) {
    const response: { message: string } = yield take(channel);
    yield put(SET_MESSAGE(response?.message));
  }
}

function* fetchPrivateConnectionSaga(userName: string) {
  yield call(delay, 5000); // 等待 5 秒
  yield put(FETCH_CHANNEL_CONNECTION(userName)); // 發送 FETCH_CONNECTION action
}

function* MainSaga() {
  yield takeLatest(FETCH_CONNECTION, websocketSaga);
  yield takeLatest(FETCH_SEND_MESSAGE, sendMessage);
  yield takeLatest(FETCH_CHANNEL_CONNECTION, websocketChannelSaga);
}

export { MainSaga };
