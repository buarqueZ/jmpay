import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000, prefix: "+", suffix: "", label: "Empresas Impactadas", display: "10K" },
  { value: 1, prefix: "+", suffix: " bi", label: "Transações no Último Ano", display: "1" },
  { value: 100, prefix: "+", suffix: "", label: "Países Regulamentados", display: "100" },
  { value: 2, prefix: "+R$", suffix: " bi", label: "Empresas já faturaram", display: "2" },
];

function formatValue(current: number, stat: typeof stats[0]) {
  if (stat.label === "Empresas Impactadas") {
    const k = current / 1000;
    return `${stat.prefix}${k >= 1 ? k.toFixed(k === Math.floor(k) ? 0 : 1) + "K" : Math.floor(current).toLocaleString("pt-BR")}`;
  }
  if (stat.suffix === " bi") {
    return `${stat.prefix}${current % 1 === 0 ? current.toFixed(0) : current.toFixed(1)}${stat.suffix}`;
  }
  return `${stat.prefix}${Math.floor(current)}`;
}

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for "braking" effect
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [trigger, end, duration]);

  return current;
}

function StatItem({ stat, trigger }: { stat: typeof stats[0]; trigger: boolean }) {
  const current = useCountUp(stat.value, 2000, trigger);
  return (
    <div className="text-center">
      <p className="text-3xl md:text-5xl font-bold text-primary mb-2">
        {formatValue(current, stat)}
      </p>
      <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-6 md:py-8 bg-background">
      <div className="container-tight grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} trigger={visible} />
        ))}
      </div>
    </section>
  );
}
