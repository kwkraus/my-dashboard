/**
 * Validation utilities for Settings page forms
 * Provides email, phone, and required field validation
 */

import { Profile, ProfileValidationErrors } from '@/types/settings';

/**
 * Validates email format using RFC 5322 basic pattern
 * @param email - Email address to validate
 * @returns null if valid, error message if invalid
 */
export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  return null;
}

/**
 * Validates US phone number format (10+ digits)
 * Allows spaces, hyphens, parentheses
 * @param phone - Phone number to validate
 * @returns null if valid, error message if invalid
 */
export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  
  return null;
}

/**
 * Validates that a field is not empty
 * @param value - Value to validate
 * @param fieldName - Name of the field for error message
 * @returns null if valid, error message if invalid
 */
export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  
  return null;
}

/**
 * Validates all profile fields and returns error object
 * @param profile - Partial profile data to validate
 * @returns Object with validation errors for each field
 */
export function validateProfile(profile: Partial<Profile>): ProfileValidationErrors {
  const errors: ProfileValidationErrors = {};
  
  // Validate first name
  if (profile.firstName !== undefined) {
    const firstNameError = validateRequired(profile.firstName, 'First name');
    if (firstNameError) {
      errors.firstName = firstNameError;
    }
  }
  
  // Validate last name
  if (profile.lastName !== undefined) {
    const lastNameError = validateRequired(profile.lastName, 'Last name');
    if (lastNameError) {
      errors.lastName = lastNameError;
    }
  }
  
  // Validate email
  if (profile.email !== undefined) {
    const emailError = validateEmail(profile.email);
    if (emailError) {
      errors.email = emailError;
    }
  }
  
  // Validate phone
  if (profile.mobilePhone !== undefined) {
    const phoneError = validatePhone(profile.mobilePhone);
    if (phoneError) {
      errors.mobilePhone = phoneError;
    }
  }
  
  return errors;
}
