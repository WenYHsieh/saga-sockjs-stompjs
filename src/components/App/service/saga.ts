import { PayloadAction } from '@reduxjs/toolkit';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, takeEvery, call, take } from 'redux-saga/effects';
import sockjs from 'sockjs-client';
import Stomp from 'stompjs';
import {
  FETCH_CONNECTION,
  FETCH_SEND_MESSAGE,
  SET_MESSAGE,
  SET_STATUS,
} from '.';

const WOLF_STOMP_URL = 'http://localhost:8080/stomp';
let stompClient: Stomp.Client;

function createChannel() {
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
        setTimeout(createChannel, 5000);
      }
    );

    return () =>
      stompClient.disconnect(() => {
        alert('連線已中斷');
      });
  });
}

function* websocketSaga() {
  const channel = createChannel();
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

function* MainSaga() {
  yield takeLatest(FETCH_CONNECTION, websocketSaga);
  yield takeLatest(FETCH_SEND_MESSAGE, sendMessage);
}

export { MainSaga };
