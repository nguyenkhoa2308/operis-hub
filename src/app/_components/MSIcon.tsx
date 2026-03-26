/* ── Material Symbol shorthand — server-compatible ── */
export function MSIcon({
  name,
  fill,
  className = "",
  style,
}: {
  name: string;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: fill ? "'FILL' 1" : undefined,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
