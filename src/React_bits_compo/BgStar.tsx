import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
}

const STAR_COLOR = '#fff';
const STAR_SIZE = 0.7;
const STAR_MIN_SCALE = 0.5;
const OVERFLOW_THRESHOLD = 20;

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const pointerRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const velocity = useRef({ x: 0, y: 2, tx: 0, ty: 0, z: 0.0005 });
  const scale = useRef<number>(1);
  const width = useRef<number>(0);
  const height = useRef<number>(0);
  const touchInput = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 10;

    const generateStars = () => {
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    };

    const placeStar = (star: Star) => {
      star.x = Math.random() * width.current;
      star.y = Math.random() * height.current;
    };

    const recycleStar = (star: Star) => {
      let direction: 'z' | 'l' | 'r' | 't' | 'b' = 'z';
      const vx = Math.abs(velocity.current.x);
      const vy = Math.abs(velocity.current.y);
      if (vx > 1 || vy > 1) {
        const axis = vx > vy
          ? Math.random() < vx / (vx + vy) ? 'h' : 'v'
          : Math.random() < vy / (vx + vy) ? 'v' : 'h';
        if (axis === 'h') {
          direction = velocity.current.x > 0 ? 'l' : 'r';
        } else {
          direction = velocity.current.y > 0 ? 't' : 'b';
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      switch (direction) {
        case 'z':
          star.z = 0.1;
          star.x = Math.random() * width.current;
          star.y = Math.random() * height.current;
          break;
        case 'l':
          star.x = -OVERFLOW_THRESHOLD;
          star.y = height.current * Math.random();
          break;
        case 'r':
          star.x = width.current + OVERFLOW_THRESHOLD;
          star.y = height.current * Math.random();
          break;
        case 't':
          star.x = width.current * Math.random();
          star.y = -OVERFLOW_THRESHOLD;
          break;
        case 'b':
          star.x = width.current * Math.random();
          star.y = height.current + OVERFLOW_THRESHOLD;
          break;
      }
    };

    const resize = () => {
      scale.current = window.devicePixelRatio || 1;
      width.current = window.innerWidth * scale.current;
      height.current = window.innerHeight * scale.current;

      canvas.width = width.current;
      canvas.height = height.current;

      starsRef.current.forEach(placeStar);
    };

    const movePointer = (x: number, y: number) => {
      const { x: px, y: py } = pointerRef.current;
      if (typeof px === 'number' && typeof py === 'number') {
        const ox = x - px;
        const oy = y - py;

        velocity.current.tx += (ox / (4 * scale.current)) * (touchInput.current ? 1 : -1);
        velocity.current.ty += (oy / (4 * scale.current)) * (touchInput.current ? 1 : -1);
      }

      pointerRef.current.x = x;
      pointerRef.current.y = y;
    };

    const onMouseMove = (e: MouseEvent) => {
      touchInput.current = false;
      movePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      touchInput.current = true;
      if (e.touches.length > 0) {
        movePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    };

    const update = () => {
      velocity.current.tx *= 0.96;
      velocity.current.ty *= 0.96;
      velocity.current.x += (velocity.current.tx - velocity.current.x) * 0.8;
      velocity.current.y += (velocity.current.ty - velocity.current.y) * 0.8;

      starsRef.current.forEach((star) => {
        star.x += velocity.current.x * star.z;
        star.y += velocity.current.y * star.z;

        star.x += (star.x - width.current / 2) * velocity.current.z * star.z;
        star.y += (star.y - height.current / 2) * velocity.current.z * star.z;
        star.z += velocity.current.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width.current + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height.current + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    };

    const render = () => {
      context.clearRect(0, 0, width.current, height.current);
      starsRef.current.forEach((star) => {
        const radius = STAR_SIZE * star.z * scale.current;
        context.beginPath();
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.fillStyle = STAR_COLOR;
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const step = () => {
      update();
      render();
      requestAnimationFrame(step);
    };

    generateStars();
    resize();
    step();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onMouseLeave);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onMouseLeave);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default StarfieldCanvas;
