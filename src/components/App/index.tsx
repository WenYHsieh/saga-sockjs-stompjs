import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CONNECTION, FETCH_SEND_MESSAGE } from './service';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state: any) => ({
    ...state.app,
  }));

  const handleConnection = () => {
    dispatch(FETCH_CONNECTION());
  };
  const handleOnClick = () => {
    dispatch(FETCH_SEND_MESSAGE('這是測試文字'));
  };
  return (
    <div className="App">
      <div>test connect SockJs api with Redux-saga, stompjs, sockjs-client</div>
      <button onClick={handleConnection}>建立連線</button>
      <button onClick={handleOnClick}>發送測試</button>
      <div>result: {message}</div>
    </div>
  );
}

export default App;
