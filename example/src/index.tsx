import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Falcor from 'falcor';
import { FalcorProvider } from 'falcor-react-toolkit';

const model = new Falcor.Model({
  cache: {
    todos: [
      {name: 'task1', done: false},
      {name: 'task2', done: true},
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <FalcorProvider model={model}>
      <App />
    </FalcorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
