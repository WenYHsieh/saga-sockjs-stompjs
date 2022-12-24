import { MainSaga as appSaga } from './model/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([appSaga()]);
}

export default rootSaga;
