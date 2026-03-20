import { icons, type LucideIcon } from "lucide-react";

export function ProductIcon({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) {
  const Icon = icons[name as keyof typeof icons] as LucideIcon | undefined;
  if (!Icon) return null;
  return <Icon width={24} height={24} strokeWidth={1.7} {...props} />;
}
