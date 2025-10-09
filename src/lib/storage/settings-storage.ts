/**
 * Storage Service for Settings
 * Provides localStorage-based persistence with abstraction for future API integration
 */

import { Profile, NotificationPreferences } from '@/types/settings';

// Storage keys
const STORAGE_KEYS = {
  PROFILE: 'user-profile',
  NOTIFICATIONS: 'user-notifications',
} as const;

// Default values
const DEFAULT_PROFILE: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
};

const DEFAULT_NOTIFICATIONS: NotificationPreferences = {
  allUpdates: true,
  marketingUpdates: false,
};

/**
 * Get profile from localStorage or return defaults
 * @returns Promise resolving to Profile data
 */
export async function getProfile(): Promise<Profile> {
  try {
    if (typeof window === 'undefined') {
      return DEFAULT_PROFILE;
    }

    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!stored) {
      return DEFAULT_PROFILE;
    }

    const parsed = JSON.parse(stored) as Profile;
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (error) {
    console.error('Error loading profile:', error);
    return DEFAULT_PROFILE;
  }
}

/**
 * Save profile to localStorage (merges with existing data)
 * @param profile - Partial profile data to save
 * @returns Promise resolving when save completes
 */
export async function saveProfile(profile: Partial<Profile>): Promise<void> {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    // Get existing profile
    const existing = await getProfile();

    // Merge with new data
    const updated = { ...existing, ...profile };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving profile:', error);
    throw new Error('Failed to save profile');
  }
}

/**
 * Get notification preferences from localStorage or return defaults
 * @returns Promise resolving to NotificationPreferences data
 */
export async function getNotifications(): Promise<NotificationPreferences> {
  try {
    if (typeof window === 'undefined') {
      return DEFAULT_NOTIFICATIONS;
    }

    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!stored) {
      return DEFAULT_NOTIFICATIONS;
    }

    const parsed = JSON.parse(stored) as NotificationPreferences;
    return { ...DEFAULT_NOTIFICATIONS, ...parsed };
  } catch (error) {
    console.error('Error loading notifications:', error);
    return DEFAULT_NOTIFICATIONS;
  }
}

/**
 * Save notification preferences to localStorage (merges with existing data)
 * @param prefs - Partial notification preferences to save
 * @returns Promise resolving when save completes
 */
export async function saveNotifications(
  prefs: Partial<NotificationPreferences>
): Promise<void> {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    // Get existing preferences
    const existing = await getNotifications();

    // Merge with new data
    const updated = { ...existing, ...prefs };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving notifications:', error);
    throw new Error('Failed to save notification preferences');
  }
}
