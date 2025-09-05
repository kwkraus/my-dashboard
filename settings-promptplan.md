# Settings Page Implementation Plan

This document outlines a step-by-step approach to implementing the Settings page for the dashboard application, broken down into small, manageable prompts for a code-generation LLM.

## Project Overview

We're implementing a Settings page accessible from the left navigation sidebar of a Next.js dashboard application. The page will feature three tabs displayed vertically on the left side:
- Profile: For basic user information (first name, last name, DOB, profile picture)
- Security: For password reset and MFA toggle
- Notifications: For notification preferences (news, alerts, marketing)

## Implementation Strategy

The implementation is broken down into incremental steps that build upon each other, following best practices for Next.js and the existing project architecture.

---

## Step 1: Set Up the Settings Page Route

### Context
We need to create the basic structure for the Settings page route in the Next.js application. This will establish the foundation for all subsequent steps.

### Prompt
```text
Create a basic Settings page route in the Next.js application. 

1. Create a new directory at `src/app/settings`
2. Create a `page.tsx` file inside this directory
3. Implement a basic page component that returns a heading "Settings"
4. Use the existing project styling conventions

The page should be simple but should match the styling of the rest of the application.
```

### Expected Output
A simple Settings page that can be accessed via the URL `/settings` with a heading that matches the style of the dashboard.

---

## Step 2: Update Navigation to Link to Settings Page

### Context
The application already has a Settings icon in the left navigation, but it currently only logs a message to the console when clicked. We need to update it to navigate to the new Settings page.

### Prompt
```text
Update the existing Settings navigation item in the left sidebar to navigate to the Settings page. 

1. Look for the Settings navigation item in `src/components/AppSidebar.tsx`
2. Replace the `console.log('Settings clicked')` with code to navigate to '/settings'
3. Use the same navigation pattern as the existing Dashboard link

Make sure to maintain all existing styles and animations for consistency.
```

### Expected Output
Clicking the Settings icon in the left navigation should now navigate to the Settings page.

---

## Step 3: Add the Tabs Component

### Context
The Settings page requires a vertical tabs component to navigate between different settings sections. We need to create a reusable component for this.

### Prompt
```text
Create a SettingsTabs component that implements vertical tabs for the Settings page.

1. Create a new file at `src/components/SettingsTabs.tsx`
2. Import the Tabs components from `@/components/ui/tabs`
3. Create a component that displays vertical tabs with:
   - Profile tab
   - Security tab
   - Notifications tab
4. Make the tabs display vertically on the left side of the page
5. Default to showing the Profile tab
6. Add empty placeholder content for each tab for now
7. Ensure the component is responsive (vertical tabs on desktop, potentially horizontal on mobile)

Use the shadcn/ui Tabs component and follow the project's styling conventions.
```

### Expected Output
A SettingsTabs component that displays three vertical tabs on the left side of the page, defaulting to the Profile tab.

---

## Step 4: Integrate Tabs into Settings Page

### Context
Now we need to integrate the SettingsTabs component into the Settings page.

### Prompt
```text
Integrate the SettingsTabs component into the Settings page.

1. Import the SettingsTabs component into `src/app/settings/page.tsx`
2. Replace the basic heading with a proper page layout
3. Add a page heading "Settings" above the tabs
4. Add appropriate padding and spacing
5. Ensure the page is responsive

Follow the layout patterns used in other pages of the application.
```

### Expected Output
The Settings page now displays the vertical tabs component with a proper page layout.

---

## Step 5: Create the Profile Tab Component

### Context
Now that we have the tabs structure, we need to implement the Profile tab content with form fields for basic user information.

### Prompt
```text
Create a ProfileTab component for the Settings page with form fields for user profile information.

1. Create a new file at `src/components/settings/ProfileTab.tsx`
2. Import necessary form components (Card, Form, Input, Label, Button) from shadcn/ui
3. Implement a form with the following fields:
   - First name (text input)
   - Last name (text input)
   - Date of birth (date input)
   - Profile picture (file input with image preview)
4. Add Save and Cancel buttons at the bottom
5. Implement form state management using React useState
6. Add basic form validation for required fields
7. Implement styling consistent with the rest of the application
8. For now, the Save button should just show a console.log message with the form data
9. The Cancel button should reset the form to its initial state

Ensure the component is responsive and follows accessibility best practices.
```

### Expected Output
A ProfileTab component with form fields for user profile information, styled consistently with the rest of the application.

---

## Step 6: Create the Security Tab Component

### Context
Next, we need to implement the Security tab content with password reset functionality and MFA toggle.

### Prompt
```text
Create a SecurityTab component for the Settings page with password reset functionality and MFA toggle.

1. Create a new file at `src/components/settings/SecurityTab.tsx`
2. Import necessary components (Card, Form, Input, Label, Button, Switch) from shadcn/ui
3. Implement a password reset form with:
   - Current password field (password input)
   - New password field (password input)
   - Confirm password field (password input)
4. Add a multi-factor authentication section with a toggle switch
5. Add a Save button for the password form
6. Implement form state management using React useState
7. Add validation for password fields (matching, minimum length)
8. Implement styling consistent with the rest of the application
9. For now, the Save button should just show a console.log message with the form data
10. The MFA toggle should update its visual state when clicked

Ensure the component is responsive and follows accessibility best practices.
```

### Expected Output
A SecurityTab component with password reset form and MFA toggle, styled consistently with the rest of the application.

---

## Step 7: Create the Notifications Tab Component

### Context
Finally, we need to implement the Notifications tab content with toggle switches for notification preferences.

