"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const hoveredCellsRef = useRef<SVGRectElement[]>([]);
  const hoverGroupRef = useRef<SVGGElement>(null);
  const cellOpacitiesRef = useRef<Float32Array>(new Float32Array(0));
  const currentCellRef = useRef<{ col: number; row: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Create hover cell elements
  useEffect(() => {
    const group = hoverGroupRef.current;
    if (!group || !dimensions.width || !dimensions.height) return;

    while (group.firstChild) group.removeChild(group.firstChild);
    hoveredCellsRef.current = [];

    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    cellOpacitiesRef.current = new Float32Array(cols * rows);

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", String(width - 1));
        rect.setAttribute("height", String(height - 1));
        rect.setAttribute("x", String(col * width + 1));
        rect.setAttribute("y", String(row * height + 1));
        rect.setAttribute("fill", "currentColor");
        rect.setAttribute("stroke-width", "0");
        rect.setAttribute("opacity", "0");
        rect.dataset.col = String(col);
        rect.dataset.row = String(row);
        rect.dataset.idx = String(col * rows + row);
        group.appendChild(rect);
        hoveredCellsRef.current.push(rect);
      }
    }
  }, [dimensions, width, height]);

  // Mouse tracking: only track which cell the mouse is over
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const col = Math.floor(mx / width);
      const row = Math.floor(my / height);
      currentCellRef.current = { col, row };
    };

    const handleLeave = () => {
      currentCellRef.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [width, height]);

  // RAF loop: light up current cell, fade trail
  useEffect(() => {
    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    if (!cols || !rows) return;

    const decay = 0.96; // trail fade speed
    const brightOpacity = 0.5;

    const tick = () => {
      const opacities = cellOpacitiesRef.current;
      const cells = hoveredCellsRef.current;
      const cur = currentCellRef.current;

      // Decay all cells
      for (let i = 0; i < opacities.length; i++) {
        opacities[i] *= decay;
        if (opacities[i] < 0.005) opacities[i] = 0;
      }

      // Light up current cell
      if (cur && cur.col >= 0 && cur.col < cols && cur.row >= 0 && cur.row < rows) {
        const idx = cur.col * rows + cur.row;
        opacities[idx] = brightOpacity;
      }

      // Apply to DOM
      for (let i = 0; i < cells.length; i++) {
        const op = opacities[i];
        const cell = cells[i];
        const current = cell.getAttribute("opacity");
        const target = op < 0.005 ? "0" : op.toFixed(3);
        if (current !== target) {
          cell.setAttribute("opacity", target);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dimensions, width, height]);

  // Ambient squares
  const [ambientSquares, setAmbientSquares] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    const cols = Math.floor(dimensions.width / width);
    const rows = Math.floor(dimensions.height / height);
    const squares = Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
      delay: Math.random() * duration * 2,
    }));
    setAmbientSquares(squares);
  }, [dimensions, numSquares, width, height, duration]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-black/30 stroke-black/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <g ref={hoverGroupRef} x={x} y={y} />
      <svg x={x} y={y} className="overflow-visible">
        {ambientSquares.map((sq) => (
          <rect
            key={sq.id}
            width={width - 1}
            height={height - 1}
            x={sq.x * width + 1}
            y={sq.y * height + 1}
            fill="currentColor"
            strokeWidth="0"
            opacity={0}
            style={{ animation: `gridPulse ${duration}s ease-in-out ${sq.delay * 0.5}s infinite` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: ${maxOpacity}; }
        }
      `}</style>
    </svg>
  );
}
