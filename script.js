const btnWork = document.querySelector('#pomodoro');
const btnBreak = document.querySelector('#break');
const btnStart = document.querySelector('#start');
const btnReset = document.querySelector('#reset');
const timer = document.querySelector('#pomodoro-time');

let totalSeconds = 1500;
let timerId = null;

function updateTimerDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timer.textContent = formattedTime;
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  btnStart.textContent = 'Start';
};

btnWork.addEventListener('click', function() {
  totalSeconds = 1500;
  updateTimerDisplay();

  btnWork.classList.add('active');
  btnBreak.classList.remove('active');

  if(timerId) {
    stopTimer();
  }
});

btnBreak.addEventListener('click', function() {
  totalSeconds = 300;
  updateTimerDisplay();

  btnBreak.classList.add('active');
  btnWork.classList.remove('active');

  if(timerId) {
    stopTimer();
  }
});

btnStart.addEventListener('click', function() {
  if(timerId) {
    stopTimer();
  } else {
    btnStart.textContent = 'Stop';
    timerId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
        stopTimer();
        if(btnWork.classList.contains('active')) {
          totalSeconds = 1500;
        } else {
          totalSeconds = 300;
        }
        updateTimerDisplay();
      }
    }, 1000);
  }
});

btnReset.addEventListener('click', function() {
  stopTimer();

  if(btnWork.classList.contains('active')) {
    totalSeconds = 1500;
  } else {
    totalSeconds = 300;
  }

  updateTimerDisplay();
});


