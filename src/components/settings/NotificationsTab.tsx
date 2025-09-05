"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    news: true,
    alerts: true,
    marketing: false,
  });

  // Handle toggle change
  const handleToggleChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    
    console.log(`${key} notifications ${value ? 'enabled' : 'disabled'}`);
    // Here you would normally send the data to an API
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* News Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">News</h3>
              <p className="text-sm text-muted-foreground">
                Receive notifications about product updates and new features.
              </p>
            </div>
            <Switch
              checked={notifications.news}
              onCheckedChange={(checked) => handleToggleChange("news", checked)}
              aria-label="Toggle news notifications"
            />
          </div>
          
          <div className="border-t border-border" />
          
          {/* Alerts Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Receive alerts about important system events and security notices.
              </p>
            </div>
            <Switch
              checked={notifications.alerts}
              onCheckedChange={(checked) => handleToggleChange("alerts", checked)}
              aria-label="Toggle alert notifications"
            />
          </div>
          
          <div className="border-t border-border" />
          
          {/* Marketing Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Marketing emails</h3>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, offers, and promotions.
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleToggleChange("marketing", checked)}
              aria-label="Toggle marketing notifications"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
