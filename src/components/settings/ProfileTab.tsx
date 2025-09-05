"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileTab() {
  const [form, setForm] = useState({
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    profilePicture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    profilePicture?: string;
  }>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size before setting
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePicture: "Profile picture must be less than 5MB"
        }));
        return;
      }
      
      setForm(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Clear any previous error
      if (errors.profilePicture) {
        setErrors(prev => ({
          ...prev,
          profilePicture: undefined
        }));
      }
      
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      profilePicture?: string;
    } = {};
    let isValid = true;

    // First name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (form.firstName.length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
      isValid = false;
    }

    // Last name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (form.lastName.length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
      isValid = false;
    }

    // Date of birth validation
    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      isValid = false;
    } else {
      const birthDate = new Date(form.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Check if the user is at least 13 years old
      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old";
        isValid = false;
      }
    }

    // Profile picture validation
    if (form.profilePicture && form.profilePicture.size > 5 * 1024 * 1024) {
      newErrors.profilePicture = "Profile picture must be less than 5MB";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", form);
      // Here you would normally send the data to an API
      
      // Simulate success
      alert("Profile updated successfully!");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setForm({
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      profilePicture: null,
    });
    setPreviewUrl("");
    setErrors({});
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Avatar className="w-24 h-24">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt="Profile" />
              ) : (
                <AvatarFallback className="text-lg">
                  {form.firstName.charAt(0)}{form.lastName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col items-center">
              <Label 
                htmlFor="profile-picture" 
                className="cursor-pointer text-sm text-primary hover:underline"
              >
                Change profile picture
              </Label>
              <Input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {errors.profilePicture && (
                <p className="text-sm text-red-500 mt-1">{errors.profilePicture}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "border-red-500" : ""}
                required
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
                required
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              className={errors.dateOfBirth ? "border-red-500" : ""}
              required
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
