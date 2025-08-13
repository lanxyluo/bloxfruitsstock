import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'coming-soon';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, showText = true, size = 'md', ...props }, ref) => {
    const statusConfig = {
      'in-stock': {
        color: 'bg-green-500',
        text: 'In Stock',
        textColor: 'text-green-400'
      },
      'low-stock': {
        color: 'bg-yellow-500',
        text: 'Low Stock',
        textColor: 'text-yellow-400'
      },
      'out-of-stock': {
        color: 'bg-red-500',
        text: 'Out of Stock',
        textColor: 'text-red-400'
      },
      'coming-soon': {
        color: 'bg-blue-500',
        text: 'Coming Soon',
        textColor: 'text-blue-400'
      }
    };
    
    const sizeClasses = {
      sm: {
        dot: 'w-2 h-2',
        text: 'text-xs'
      },
      md: {
        dot: 'w-3 h-3',
        text: 'text-sm'
      },
      lg: {
        dot: 'w-4 h-4',
        text: 'text-base'
      }
    };
    
    const config = statusConfig[status];
    const sizeConfig = sizeClasses[size];
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <div
          className={cn(
            "rounded-full animate-pulse",
            sizeConfig.dot,
            config.color
          )}
        />
        {showText && (
          <span className={cn("font-medium", sizeConfig.text, config.textColor)}>
            {config.text}
          </span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator };
