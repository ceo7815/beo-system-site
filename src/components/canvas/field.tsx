"use client";

import { useEffect, useRef } from "react";

export type FilmProgress = { current: number };

const VERT = `
attribute vec2 a;
void main(){ gl_Position = vec4(a,0.0,1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 r;
uniform float t;
uniform vec2 m;
uniform float p;
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 pos = (uv - 0.5) * vec2(r.x/r.y, 1.0);
  float time = t * 0.10 + p * 2.8;
  vec2 q = pos;
  q.x += sin(pos.y * 2.4 + time) * (0.16 + p * 0.12);
  q.y += cos(pos.x * 2.1 - time * 0.8) * (0.14 + p * 0.10);
  float d1 = length(q + vec2(-0.38 + p * 0.2, 0.08 - sin(time) * 0.08));
  float d2 = length(q + vec2(0.44, -0.16 + cos(time * 0.7) * 0.1));
  float mouse = length((uv - m) * vec2(r.x/r.y, 1.0));
  float glow = 0.16 / (d1 * 2.1 + 0.12) + 0.11 / (d2 * 2.5 + 0.16);
  glow += 0.07 / (mouse * 3.4 + 0.2);
  glow *= 0.55 + p * 1.15;
  vec2 g = abs(fract(pos * (7.0 + p * 6.0)) - 0.5);
  float grid = 1.0 - smoothstep(0.0, 0.03, min(g.x, g.y));
  vec3 col = vec3(0.03, 0.018, 0.055);
  col += vec3(0.34, 0.15, 0.72) * glow;
  col += vec3(0.55, 0.28, 0.95) * p * glow * 0.35;
  col += vec3(0.16, 0.07, 0.30) * grid * (0.12 + p * 0.28);
  col *= 0.5 + 0.5 * smoothstep(1.25 - p * 0.2, 0.04, length(pos));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function Field({ progress, lite }: { progress?: FilmProgress; lite?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: lite ? "low-power" : "high-performance",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");
    const uP = gl.getUniformLocation(prog, "p");

    const mouse = { x: 0.72, y: 0.42 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    let visible = true;
    let lastT = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(canvas);

    let lastDraw = 0;
    const gap = lite ? 33 : 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (gap && now - lastDraw < gap) return;
      lastDraw = now;
      const freeze =
        reduce || document.documentElement.dataset.a11yMotion === "off";
      if (!freeze) lastT = (now - start) / 1000;
      if (visible) {
        gl.uniform2f(uR, canvas.width, canvas.height);
        gl.uniform1f(uT, lastT);
        gl.uniform2f(uM, mouse.x, mouse.y);
        gl.uniform1f(uP, progress?.current ?? 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [progress, lite]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
