import { MainSaga as appSaga } from '../src/components/App/service/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([appSaga()]);
}

export default rootSaga;
