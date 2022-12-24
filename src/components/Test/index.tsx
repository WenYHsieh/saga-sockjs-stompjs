import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CONNECTION, FETCH_SEND_MESSAGE } from '../../model';

function App() {
  const dispatch = useDispatch();
  const { message } = useSelector((state: any) => ({
    ...state.app,
  }));

  const [msg, setMsg] = React.useState(message);
  const [msgInput, setMsgInput] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMsgInput(value);
  };

  const handleConnection = () => {
    dispatch(FETCH_CONNECTION());
  };
  const handleOnClick = () => {
    dispatch(FETCH_SEND_MESSAGE(msgInput));
    setMsgInput('');
  };

  React.useEffect(() => {
    setMsg(message);
  }, [message]);

  return (
    <div className="App">
      <h3>test connect SockJs api with Redux-saga, stompjs, sockjs-client</h3>
      <button onClick={handleConnection}>建立連線</button>
      <hr />
      <input value={msgInput} onChange={handleOnChange}></input>
      <button onClick={handleOnClick}>發送測試</button>
      <div>result:</div>
      {msg?.map((m: string, index: number) => {
        return <div key={index}>{m}</div>;
      })}
    </div>
  );
}

export default App;
