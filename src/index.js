import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';
import '@fortawesome/fontawesome-free/css/v4-shims.min.css';
import '@fortawesome/fontawesome-free/js/v4-shims.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const elUndo = document.getElementById('icon-undo');
elUndo.parentNode.removeChild(elUndo);
const elRedo = document.getElementById('icon-redo');
elRedo.parentNode.removeChild(elRedo);
const elSetting = document.getElementById('icon-settings');
elSetting.parentNode.removeChild(elSetting);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
