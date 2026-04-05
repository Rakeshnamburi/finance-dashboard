export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97]";
  
  const variants = {
    primary: "bg-gradient-to-r from-accentBlue to-accentPurple text-white hover:shadow-glowBlue hover:-translate-y-[1px] hover:brightness-110",
    secondary: "bg-bgTertiary/60 text-textPrimary border border-borderSubtle hover:bg-bgTertiary hover:border-borderHover backdrop-blur-sm",
    danger: "bg-transparent text-expenseRed border border-expenseRed/20 hover:bg-expenseRedBg hover:border-expenseRed/40",
    ghost: "bg-transparent text-textSecondary hover:bg-bgGlassHover hover:text-textPrimary",
    success: "bg-gradient-to-r from-incomeGreen to-incomeGreenLight text-white hover:shadow-glowGreen hover:-translate-y-[1px]",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-[0.8rem]",
    lg: "h-12 px-6 text-sm"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button className={classes} {...props}>
      {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} strokeWidth={2} />}
      {children}
    </button>
  );
}