### Prompt
```text
Create a NotificationsTab component for the Settings page with toggle switches for notification preferences.

1. Create a new file at `src/components/settings/NotificationsTab.tsx`
2. Import necessary components (Card, Form, Label, Switch) from shadcn/ui
3. Implement three toggle switches for:
   - News notifications
   - Alert notifications
   - Marketing email notifications
4. Add descriptive text for each option
5. Implement state management using React useState
6. Switches should visually update when toggled
7. Implement styling consistent with the rest of the application
8. Add console.log messages when toggles are changed

Ensure the component is responsive and follows accessibility best practices.
```

### Expected Output
A NotificationsTab component with three toggle switches for notification preferences, styled consistently with the rest of the application.

---

## Step 8: Integrate All Tab Components

### Context
Now we need to integrate the three tab components into the SettingsTabs component.

### Prompt
```text
Update the SettingsTabs component to integrate the Profile, Security, and Notifications tab components.

1. Import the three tab components into `src/components/SettingsTabs.tsx`:
   - ProfileTab
   - SecurityTab
   - NotificationsTab
2. Replace the placeholder content in each TabsContent with the corresponding component
3. Ensure proper layout and styling for each tab panel
4. Test tab switching to ensure it works correctly

The tabs should now display the actual content components when selected.
```

### Expected Output
The SettingsTabs component now displays the actual tab content components when each tab is selected.

---

## Step 9: Add Form Validation and Error States

### Context
To improve the user experience, we need to add proper form validation and error states to the form components.

### Prompt
```text
Enhance the Profile and Security tab components with proper form validation and error states.

For the ProfileTab component:
1. Add validation for:
   - First name (required, max length)
   - Last name (required, max length)
   - Date of birth (required, valid date format, reasonable age range)
2. Display error messages below invalid fields
3. Disable the Save button if the form is invalid

For the SecurityTab component:
1. Add validation for:
   - Current password (required)
   - New password (required, min length, complexity requirements)
   - Confirm password (must match new password)
2. Display error messages below invalid fields
3. Disable the Save button if the form is invalid

Use inline error messages that appear beneath the relevant fields when validation fails.
```

### Expected Output
The Profile and Security tab components now have proper form validation with error messages.

---

## Step 10: Add Responsive Styling and Polish

### Context
Now that we have the basic functionality in place, we need to ensure the Settings page looks good and functions well on all device sizes.

### Prompt
```text
Add responsive styling and polish to the Settings page and its components.

1. Ensure the tabs layout works well on all screen sizes:
   - Vertical tabs on desktop/tablet
   - Consider horizontal tabs on mobile
2. Adjust spacing and padding for different screen sizes
3. Ensure form elements are properly sized for touch on mobile
4. Add loading states for buttons (for future API integration)
5. Add hover and focus states for interactive elements
6. Ensure color contrast meets accessibility standards
7. Test and adjust tab focus order for keyboard navigation

Follow the existing responsive patterns used elsewhere in the application.
```

### Expected Output
The Settings page and its components are now fully responsive with polished styling and interactions.

---

## Step 11: Add Success and Error Feedback

### Context
To provide a better user experience, we need to add success and error feedback for form submissions (even though we're not connecting to a backend yet).

### Prompt
```text
Add success and error feedback for form submissions in the Profile and Security tabs.

1. Import or create a Toast or Alert component for notifications
2. Add a simulated successful submission flow:
   - Show loading state when Save is clicked
   - After a short delay, show a success message
   - Reset form if appropriate
3. Add a simulated error submission flow:
   - Add a button or checkbox to force an "error" for testing
   - Show an error message when this occurs
4. Ensure notifications are accessible and dismissible

While we're not connecting to a backend yet, this will prepare the UI for future API integration.
```

### Expected Output
The Profile and Security tab forms now show appropriate success and error feedback when submitted.

---

## Step 12: Save Form State Between Tab Switches

### Context
Currently, form state might be lost when switching between tabs. We need to preserve the state for a better user experience.

### Prompt
```text
Update the Settings page to preserve form state when switching between tabs.

1. Lift state management up from individual tab components to the SettingsTabs component
2. Pass state and update functions down to each tab as props
3. Ensure tab switching doesn't reset form values
4. Add a "Reset All" button at the bottom of the page that resets all forms
5. Consider adding a warning if the user tries to navigate away with unsaved changes

This will provide a more seamless experience when users switch between different settings tabs.
```

### Expected Output
Form state is now preserved when switching between tabs in the Settings page.

---

## Step 13: Final Integration and Testing

### Context
Finally, we need to ensure all components are properly integrated and functioning correctly.

### Prompt
```text
Perform final integration and testing of the Settings page.

1. Ensure all components are properly exported and imported
2. Test navigation to/from the Settings page
3. Test tab switching
4. Test all form validations
5. Test responsive behavior on different screen sizes
6. Test keyboard navigation
7. Address any console errors or warnings
8. Ensure code follows project conventions and best practices
9. Add appropriate comments for complex logic
10. Prepare for future API integration by identifying integration points

Make any necessary adjustments to ensure a cohesive user experience.
```

### Expected Output
A fully integrated and tested Settings page that's ready for future backend integration.

---

## Summary

This implementation plan breaks down the development of the Settings page into 13 logical, incremental steps. Each step builds upon the previous ones, ensuring steady progress without large jumps in complexity.

By following these steps, a code-generation LLM can systematically implement the Settings page while maintaining best practices, proper integration, and a cohesive user experience. The result will be a fully functional UI that's ready to be connected to a backend API in the future.
