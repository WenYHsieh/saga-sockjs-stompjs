import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SEND_MESSAGE } from '../../model';
import './style.scss';

const RandomChatRoom = () => {
  const dispatch = useDispatch();
  const { message: inComingMessage } = useSelector((state: any) => ({
    ...state.app,
  }));

  const [messages, setMessages] = React.useState([
    { message: '今天晚餐要吃啥？', isSelf: true },
    { message: 'ㄅ知道...', isSelf: false },
  ]);
  const [msgInput, setMsgInput] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMsgInput(value);
  };

  const handleOnClick = () => {
    if (!msgInput) return;
    dispatch(FETCH_SEND_MESSAGE(msgInput));
  };

  React.useEffect(() => {
    if (!inComingMessage) return;
    setMessages((messages) => {
      return [
        ...messages,
        { message: inComingMessage, isSelf: inComingMessage === msgInput },
      ];
    });
    setMsgInput('');
  }, [inComingMessage]);

  return (
    <>
      <div className="container">
        <div className="messages__wrapper">
          {messages?.map((item, index: number) => {
            return (
              <div
                key={index}
                className={`${item?.isSelf ? 'selfMessage' : ''} message`}>
                {item?.message}
              </div>
            );
          })}
        </div>
        <div className="input__wrapper">
          <input value={msgInput} onChange={handleOnChange}></input>
          <button onClick={handleOnClick}>send</button>
        </div>
      </div>
    </>
  );
};

export default RandomChatRoom;
