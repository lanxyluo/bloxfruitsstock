import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'common' | 'rare' | 'epic' | 'legendary' | 'mythical' | 'status';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    };
    
    const variantClasses = {
      default: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
      common: "bg-gray-500/10 text-gray-300 border-gray-500/20 hover:bg-gray-500/20",
      rare: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20",
      epic: "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20",
      legendary: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20 hover:bg-yellow-500/20",
      mythical: "bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20",
      status: "bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20"
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
