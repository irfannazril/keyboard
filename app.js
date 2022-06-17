const switches = document.querySelectorAll('.switch');
const colors = document.querySelectorAll('.color');
const keyboards = document.querySelectorAll('.keyboard');
const gradients = document.querySelectorAll('.gradient');
const keyboardBg = document.querySelector('.keyboardBackground');

let prevColor = 'black';
let animationEnd = true;

function changeSize() {
  switches.forEach((sw) => sw.classList.remove('active'));
  this.classList.add('active');
}

function changeColor() {
  if (!animationEnd) return;
  let primary = this.getAttribute('primary');
  let color = this.getAttribute('color');
  let keyboard = document.querySelector(`.keyboard[color="${color}"]`);
  let gradient = document.querySelector(`.gradient[color="${color}"]`);
  let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

  if (color == prevColor) return;

  colors.forEach((c) => c.classList.remove('active'));
  this.classList.add('active');

  document.documentElement.style.setProperty('--primary', primary);

  keyboards.forEach((s) => s.classList.remove('show'));
  keyboard.classList.add('show');

  gradients.forEach((g) => g.classList.remove('first', 'second'));
  gradient.classList.add('first');
  prevGradient.classList.add('second');

  prevColor = color;
  animationEnd = false;

  gradient.addEventListener('animationend', () => {
    animationEnd = true;
  });
}

switches.forEach((sw) => sw.addEventListener('click', changeSize));
colors.forEach((c) => c.addEventListener('click', changeColor));

let x = window.matchMedia('(max-width: 1000px)');

function changeHeight() {
  if (x.matches) {
    let keyboardHeight = keyboards[0].offsetHeight;
    keyboardBg.style.height = `${keyboardHeight * 0.9}px`;
  } else {
    keyboardBg.style.height = '475px';
  }
}

changeHeight();

window.addEventListener('resize', changeHeight);
