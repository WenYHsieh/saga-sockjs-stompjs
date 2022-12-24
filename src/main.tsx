import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import Routing from './Routing';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App />  */}
      <Router>
        <Routing />
      </Router>
    </Provider>
  </React.StrictMode>
);
