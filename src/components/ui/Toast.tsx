import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Notification } from '@/types';

export interface ToastProps {
  notification: Notification;
  onRemove: (id: string) => void;
  onAction?: (action: Notification['action']) => void;
  className?: string;
}

const toastVariants = {
  success: {
    icon: CheckCircle,
    className: 'border-success/20 bg-success/10 text-success-foreground',
    iconClassName: 'text-success'
  },
  error: {
    icon: AlertCircle,
    className: 'border-destructive/20 bg-destructive/10 text-destructive-foreground',
    iconClassName: 'text-destructive'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-warning/20 bg-warning/10 text-warning-foreground',
    iconClassName: 'text-warning'
  },
  info: {
    icon: Info,
    className: 'border-info/20 bg-info/10 text-info-foreground',
    iconClassName: 'text-info'
  }
};

export function Toast({ notification, onRemove, onAction, className }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const variant = toastVariants[notification.type];
  const Icon = variant.icon;

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-remove after duration
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration);
      
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const handleAction = () => {
    if (notification.action && onAction) {
      onAction(notification.action);
      handleRemove();
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ease-in-out',
        'min-w-[320px] max-w-[480px] shadow-lg backdrop-blur-sm',
        variant.className,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        isExiting ? 'translate-x-full opacity-0 scale-95' : '',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', variant.iconClassName)} />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-tight mb-1">
              {notification.title}
            </h4>
            <p className="text-sm leading-relaxed opacity-90">
              {notification.message}
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Action button */}
        {notification.action && (
          <div className="mt-3">
            <button
              onClick={handleAction}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-black/10 hover:bg-black/20 transition-colors"
            >
              {notification.action.label}
            </button>
          </div>
        )}
        
        {/* Timestamp */}
        <div className="mt-2 text-xs opacity-70">
          {notification.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export interface ToastContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
  onAction?: (action: Notification['action']) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

export function ToastContainer({ 
  notifications, 
  onRemove, 
  onAction, 
  position = 'top-right',
  className 
}: ToastContainerProps) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  if (notifications.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-3 max-h-screen overflow-hidden',
        positionClasses[position],
        className
      )}
    >
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
