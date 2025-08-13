import React from 'react';
import { cn } from '@/lib/utils';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const baseClasses = "shrink-0 bg-border";
    
    const orientationClasses = {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]"
    };
    
    const semanticClasses = decorative ? "" : "my-4";
    
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          baseClasses,
          orientationClasses[orientation],
          semanticClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
