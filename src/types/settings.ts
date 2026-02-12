/**
 * Type definitions for Settings page
 * Supports Profile and Notification management with auto-save functionality
 */

// Profile entity
export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
}

// Type for profile field names
export type ProfileField = keyof Profile;

// Validation errors for profile fields
export interface ProfileValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobilePhone?: string;
}

// Notification preferences entity
export interface NotificationPreferences {
  allUpdates: boolean;
  marketingUpdates: boolean;
}

// Type for notification field names
export type NotificationField = keyof NotificationPreferences;

// Auto-save status states
export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

// Chat widget configuration
export interface ChatWidgetConfig {
  enabled: boolean;
  botUrl: string;
  position: 'bottom-right' | 'bottom-left';
  title: string;
}
