/**
 * Notifications Tab Component
 * 
 * Manages user notification preferences including marketing communications,
 * new offers, and service updates. Features toggle switches for each notification type
 * with descriptive labels and save/cancel functionality.
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    marketingCommunications: true,
    newOffers: false,
    serviceUpdates: true,
  })

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    console.log("Saving notification preferences:", notifications)
    // TODO: Implement actual save functionality
  }

  const handleCancel = () => {
    // Reset to default values
    setNotifications({
      marketingCommunications: true,
      newOffers: false,
      serviceUpdates: true,
    })
  }

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label, 
    description 
  }: { 
    checked: boolean
    onChange: () => void
    label: string
    description: string
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked 
            ? 'bg-primary' 
            : 'bg-input'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose what notifications you&apos;d like to receive and how you&apos;d like to receive them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ToggleSwitch
            checked={notifications.marketingCommunications}
            onChange={() => handleNotificationToggle('marketingCommunications')}
            label="Receive Marketing Communications"
            description="Get updates about new features, product announcements, and special promotions."
          />
          
          <div className="border-t border-border" />
          
          <ToggleSwitch
            checked={notifications.newOffers}
            onChange={() => handleNotificationToggle('newOffers')}
            label="Receive New Offers"
            description="Be notified about exclusive deals, discounts, and limited-time offers."
          />
          
          <div className="border-t border-border" />
          
          <ToggleSwitch
            checked={notifications.serviceUpdates}
            onChange={() => handleNotificationToggle('serviceUpdates')}
            label="Receive Service Updates"
            description="Important notifications about service maintenance, security updates, and system changes."
          />

          <div className="pt-4">
            <div className="flex space-x-2">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}