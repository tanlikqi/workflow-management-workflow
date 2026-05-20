import {
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  Clock,
  Flag,
  Phone,
  PhoneOff,
  Users,
} from "lucide-react";

const map = {
  flag: Flag,
  phone: Phone,
  "check-square": CheckSquare,
  clock: Clock,
  users: Users,
  "phone-off": PhoneOff,
  check: CheckCircle2,
  alert: AlertTriangle,
} as const;

export type NodeIconKey = keyof typeof map;

export function NodeIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = map[iconKey as NodeIconKey] ?? Phone;
  return <Icon className={className} />;
}
