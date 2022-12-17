interface State {
  message: Array<string>;
  messageToSend: string;
  status: { code: number; type: string };
}

export const initialState: State = {
  message: new Array(),
  messageToSend: '',
  status: { code: 0, type: '' },
};
