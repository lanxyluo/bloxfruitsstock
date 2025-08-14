import { useState, useCallback, useRef, useEffect } from 'react';
import { Notification as NotificationType, StockChangeNotification, StockUpdate } from '@/types';

export interface UseNotificationsOptions {
  maxNotifications?: number;
  defaultDuration?: number;
  enableSound?: boolean;
  enableDesktopNotifications?: boolean;
}

export interface UseNotificationsReturn {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, 'id' | 'timestamp'>) => void;
  addStockChangeNotification: (update: StockUpdate) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

export function useNotifications({
  maxNotifications = 10,
  defaultDuration = 5000,
  enableSound = false,
  enableDesktopNotifications = false
}: UseNotificationsOptions = {}): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for notifications
  useEffect(() => {
    if (enableSound) {
      audioRef.current = new Audio('/notification-sound.mp3'); // You can add a sound file
      audioRef.current.volume = 0.3;
    }
  }, [enableSound]);

  // Request desktop notification permission
  useEffect(() => {
    if (enableDesktopNotifications && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [enableDesktopNotifications]);

  // Play notification sound
  const playSound = useCallback(() => {
    if (enableSound && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore audio play errors
      });
    }
  }, [enableSound]);

  // Show desktop notification
  const showDesktopNotification = useCallback((notification: NotificationType) => {
    if (enableDesktopNotifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id,
        requireInteraction: false
      });
    }
  }, [enableDesktopNotifications]);

  // Add a new notification
  const addNotification = useCallback((notification: Omit<NotificationType, 'id' | 'timestamp'>) => {
    const newNotification: NotificationType = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Play sound and show desktop notification
    playSound();
    showDesktopNotification(newNotification);

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      const duration = notification.duration || defaultDuration;
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, duration);
    }
  }, [maxNotifications, defaultDuration, playSound, showDesktopNotification]);

  // Add stock change notification
  const addStockChangeNotification = useCallback((update: StockUpdate) => {
    const { fruitId, changes, timestamp } = update;
    
    // Determine notification type and message
    let type: NotificationType['type'] = 'info';
    let title = 'Stock Update';
    let message = '';

    if (changes.stock !== undefined) {
      const oldStock = update.changes.stock || 0;
      const newStock = changes.stock;
      const change = newStock - oldStock;
      
      if (change > 0) {
        type = 'success';
        title = 'Stock Increased';
        message = `Stock increased by ${change}`;
      } else if (change < 0) {
        type = 'warning';
        title = 'Stock Decreased';
        message = `Stock decreased by ${Math.abs(change)}`;
      }
    }

    if (changes.price !== undefined) {
      const oldPrice = update.changes.price || 0;
      const newPrice = changes.price;
      const change = newPrice - oldPrice;
      
      if (change > 0) {
        type = 'warning';
        title = 'Price Increased';
        message = `Price increased by $${change}`;
      } else if (change < 0) {
        type = 'success';
        title = 'Price Decreased';
        message = `Price decreased by $${Math.abs(change)}`;
      }
    }

    if (changes.status !== undefined) {
      type = 'info';
      title = 'Status Changed';
      message = `Status changed to ${changes.status}`;
    }

    addNotification({
      type,
      title,
      message,
      duration: 8000, // Longer duration for stock changes
      isRead: false,
      action: {
        label: 'View Details',
        onClick: () => {
          // Navigate to fruit details or scroll to item
          const element = document.getElementById(`fruit-${fruitId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-animation');
            setTimeout(() => {
              element.classList.remove('highlight-animation');
            }, 2000);
          }
        }
      }
    });
  }, [addNotification]);

  // Remove a notification
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    addNotification,
    addStockChangeNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount
  };
}
