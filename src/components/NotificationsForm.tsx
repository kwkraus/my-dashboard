/**
 * NotificationsForm Component
 * Toggle switches for notification preferences with instant auto-save
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AutoSaveIndicator } from '@/components/AutoSaveIndicator';
import { useAutoSave } from '@/lib/hooks/useAutoSave';
import { saveNotifications } from '@/lib/storage/settings-storage';
import { NotificationPreferences, NotificationField, AutoSaveStatus } from '@/types/settings';

interface NotificationsFormProps {
  initialNotifications: NotificationPreferences;
}

/**
 * Notifications form with toggle switches and instant auto-save
 * @param initialNotifications - Initial notification preferences
 */
export function NotificationsForm({ initialNotifications }: NotificationsFormProps) {
  const [notifications, setNotifications] = useState<NotificationPreferences>(initialNotifications);
  const [fieldStatuses, setFieldStatuses] = useState<Record<NotificationField, AutoSaveStatus>>({
    allUpdates: 'idle',
    marketingUpdates: 'idle',
  });

  // Store previous values for rollback on error
  const [previousValues, setPreviousValues] = useState<NotificationPreferences>(initialNotifications);

  // Auto-save hook
  const { save: saveField } = useAutoSave<Partial<NotificationPreferences>>({
    saveFunction: saveNotifications,
    onError: (error) => {
      console.error('Error saving notifications:', error);
    },
  });

  // Handle toggle change with optimistic update and auto-save
  const handleToggle = useCallback(
    async (field: NotificationField, checked: boolean) => {
      // Store previous value for potential rollback
      setPreviousValues(notifications);

      // Optimistic update
      setNotifications((prev) => ({ ...prev, [field]: checked }));

      try {
        setFieldStatuses((prev) => ({ ...prev, [field]: 'saving' }));

        // Save immediately
        await saveField({ [field]: checked });

        setFieldStatuses((prev) => ({ ...prev, [field]: 'saved' }));

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setFieldStatuses((prev) => ({ ...prev, [field]: 'idle' }));
        }, 2000);
      } catch (error) {
        // Rollback on error
        setNotifications(previousValues);
        setFieldStatuses((prev) => ({ ...prev, [field]: 'error' }));
        console.error(`Error saving ${field}:`, error);
      }
    },
    [notifications, previousValues, saveField]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* All Updates Toggle */}
        <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="allUpdates" className="text-base font-medium cursor-pointer">
              All Updates
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive all notifications about your account activity and updates
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AutoSaveIndicator status={fieldStatuses.allUpdates} />
            <Switch
              id="allUpdates"
              checked={notifications.allUpdates}
              onCheckedChange={(checked) => handleToggle('allUpdates', checked)}
              aria-label="Toggle all updates notifications"
            />
          </div>
        </div>

        {/* Marketing Updates Toggle */}
        <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="marketingUpdates" className="text-base font-medium cursor-pointer">
              Marketing Updates
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new features, promotions, and special offers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AutoSaveIndicator status={fieldStatuses.marketingUpdates} />
            <Switch
              id="marketingUpdates"
              checked={notifications.marketingUpdates}
              onCheckedChange={(checked) => handleToggle('marketingUpdates', checked)}
              aria-label="Toggle marketing updates notifications"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
