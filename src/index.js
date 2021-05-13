import React from 'react';
import ReactDOM from 'react-dom';
import "./Index.module.scss";
import App from './components/App';
import Application from './pages/Application'

ReactDOM.render(
  <React.StrictMode>
    {/* <App/> */}
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);

