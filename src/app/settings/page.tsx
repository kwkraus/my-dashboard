/**
 * Settings Page (Server Component)
 * Loads initial data and renders SettingsPage client component
 */

import type { Metadata } from 'next';
import { SettingsPage } from '@/components/SettingsPage';
import { getProfile, getNotifications } from '@/lib/storage/settings-storage';

export const metadata: Metadata = {
  title: 'Settings | Modern Dashboard',
  description: 'Manage your profile and notification preferences',
};

export default async function Settings() {
  // Load initial data on the server
  const profile = await getProfile();
  const notifications = await getNotifications();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <SettingsPage initialProfile={profile} initialNotifications={notifications} />
    </div>
  );
}
