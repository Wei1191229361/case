import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './practice.scss';

// 答题区域react渲染
ReactDOM.render(<App />, document.getElementById('app'));

// 非答题区域
function test() {
  console.log('test');
}
test();
