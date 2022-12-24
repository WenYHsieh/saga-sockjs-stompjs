import { MainSaga as appSaga } from './components/App/model/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([appSaga()]);
}

export default rootSaga;
