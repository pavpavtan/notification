/* eslint-disable no-console */
import 'rc-notification/assets/index.less';
import Notification from 'rc-notification';
import React from 'react';
import ReactDOM from 'react-dom';
let notification = null;
Notification.newInstance({}, (n) => notification = n);

function simpleFn() {
  notification.notice({
    content: <span>simple show</span>,
    onClose() {
      console.log('simple close');
    },
  });
}

function durationFn() {
  notification.notice({
    content: <span>can not close...</span>,
    duration: null,
  });
}

function closableFn() {
  notification.notice({
    content: <span>closable</span>,
    duration: null,
    onClose() {
      console.log('closable close');
    },
    closable: true,
    onClick() {
      console.log('clicked!!!');
    },
  });
}

function close(key) {
  notification.removeNotice(key);
}

function manualClose() {
  const key = Date.now();
  notification.notice({
    content: <div>
      <p>click below button to close</p>
      <button onClick={close.bind(null, key)}>close</button>
    </div>,
    key,
    duration: null,
  });
}

let counter = 0;
let intervalKey;
function updatableFn() {
  if (counter !== 0) {
    return;
  }

  const key = 'updatable-notification';
  const initialProps = {
    content: `Timer: ${counter}s`,
    key,
    duration: null,
    closable: true,
    onClose() {
      clearInterval(intervalKey);
      counter = 0;
    },
  };

  notification.notice(initialProps);
  intervalKey = setInterval(() => {
    notification.notice({ ...initialProps, content: `Timer: ${++counter}s` });
  }, 1000);
}

let notification2 = null;
const clearPath = 'M793 242H366v-74c0-6.7-7.7-10.4-12.9' +
  '-6.3l-142 112c-4.1 3.2-4.1 9.4 0 12.6l142 112c' +
  '5.2 4.1 12.9 0.4 12.9-6.3v-74h415v470H175c-4.4' +
  ' 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-' +
  '28.7 64-64V306c0-35.3-28.7-64-64-64z';

const getSvg = (path, props = {}, align = false) => {
  return (
    <i {...props}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={align ? { verticalAlign: '-.125em ' } : {}}
      >
        <path d={path} p-id="5827"></path>
      </svg>
    </i>
  );
};
Notification.newInstance({
  closeIcon: getSvg(clearPath, {}, true),
}, (n) => {
  notification2 = n;
});
function customCloseIconFn() {
  notification2.notice({
    content: 'It use custom close icon',
    closable: true,
    duration: 0,
    closeIcon: 'test',
  });
}

ReactDOM.render(<div>
  <div>
    <button onClick={simpleFn}>simple show</button>
    <button onClick={durationFn}>duration=0</button>
    <button onClick={closableFn}>closable</button>
    <button onClick={manualClose}>controlled close</button>
    <button onClick={updatableFn}>updatable</button>
    <div>
      <button onClick={customCloseIconFn}>custom close icon</button>
    </div>
  </div>
</div>, document.getElementById('__react-content'));
