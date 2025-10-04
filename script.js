// Time variables declaration
let ms = 0;     
let sec = 0;    
let min = 0;    
let hour = 0;     
let running = false;
let interval;

//DOM Elements
const display = document.getElementById('lenz');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');
const modeSwitch = document.getElementById('modeSwitch');

/* toggles the dark mode*/
modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

//time counter function
function counter() {
  ms += 1; 
  if (ms >= 100) {
    ms = 0;
    sec += 1;
  }
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    hour += 1;
  }

  displayTime();
}

// Start button function (only start a new interval if one isn't already running)
startBtn.addEventListener('click', () => {
  if (!running) {
    interval = setInterval(counter, 10); 
    running = true;
  }
});

// Stop button function (Stops the interval)
stopBtn.addEventListener('click', () => {
  clearInterval(interval); 
  running = false;       
});

// Reset button function (Stops the interval and all values to zero)
resetBtn.addEventListener('click', () => {
  clearInterval(interval); 
  running = false;
  ms = 0;
  sec = 0;
  min = 0;
  hour = 0;
  displayTime();
  laps.innerHTML = '';
});

// Lap button function
lapBtn.addEventListener('click', () => {
   if (running) {
        const lapTime = display.textContent;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(lapDiv);
    }
});

// Convert time values to string and display in HH:MM:SS:MS format
function formatTime(hour, min, sec, ms) {
  const h = hour.toString().padStart(2, '0');
  const m = min.toString().padStart(2, '0');
  const s = sec.toString().padStart(2, '0');
  const mil = ms.toString().padStart(2, '0');
  return `${h}:${m}:${s}.${mil}`;
}

// Update the time on screen
function displayTime() {
    display.textContent = formatTime(hour, min, sec, ms);
}
