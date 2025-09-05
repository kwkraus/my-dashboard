import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function NotificationsTab() {
  const [emailNotifications, setEmailNotifications] = useState({
    accountActivity: true,
    newFeatures: true,
    marketingEmails: false
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    newMessages: true,
    taskReminders: true,
    systemAlerts: true
  });

  const toggleEmailSetting = (setting: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [setting]: !emailNotifications[setting]
    });
  };

  const togglePushSetting = (setting: keyof typeof pushNotifications) => {
    setPushNotifications({
      ...pushNotifications,
      [setting]: !pushNotifications[setting]
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Manage the emails you receive from us
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <NotificationItem 
              title="Account activity"
              description="Get notified about important account activities like password changes"
              checked={emailNotifications.accountActivity}
              onChange={() => toggleEmailSetting('accountActivity')}
            />
            
            <NotificationItem 
              title="New features"
              description="Be the first to know about new features and updates"
              checked={emailNotifications.newFeatures}
              onChange={() => toggleEmailSetting('newFeatures')}
            />
            
            <NotificationItem 
              title="Marketing emails"
              description="Receive emails about new products, offers, and promotions"
              checked={emailNotifications.marketingEmails}
              onChange={() => toggleEmailSetting('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Manage your in-app notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <NotificationItem 
              title="New messages"
              description="Get notified when you receive a new message"
              checked={pushNotifications.newMessages}
              onChange={() => togglePushSetting('newMessages')}
            />
            
            <NotificationItem 
              title="Task reminders"
              description="Receive reminders about upcoming and overdue tasks"
              checked={pushNotifications.taskReminders}
              onChange={() => togglePushSetting('taskReminders')}
            />
            
            <NotificationItem 
              title="System alerts"
              description="Get important system notifications about maintenance and updates"
              checked={pushNotifications.systemAlerts}
              onChange={() => togglePushSetting('systemAlerts')}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button>Save preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for notification items
function NotificationItem({ 
  title, 
  description, 
  checked, 
  onChange 
}: { 
  title: string; 
  description: string; 
  checked: boolean; 
  onChange: () => void;
}) {
  return (
    <div className="flex items-start space-x-4">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className={`
          h-6 w-11 rounded-full transition-colors
          ${checked ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
          after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5
          after:rounded-full after:bg-white after:transition-all
          ${checked ? 'after:translate-x-full' : ''}
        `}></div>
      </label>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
