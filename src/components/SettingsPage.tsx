/**
 * SettingsPage Component
 * Main container with horizontal tabs for Profile and Notifications
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from '@/components/ProfileForm';
import { NotificationsForm } from '@/components/NotificationsForm';
import { Profile, NotificationPreferences } from '@/types/settings';

interface SettingsPageProps {
  initialProfile: Profile;
  initialNotifications: NotificationPreferences;
}

/**
 * Settings page with tabbed navigation for Profile and Notifications
 * @param initialProfile - Initial profile data
 * @param initialNotifications - Initial notification preferences
 */
export function SettingsPage({ initialProfile, initialNotifications }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [hasProfileErrors, setHasProfileErrors] = useState<boolean>(false);

  // Handle tab change with validation check
  const handleTabChange = useCallback(
    (value: string) => {
      // If switching away from profile tab and there are validation errors, prevent switch
      if (activeTab === 'profile' && hasProfileErrors && value !== 'profile') {
        // Show a subtle message (you could enhance this with a toast notification)
        alert('Please correct validation errors before switching tabs');
        return;
      }

      // Allow tab switch
      setActiveTab(value);
    },
    [activeTab, hasProfileErrors]
  );

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information. Changes are saved automatically when you move to
              the next field.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              initialProfile={initialProfile}
              onValidationChange={setHasProfileErrors}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage your notification settings. Changes are saved automatically when you toggle a
              switch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationsForm initialNotifications={initialNotifications} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
