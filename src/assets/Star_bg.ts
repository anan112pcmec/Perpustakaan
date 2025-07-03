const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

let scale = 1;
let width: number;
let height: number;

interface Star {
  x: number;
  y: number;
  z: number;
}

let stars: Star[] = [];

let pointerX: number | null = null;
let pointerY: number | null = null;

let velocity = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  z: 0.0005,
};

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
    });
  }
}

function placeStar(star: Star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function recycleStar(star: Star) {
  let direction: 'z' | 'l' | 'r' | 't' | 'b' = 'z';

  const vx = Math.abs(velocity.x);
  const vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    const axis = vx > vy
      ? Math.random() < vx / (vx + vy) ? 'h' : 'v'
      : Math.random() < vy / (vx + vy) ? 'v' : 'h';

    if (axis === 'h') {
      direction = velocity.x > 0 ? 'l' : 'r';
    } else {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  switch (direction) {
    case 'z':
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      break;
    case 'l':
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
      break;
    case 'r':
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
      break;
    case 't':
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
      break;
    case 'b':
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
      break;
  }
}

function resize() {
  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);
}

function update() {
  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach((star) => {
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
}

function render() {
  stars.forEach((star) => {
    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5 * Math.random();
    context.strokeStyle = STAR_COLOR;

    const tailX = Math.abs(velocity.x * 2) < 0.1 ? 0.5 : velocity.x * 2;
    const tailY = Math.abs(velocity.y * 2) < 0.1 ? 0.5 : velocity.y * 2;

    context.moveTo(star.x, star.y);
    context.lineTo(star.x + tailX, star.y + tailY);

    context.stroke();
  });
}

function movePointer(x: number, y: number) {
  if (typeof pointerX === 'number' && typeof pointerY === 'number') {
    const ox = x - pointerX;
    const oy = y - pointerY;

    velocity.tx += (ox / (8 * scale)) * (touchInput ? 1 : -1);
    velocity.ty += (oy / (8 * scale)) * (touchInput ? 1 : -1);
  }

  pointerX = x;
  pointerY = y;
}

function onMouseMove(event: MouseEvent) {
  touchInput = false;
  movePointer(event.clientX, event.clientY);
}

function onTouchMove(event: TouchEvent) {
  touchInput = true;
  if (event.touches.length > 0) {
    movePointer(event.touches[0].clientX, event.touches[0].clientY);
  }
  event.preventDefault();
}

function onMouseLeave() {
  pointerX = null;
  pointerY = null;
}
