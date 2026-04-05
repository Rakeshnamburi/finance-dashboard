export default function Card({
  children,
  title,
  subtitle,
  icon: Icon,
  className = '',
  noPadding = false,
  headerAction = null,
}) {
  return (
    <div className={`glass-card gradient-border overflow-hidden ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between p-5 pb-4 border-b border-borderSubtle/50">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-accentBlueGlow flex items-center justify-center">
                <Icon className="w-4 h-4 text-accentBlue" strokeWidth={1.8} />
              </div>
            )}
            <div>
              {title && <div className="text-base font-bold text-textPrimary">{title}</div>}
              {subtitle && <div className="text-xs text-textMuted mt-0.5">{subtitle}</div>}
            </div>
          </div>
          {headerAction && <div className="flex items-center">{headerAction}</div>}
        </div>
      )}
      <div className={`${noPadding ? 'p-0' : 'p-5 pt-3'}`}>
        {children}
      </div>
    </div>
  );
}
