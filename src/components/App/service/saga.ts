import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import sockjs from 'sockjs-client';
import Stomp from 'stompjs';
import {
  FETCH_CONNECTION,
  FETCH_SEND_MESSAGE,
  SET_MESSAGE,
  SET_STATUS,
} from '.';

let stompClient: Stomp.Client;

function* connectSockjs() {
  try {
    // 連接 sockjs api
    const sock = new sockjs('https://localhost:8888/wolf-stomp');
    stompClient = Stomp.over(sock);

    // 設定連接成功和失敗的 callback
    stompClient.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/public', (message) => {
          put(SET_MESSAGE(message));
        });
      },
      (error) => {
        console.error('connection failed: ' + error);
      }
    );
  } catch (error) {
    console.error('Failed: ' + error);
  }
}
function* sendMessage(action: PayloadAction<string>) {
  try {
    const message = action.payload;

    stompClient.send(
      '/app/sendMessage',
      {},
      JSON.stringify({ clientName: message })
    );

    yield put(SET_STATUS({ code: 200, type: 'send' }));
    alert('發送訊息成功');
  } catch (error) {
    console.error('發送訊息錯誤', error);
  }
}

function* MainSaga() {
  yield takeLatest(FETCH_CONNECTION, connectSockjs);
  yield takeLatest(FETCH_SEND_MESSAGE, sendMessage);
}

export { MainSaga };
