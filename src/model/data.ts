interface State {
  message: string;
  messageToSend: string;
  status: { code: number; type: string };
}

export const initialState: State = {
  message: '',
  messageToSend: '',
  status: { code: 0, type: '' },
};
