"use client";

import { useRef, useState } from "react";

type Point = { label: string; value: number };

export default function DonationsChart({
  data = [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 900 },
    { label: "Mar", value: 1500 },
    { label: "Apr", value: 1800 },
    { label: "May", value: 1300 },
    { label: "Jun", value: 2100 },
    { label: "Jul", value: 1750 },
    { label: "Aug", value: 1950 },
    { label: "Sep", value: 1700 },
    { label: "Oct", value: 2200 },
    { label: "Nov", value: 2400 },
    { label: "Dec", value: 2000 },
  ] as Point[],
  locale = "en",
}: {
  data?: Point[];
  locale?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);

  const width = 720;
  const height = 160;
  const padding = { top: 12, right: 12, bottom: 28, left: 40 };

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);
    const y = padding.top + ((max - d.value) / (max - min || 1)) * (height - padding.top - padding.bottom);
    return { ...d, x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const areaD = `${pathD} L ${width - padding.right} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  function handleMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    // find nearest point
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const dx = Math.abs(p.x - x);
      if (dx < best) {
        best = dx;
        nearest = i;
      }
    });
    const p = points[nearest];
    setHover({ i: nearest, x: p.x, y: p.y });
  }

  function fmt(v: number) {
    return new Intl.NumberFormat(locale === "he" ? "he-IL" : "en-US", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(v);
  }

  return (
    <div ref={containerRef} className="w-full max-w-full rounded-lg bg-white/6 p-4" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" onMouseMove={handleMove}>
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d9ac5c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d9ac5c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padding.left} x2={width - padding.right} y1={padding.top + t * (height - padding.top - padding.bottom)} y2={padding.top + t * (height - padding.top - padding.bottom)} stroke="rgba(255,255,255,0.04)" />
        ))}

        {/* area */}
        <path d={areaD} fill="url(#g1)" stroke="none" />
        {/* stroke */}
        <path d={pathD} fill="none" stroke="#d9ac5c" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={hover?.i === i ? '#fff' : '#fff'} opacity={hover?.i === i ? 1 : 0.9} />
        ))}

        {/* bottom labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={height - 6} fontSize={9} textAnchor="middle" fill="rgba(255,255,255,0.72)">{p.label}</text>
        ))}
      </svg>

      {hover && (
        <div
          role="status"
          className="absolute z-20 pointer-events-none rounded bg-[#0b1d2f] px-3 py-2 text-sm text-white shadow-lg"
          style={{ transform: `translate(${hover.x - 40}px, ${hover.y - 64}px)` }}
        >
          <div className="font-bold">{data[hover.i].label}</div>
          <div className="text-xs">{fmt(data[hover.i].value)}</div>
        </div>
      )}
    </div>
  );
}
