/**
 * ProfileForm Component
 * Form for editing user profile with auto-save on blur and validation blocking
 */

'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AutoSaveIndicator } from '@/components/AutoSaveIndicator';
import { useAutoSave } from '@/lib/hooks/useAutoSave';
import { validateEmail, validatePhone, validateRequired } from '@/lib/validation';
import { saveProfile } from '@/lib/storage/settings-storage';
import { Profile, ProfileField, ProfileValidationErrors, AutoSaveStatus } from '@/types/settings';
import { cn } from '@/lib/utils';

interface ProfileFormProps {
  initialProfile: Profile;
  onValidationChange?: (hasErrors: boolean) => void;
}

/**
 * Profile form with auto-save on blur and validation blocking
 * @param initialProfile - Initial profile data
 * @param onValidationChange - Callback when validation state changes
 */
export function ProfileForm({ initialProfile, onValidationChange }: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [errors, setErrors] = useState<ProfileValidationErrors>({});
  const [fieldStatuses, setFieldStatuses] = useState<Record<ProfileField, AutoSaveStatus>>({
    firstName: 'idle',
    lastName: 'idle',
    email: 'idle',
    mobilePhone: 'idle',
  });

  // Refs to track active field for blur prevention
  const inputRefs = useRef<Record<ProfileField, HTMLInputElement | null>>({
    firstName: null,
    lastName: null,
    email: null,
    mobilePhone: null,
  });

  // Auto-save hook for each field
  const { save: saveField } = useAutoSave<Partial<Profile>>({
    saveFunction: saveProfile,
    onError: (error) => {
      console.error('Error saving profile:', error);
    },
  });

  // Update validation change callback
  const updateValidationState = useCallback(
    (newErrors: ProfileValidationErrors) => {
      const hasErrors = Object.keys(newErrors).length > 0;
      onValidationChange?.(hasErrors);
    },
    [onValidationChange]
  );

  // Handle input change
  const handleChange = useCallback((field: ProfileField, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        updateValidationState(newErrors);
        return newErrors;
      });
    }
  }, [errors, updateValidationState]);

  // Handle blur with validation and auto-save
  const handleBlur = useCallback(
    async (field: ProfileField, event: React.FocusEvent<HTMLInputElement>) => {
      const value = profile[field];
      
      // Validate the field
      let fieldError: string | null = null;
      if (field === 'email') {
        fieldError = validateEmail(value);
      } else if (field === 'mobilePhone') {
        fieldError = validatePhone(value);
      } else {
        fieldError = validateRequired(value, field === 'firstName' ? 'First name' : 'Last name');
      }

      // If there's a validation error, block blur and keep focus
      if (fieldError) {
        event.preventDefault();
        const newErrors = { ...errors, [field]: fieldError };
        setErrors(newErrors);
        updateValidationState(newErrors);
        
        // Keep focus on the field
        setTimeout(() => {
          inputRefs.current[field]?.focus();
        }, 0);
        
        return;
      }

      // Clear any existing error for this field
      if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
        updateValidationState(newErrors);
      }

      // If validation passed, trigger auto-save
      try {
        setFieldStatuses((prev) => ({ ...prev, [field]: 'saving' }));
        
        await saveField({ [field]: value });
        
        setFieldStatuses((prev) => ({ ...prev, [field]: 'saved' }));
        
        // Reset to idle after 2 seconds
        setTimeout(() => {
          setFieldStatuses((prev) => ({ ...prev, [field]: 'idle' }));
        }, 2000);
      } catch (error) {
        setFieldStatuses((prev) => ({ ...prev, [field]: 'error' }));
        console.error(`Error saving ${field}:`, error);
      }
    },
    [profile, errors, saveField, updateValidationState]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* First Name */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="firstName">First Name</Label>
            <AutoSaveIndicator status={fieldStatuses.firstName} />
          </div>
          <Input
            id="firstName"
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current.firstName = el;
            }}
            type="text"
            value={profile.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('firstName', e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur('firstName', e)}
            className={cn(errors.firstName && 'border-red-500 focus-visible:ring-red-500')}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-sm text-red-600 dark:text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="lastName">Last Name</Label>
            <AutoSaveIndicator status={fieldStatuses.lastName} />
          </div>
          <Input
            id="lastName"
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current.lastName = el;
            }}
            type="text"
            value={profile.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('lastName', e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur('lastName', e)}
            className={cn(errors.lastName && 'border-red-500 focus-visible:ring-red-500')}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-sm text-red-600 dark:text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email</Label>
            <AutoSaveIndicator status={fieldStatuses.email} />
          </div>
          <Input
            id="email"
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current.email = el;
            }}
            type="email"
            value={profile.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur('email', e)}
            className={cn(errors.email && 'border-red-500 focus-visible:ring-red-500')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-600 dark:text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Mobile Phone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="mobilePhone">Mobile Phone</Label>
            <AutoSaveIndicator status={fieldStatuses.mobilePhone} />
          </div>
          <Input
            id="mobilePhone"
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current.mobilePhone = el;
            }}
            type="tel"
            value={profile.mobilePhone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('mobilePhone', e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur('mobilePhone', e)}
            className={cn(errors.mobilePhone && 'border-red-500 focus-visible:ring-red-500')}
            aria-invalid={!!errors.mobilePhone}
            aria-describedby={errors.mobilePhone ? 'mobilePhone-error' : undefined}
            placeholder="(555) 123-4567"
          />
          {errors.mobilePhone && (
            <p id="mobilePhone-error" className="text-sm text-red-600 dark:text-red-500">
              {errors.mobilePhone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
