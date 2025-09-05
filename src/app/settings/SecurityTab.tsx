import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SecurityTab() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by enabling two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Protect your account with an additional verification step.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className="peer sr-only"
                />
                <div className={`
                  h-6 w-11 rounded-full transition-colors
                  ${twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
                  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                  after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5
                  after:rounded-full after:bg-white after:transition-all
                  ${twoFactorEnabled ? 'after:translate-x-full' : ''}
                `}></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
