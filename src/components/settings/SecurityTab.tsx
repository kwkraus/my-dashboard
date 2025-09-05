"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecurityTab() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {
      currentPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
      form?: string;
    } = {};
    let isValid = true;

    // Current password validation
    if (!form.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    // New password validation
    if (form.newPassword && form.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    const hasNumber = /\d/.test(form.newPassword);
    const hasUpperCase = /[A-Z]/.test(form.newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword);

    if (form.newPassword && !(hasNumber && hasUpperCase && hasSpecial)) {
      newErrors.newPassword = "Password must contain at least one number, one uppercase letter, and one special character";
      isValid = false;
    }

    // Confirm password validation
    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset any previous success message
    setSuccess(false);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Password form submitted:", form);
      console.log("MFA enabled:", mfaEnabled);
      
      // Reset form after "successful" submission
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      // Show success message
      setSuccess(true);
      
      // Here you would normally send the data to an API
    } catch (err) {
      console.error("Error updating password:", err);
      setErrors(prev => ({
        ...prev,
        form: "An error occurred while updating your password"
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Reset Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={form.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? "border-red-500" : ""}
                required
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.currentPassword}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                className={errors.newPassword ? "border-red-500" : ""}
                required
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            
            {errors.form && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-500">{errors.form}</p>
              </div>
            )}
            
            {success && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">Password updated successfully!</p>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* MFA Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Multi-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={mfaEnabled}
              onCheckedChange={setMfaEnabled}
              aria-label="Toggle MFA"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
