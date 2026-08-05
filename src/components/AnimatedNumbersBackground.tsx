import { useEffect, useRef } from "react";

const AnimatedNumbersBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Seeded random
    let seed = 12345;
    function srand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }
    function resetSeed(s: number) { seed = s; }

    // Easing
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    // Bitmap font (11 rows × 8 cols)
    const BITMAPS: Record<string, number[][]> = {
      '0': [
        [0,0,1,1,1,1,0,0],[0,1,1,0,0,1,1,0],[1,1,0,0,0,0,1,1],
        [1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],
        [1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],
        [0,1,1,0,0,1,1,0],[0,0,1,1,1,1,0,0],
      ],
      '2': [
        [0,0,1,1,1,1,0,0],[0,1,1,0,0,1,1,0],[1,1,0,0,0,0,1,1],
        [0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0,0],[0,0,1,1,0,0,0,0],[0,1,1,0,0,0,0,0],
        [1,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1],
      ],
      '4': [
        [0,0,0,0,0,1,1,0],[0,0,0,0,1,1,1,0],[0,0,0,1,1,1,1,0],
        [0,0,1,1,0,1,1,0],[0,1,1,0,0,1,1,0],[1,1,0,0,0,1,1,0],
        [1,1,1,1,1,1,1,1],[0,0,0,0,0,1,1,0],[0,0,0,0,0,1,1,0],
        [0,0,0,0,0,1,1,0],[0,0,0,0,0,1,1,0],
      ],
    };

    const CHARS = ['2', '0', '4'];
    const DIGIT_H = 11;
    const DIGIT_W = 8;
    const GAP_COLS = 3;
    const NUM_EXTRA = 120;
    const NUM_SEGS = 8;

    // Timeline
    const DUR = {
      scatter1: 2.5, converge1: 2.2, freeze1: 2.0,
      scatter2: 2.0, converge2: 2.2, freeze2: 2.0,
      scatter3: 2.0, returnHome: 2.5,
    };
    const TOTAL_TIME = Object.values(DUR).reduce((a, b) => a + b, 0);

    let cTime = 0;
    const segs: { start: number; dur: number; from: number; to: number }[] = [];
    function addSeg(dur: number, from: number, to: number) {
      segs.push({ start: cTime, dur, from, to });
      cTime += dur;
    }
    addSeg(DUR.scatter1, 0, 1);
    addSeg(DUR.converge1, 1, 2);
    addSeg(DUR.freeze1, 2, 2);
    addSeg(DUR.scatter2, 2, 3);
    addSeg(DUR.converge2, 3, 4);
    addSeg(DUR.freeze2, 4, 4);
    addSeg(DUR.scatter3, 4, 5);
    addSeg(DUR.returnHome, 5, 6);

    // Mutable state
    let W: number, H: number;
    let FONT_SIZE: number, FONT: string, CELL: number;
    let particles: { homeX: number; fixedY: number; char: string; baseAlpha: number }[] = [];
    let KX: number[][] = [], KC: string[][] = [], KA: number[][] = [];
    let pDelay: number[][] = [];
    let pSpeed: number[][] = [];
    let t0 = performance.now() / 1000;
    let animId: number;

    function buildScene() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;

      FONT_SIZE = Math.round(Math.max(10, Math.min(24, H / 55)));
      FONT = `bold ${FONT_SIZE}px "SF Mono", "Fira Code", "Consolas", monospace`;
      CELL = FONT_SIZE * 1.2;

      function getTargets(numStr: string) {
        const digits = numStr.split('');
        const totalW = digits.length * DIGIT_W + (digits.length - 1) * GAP_COLS;
        const sx = (W - totalW * CELL) / 2;
        const sy = (H - DIGIT_H * CELL) / 2;
        const out: { x: number; y: number; char: string; row: number }[] = [];
        for (let d = 0; d < digits.length; d++) {
          const bm = BITMAPS[digits[d]];
          const ox = d * (DIGIT_W + GAP_COLS) * CELL;
          for (let r = 0; r < DIGIT_H; r++) {
            for (let c = 0; c < DIGIT_W; c++) {
              if (bm[r][c]) {
                out.push({ x: sx + ox + c * CELL + CELL / 2, y: sy + r * CELL + CELL / 2, char: digits[d], row: r });
              }
            }
          }
        }
        return out;
      }

      const targets20 = getTargets('20');
      const targets40 = getTargets('40');

      const rowsUsed20: Record<number, typeof targets20> = {};
      const rowsUsed40: Record<number, typeof targets40> = {};
      for (const t of targets20) { if (!rowsUsed20[t.row]) rowsUsed20[t.row] = []; rowsUsed20[t.row].push(t); }
      for (const t of targets40) { if (!rowsUsed40[t.row]) rowsUsed40[t.row] = []; rowsUsed40[t.row].push(t); }
      const maxPerRow: Record<number, number> = {};
      for (let r = 0; r < DIGIT_H; r++) {
        maxPerRow[r] = Math.max(rowsUsed20[r]?.length || 0, rowsUsed40[r]?.length || 0);
      }

      particles = [];
      const targetParticlesByRow: Record<number, number[]> = {};
      const digitAreaSY = (H - DIGIT_H * CELL) / 2;

      resetSeed(99999);
      for (let r = 0; r < DIGIT_H; r++) {
        targetParticlesByRow[r] = [];
        const count = maxPerRow[r];
        const fixedY = digitAreaSY + r * CELL + CELL / 2;
        for (let i = 0; i < count; i++) {
          const homeX = W * 0.05 + srand() * W * 0.9;
          particles.push({ homeX, fixedY, char: CHARS[Math.floor(srand() * CHARS.length)], baseAlpha: 0.25 + srand() * 0.35 });
          targetParticlesByRow[r].push(particles.length - 1);
        }
      }

      for (let i = 0; i < NUM_EXTRA; i++) {
        const fixedY = H * 0.03 + srand() * H * 0.94;
        const homeX = W * 0.02 + srand() * W * 0.96;
        particles.push({ homeX, fixedY, char: CHARS[Math.floor(srand() * CHARS.length)], baseAlpha: 0.12 + srand() * 0.25 });
      }

      function assignTargets(targets: { x: number; char: string; row: number }[]) {
        const byRow: Record<number, typeof targets> = {};
        for (const t of targets) { if (!byRow[t.row]) byRow[t.row] = []; byRow[t.row].push(t); }
        const result: Record<number, { x: number; char: string }> = {};
        for (let r = 0; r < DIGIT_H; r++) {
          const rowTargets = (byRow[r] || []).sort((a, b) => a.x - b.x);
          const availableIndices = [...(targetParticlesByRow[r] || [])].sort((a, b) => particles[a].homeX - particles[b].homeX);
          for (let i = 0; i < rowTargets.length && i < availableIndices.length; i++) {
            result[availableIndices[i]] = { x: rowTargets[i].x, char: rowTargets[i].char };
          }
        }
        return result;
      }

      const assign20 = assignTargets(targets20);
      const assign40 = assignTargets(targets40);

      KX = []; KC = []; KA = [];
      const cxCenter = W / 2;
      resetSeed(77777);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const home = p.homeX;
        const s1 = home + (srand() - 0.5) * W * 0.35;
        const s3 = home + (srand() - 0.5) * W * 0.35;
        const s5 = home + (srand() - 0.5) * W * 0.35;
        const distFromCenter = (home - cxCenter) / (W / 2);
        const pushDir = distFromCenter >= 0 ? 1 : -1;
        const pushAmount = W * (0.15 + srand() * 0.25);
        const edgeX2 = home + pushDir * pushAmount;
        const edgeX4 = home + pushDir * pushAmount * (0.8 + srand() * 0.4);

        let k2x = edgeX2, k4x = edgeX4;
        let k2c = p.char, k4c = p.char;
        let k2a = p.baseAlpha * 0.5, k4a = p.baseAlpha * 0.5;

        if (assign20[i]) { k2x = assign20[i].x; k2c = assign20[i].char; k2a = 0.95; }
        if (assign40[i]) { k4x = assign40[i].x; k4c = assign40[i].char; k4a = 0.95; }

        KX.push([home, s1, k2x, s3, k4x, s5, home]);
        KC.push([p.char, p.char, k2c, p.char, k4c, p.char, p.char]);
        KA.push([p.baseAlpha, p.baseAlpha, k2a, p.baseAlpha, k4a, p.baseAlpha, p.baseAlpha]);
      }

      pDelay = []; pSpeed = [];
      resetSeed(33333);
      for (let i = 0; i < particles.length; i++) {
        const delays: number[] = [], speeds: number[] = [];
        for (let s = 0; s < NUM_SEGS; s++) {
          delays.push(srand() * 0.30);
          speeds.push(1.2 + srand() * 0.6);
        }
        pDelay.push(delays);
        pSpeed.push(speeds);
      }
    }

    buildScene();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(buildScene, 150);
    };
    window.addEventListener('resize', onResize);

    function animate(now: number) {
      const nowSec = now / 1000;
      ctx.clearRect(0, 0, W, H);
      const t = (nowSec - t0) % TOTAL_TIME;

      let segIdx = segs.length - 1;
      for (let s = 0; s < segs.length; s++) {
        if (t >= segs[s].start && t < segs[s].start + segs[s].dur) { segIdx = s; break; }
      }
      const seg = segs[segIdx];
      const isFreeze = seg.from === seg.to;
      const globalProgress = Math.min((t - seg.start) / seg.dur, 1);

      ctx.font = FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let e: number;
        if (isFreeze) {
          e = 1;
        } else {
          const delay = pDelay[i][segIdx];
          const speed = pSpeed[i][segIdx];
          let pp = (globalProgress - delay) / (1 - delay);
          pp = Math.max(0, Math.min(1, pp));
          pp = Math.max(0, Math.min(1, pp * speed));
          e = easeInOutCubic(pp);
        }

        const x = lerp(KX[i][seg.from], KX[i][seg.to], e);
        const alpha = lerp(KA[i][seg.from], KA[i][seg.to], e);
        const char = e > 0.5 ? KC[i][seg.to] : KC[i][seg.from];

        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, x, p.fixedY);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#000' }}
    />
  );
};

export default AnimatedNumbersBackground;
