# Developer-Ready Specification: Settings Page Implementation

## 1. Project Overview

Implement a Settings page for the existing Next.js 15 dashboard application that allows users to manage their profile, security settings, notification preferences, and advanced options. The page should follow the existing application architecture and design patterns while providing a clean, intuitive user interface for configuration options.

## 2. Requirements

### 2.1 Functional Requirements

1. **Navigation**
   - Add a Settings route accessible via the existing sidebar navigation
   - Update the Settings link in AppSidebar to navigate to the new `/settings` route

2. **Settings Page Structure**
   - Implement a sidebar navigation within the Settings content area
   - Include four tabs: Profile, Security, Notifications, and Advanced
   - Default to the Profile tab on initial page load

3. **Profile Tab**
   - Include form fields for:
     - Name (text input)
     - Email (text input)
     - Job Title (text input)
     - Profile Picture (file upload button)
   - Include Save and Cancel buttons (UI only)

4. **Security Tab**
   - Provide password reset functionality with:
     - Current Password field
     - New Password field
     - Confirm New Password field
   - Include Two-Factor Authentication toggle switch (UI only)
   - Include Save and Cancel buttons (UI only)

5. **Notifications Tab**
   - Include toggle switches for:
     - Receive Marketing Communications
     - Receive New Offers
     - Receive Service Updates
   - Include Save and Cancel buttons (UI only)

6. **Advanced Tab**
   - Display message: "Advanced Settings coming in near future"

### 2.2 Non-Functional Requirements

1. **User Experience**
   - Maintain consistency with existing application design
   - Ensure responsive layout for all device sizes
   - Follow accessibility best practices

2. **Performance**
   - Ensure quick load times and smooth transitions between tabs
   - Use code splitting to minimize initial load time

3. **Maintainability**
   - Follow existing project architecture and component patterns
   - Use type definitions for all components and props
   - Include appropriate comments for complex logic

## 3. Architecture & Technical Specifications

### 3.1 File Structure

```
src/
  app/
    settings/
      page.tsx           # Main Settings page component
      SettingsNav.tsx    # Settings sidebar navigation component
      ProfileTab.tsx     # Profile settings component
      SecurityTab.tsx    # Security settings component
      NotificationsTab.tsx # Notifications settings component
      AdvancedTab.tsx    # Advanced settings component
      types.ts           # Type definitions for settings components
```

### 3.2 Component Architecture

1. **Settings Page (`page.tsx`)**
   - Uses the existing LayoutWrapper
   - Manages tab state and renders the appropriate tab content
   - Implements the layout with settings navigation sidebar and content area

2. **Settings Navigation (`SettingsNav.tsx`)**
   - Renders the sidebar navigation for settings tabs
   - Handles tab selection and active states
   - Follows the styling patterns from AppSidebar

3. **Tab Components**
   - Each tab is implemented as its own component
   - Uses shadcn/ui Card components for content sections
   - Follows consistent form styling across tabs

### 3.3 State Management

- Use React's useState hook for local component state
- Implement tab switching with URL hash or query parameters for bookmarkable tabs
- No persistent state storage in this initial implementation

### 3.4 Data Flow

```
Settings Page (page.tsx)
  ├── State: activeTab
  │
  ├── SettingsNav Component
  │    └── Event: Tab Selection → Updates activeTab state
  │
  └── Active Tab Component (ProfileTab, SecurityTab, etc.)
       └── Form Elements (inputs, toggles) with local state
```

## 4. UI/UX Specifications

### 4.1 Layout

- Two-column layout:
  - Left: Settings navigation sidebar (25% width, minimum 250px)
  - Right: Settings content area (75% width)
- Responsive behavior:
  - Desktop: Two columns side by side
  - Mobile: Stack vertically with collapsible navigation

### 4.2 Component Styling

- Use shadcn/ui components with the "New York" style variant
- Consistent with existing application styling
- Use CSS variables from globals.css for theming
- Responsive design following mobile-first approach

### 4.3 Design Elements

1. **Settings Navigation**
   - Vertical list of tab options
   - Visual indicators for active tab
   - Hover and focus states

2. **Form Inputs**
   - Consistent padding and spacing
   - Clear labeling
   - Appropriate input types for different data

3. **Buttons**
   - Primary button for Save
   - Secondary/outline button for Cancel
   - Consistent sizing and positioning

## 5. Implementation Details

### 5.1 Navigation Integration

Update AppSidebar.tsx to navigate to the settings page:

```tsx
// In AppSidebar.tsx
<div
  onClick={() => window.location.href = '/settings'}
  className={cn(
    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
    // Additional classes...
  )}
>
  <Settings className="h-4 w-4 transition-all duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:rotate-90" />
  {isOpen && <span className="transition-all duration-300 group-hover:font-semibold group-hover:text-slate-900 dark:group-hover:text-slate-100">Settings</span>}
</div>
```

