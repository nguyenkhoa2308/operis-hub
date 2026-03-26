"use client";

import { products } from "@/data/products";
import { planetConfig } from "./constants";
import { OrbitPlanet } from "./ProductSidebarProvider";
import { useProductSidebar } from "./ProductSidebarProvider";
import { IMG } from "./constants";

export function HeroOrbitSystem() {
  const { setSelectedProduct } = useProductSidebar();

  return (
    <section
      id="hero"
      className="relative w-full flex items-center justify-center overflow-hidden op-nebula-bg pb-32"
      style={{ minHeight: "calc(100vh + 8rem)" }}
    >
      {/* Space bg */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: `url('${IMG.hero}')` }}
        />
      </div>

      {/* Orbit System */}
      <div className="relative z-10 flex h-[880px] w-[880px] items-center justify-center">
        {/* Orbit ring paths (SVG) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full op-orbits">
          <circle
            className="fill-none"
            cx="50%"
            cy="50%"
            r="210"
            style={{ stroke: "rgba(161,255,194,0.10)" }}
            strokeWidth={1}
          />
          <circle
            className="fill-none"
            cx="50%"
            cy="50%"
            r="320"
            style={{ stroke: "rgba(161,255,194,0.07)" }}
            strokeWidth={1}
          />
          <circle
            className="fill-none"
            cx="50%"
            cy="50%"
            r="440"
            style={{ stroke: "rgba(161,255,194,0.04)" }}
            strokeWidth={1}
          />
        </svg>

        {/* Center Sun */}
        <div className="pointer-events-none select-none z-10 flex flex-col items-center">
          <div className="op-central-sun">
            <div className="op-sun-rays" />
            <h1 className="font-headline text-5xl font-black text-white tracking-tighter uppercase op-text-glow mix-blend-overlay">
              Operis
            </h1>
            <h1
              className="absolute font-headline text-5xl font-black text-white tracking-tighter uppercase pointer-events-none"
              style={{ textShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
            >
              Operis
            </h1>
          </div>
        </div>

        {/* Individual orbiting planets */}
        {products.map((p) => {
          const cfg = planetConfig[p.key];
          if (!cfg) return null;
          return (
            <div
              key={p.key}
              className={`absolute flex items-center justify-center animate-orbit ${cfg.rev ? "[animation-direction:reverse]" : ""}`}
              style={
                {
                  "--duration": cfg.dur,
                  "--radius": cfg.radius,
                  "--angle": cfg.angle,
                  "--icon-size": "160px",
                  width: "160px",
                  height: "160px",
                  zIndex: 20,
                } as React.CSSProperties
              }
            >
              <OrbitPlanet
                product={p}
                cfg={cfg}
                onSelect={setSelectedProduct}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />
    </section>
  );
}
