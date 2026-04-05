import { CheckCircle2, Clock, AlertCircle, Info } from 'lucide-react';

const ICON_MAP = {
  success: CheckCircle2,
  warning: Clock,
  error: AlertCircle,
  info: Info,
};

export default function Badge({
  children,
  variant = 'default',
  className = '',
  showIcon = false,
}) {
  const variants = {
    success: "text-incomeGreen bg-incomeGreenBg border-incomeGreen/20",
    warning: "text-accentAmber bg-accentAmberGlow border-accentAmber/20",
    error: "text-expenseRed bg-expenseRedBg border-expenseRed/20",
    info: "text-accentBlue bg-accentBlueGlow border-accentBlue/20",
    default: "text-textSecondary bg-bgTertiary/60 border-borderSubtle"
  };

  const IconComp = ICON_MAP[variant];

  const classes = `inline-flex items-center justify-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.5px] py-1 px-2.5 rounded-full border transition-all duration-300 ${variants[variant]} ${className}`;

  return (
    <span className={classes}>
      {showIcon && IconComp && <IconComp className="w-3 h-3" />}
      {children}
    </span>
  );
}