### 5.2 Settings Page Implementation

```tsx
// src/app/settings/page.tsx
"use client";
import { useState } from "react";
import { SettingsNav } from "./SettingsNav";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { NotificationsTab } from "./NotificationsTab";
import { AdvancedTab } from "./AdvancedTab";

type SettingsTabs = "profile" | "security" | "notifications" | "advanced";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "advanced":
        return <AdvancedTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4 md:min-w-[250px]">
        <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="w-full md:w-3/4">{renderTabContent()}</div>
    </div>
  );
}
```

### 5.3 Settings Navigation Component

```tsx
// src/app/settings/SettingsNav.tsx
import { cn } from "@/lib/utils";
import { User, Shield, Bell, Settings } from "lucide-react";

type SettingsTabs = "profile" | "security" | "notifications" | "advanced";

interface SettingsNavProps {
  activeTab: SettingsTabs;
  onTabChange: (tab: SettingsTabs) => void;
}

export function SettingsNav({ activeTab, onTabChange }: SettingsNavProps) {
  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "advanced", label: "Advanced", icon: Settings },
  ] as const;

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
              "transition-all duration-300 ease-in-out",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-muted font-semibold"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
```

### 5.4 Tab Component Examples

```tsx
// src/app/settings/ProfileTab.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-6 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Upload Picture
          </Button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Your name"
            defaultValue="Jane Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Your email"
            defaultValue="jane@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Job Title</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2"
            placeholder="Your job title"
            defaultValue="Product Manager"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
```

Similar implementations would be created for SecurityTab.tsx, NotificationsTab.tsx, and AdvancedTab.tsx following the same patterns.

## 6. Error Handling Strategies

### 6.1 Form Validation

While we're not implementing actual validation in this initial version, the architecture should support future validation:

- Structure components to allow for error state display
- Include placeholders for validation error messages
- Set up component props to receive validation status

### 6.2 UI Error States

- Design all interactive components with clear hover and focus states
- Ensure tab switching is robust even with invalid form data
- Include appropriate aria attributes for accessibility

### 6.3 Error Recovery

- Ensure Cancel buttons reset forms to their initial state
- Structure code to support future implementation of form state persistence
- Maintain clean separation between UI state and data state

## 7. Testing Plan

### 7.1 Component Testing

1. **Unit Tests**
   - Test each tab component renders correctly
   - Test tab switching functionality
   - Test button click handlers
   - Test form element interactions

2. **Integration Tests**
   - Test navigation between tabs
   - Test integration with AppSidebar navigation
   - Test responsive behavior

### 7.2 UI Testing

1. **Responsive Testing**
   - Test on various device sizes
   - Verify layout adjusts appropriately
   - Check touch targets on mobile

2. **Accessibility Testing**
   - Test keyboard navigation
   - Verify ARIA attributes
   - Test with screen readers

### 7.3 Test Cases

1. **Navigation Tests**
   - Verify clicking Settings in AppSidebar navigates to settings page
   - Verify default tab is Profile
   - Verify clicking each tab displays correct content
   - Verify tabs maintain state during navigation

2. **Form Element Tests**
   - Verify all form inputs render correctly
   - Verify toggle switches can be toggled
   - Verify Save and Cancel buttons are visible

3. **Responsive Tests**
   - Verify layout on mobile devices
   - Verify layout on tablet devices
   - Verify layout on desktop devices

## 8. Implementation Roadmap

### Phase 1: Basic Structure and Navigation
- Create settings directory and page component
- Implement settings navigation sidebar
- Set up tab switching functionality

### Phase 2: Tab Content Implementation
- Implement Profile tab
- Implement Security tab
- Implement Notifications tab
- Implement Advanced tab

### Phase 3: Integration and Styling
- Update AppSidebar to link to Settings page
- Apply consistent styling across all components
- Implement responsive behavior

### Phase 4: Testing and Refinement
- Conduct UI testing across devices
- Fix any layout or styling issues
- Document components and usage

## 9. Dependencies

- Existing project dependencies:
  - Next.js 15
  - React
  - shadcn/ui components
  - Tailwind CSS
  - Lucide React (for icons)
  - next-themes

## 10. Considerations for Future Enhancements

1. **State Management**
   - Implement form state persistence across tab switches
   - Add actual form validation
   - Connect to API endpoints for saving settings

2. **Advanced Features**
   - Implement the Advanced tab functionality
   - Add more security options
   - Add additional notification channels

3. **User Experience**
   - Add animations for tab transitions
   - Implement unsaved changes warnings
   - Add success/error feedback for form submissions
