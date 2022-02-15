const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let startTime;
let timeoutid;
let elapsedTime = 0;

function countUp(){
    const d =new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getHours() - 9).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${h}:${m}:${s}:${ms}`;
    timeoutid = setTimeout(() => {countUp();}, 10);
  }
  
  //ボタンの活性・非活性
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  // ボタンを'初期'状態とする
  setButtonStateInitial();

  // Startボタン
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    // ボタンをタイマー'動作中'状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // Stopボタン
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    // タイマーを'停止中'状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  });

  // Resetボタン
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    // ボタンを'初期'状態とする
    setButtonStateInitial()
    timer.textContent = '00:00:00:000';
    elapsedTime = 0;
  });
