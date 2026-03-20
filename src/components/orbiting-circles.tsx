import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className = "",
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-emerald-500/15 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={[
              "animate-orbit absolute flex items-center justify-center",
              "h-[var(--icon-size)] w-[var(--icon-size)]",
              reverse ? "[animation-direction:reverse]" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
