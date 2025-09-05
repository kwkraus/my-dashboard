import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AdvancedTab() {
  const [dataExportLoading, setDataExportLoading] = useState(false);
  const [accountDeletionConfirm, setAccountDeletionConfirm] = useState(false);
  
  const handleExportData = () => {
    setDataExportLoading(true);
    // Simulate export process
    setTimeout(() => {
      setDataExportLoading(false);
      // In a real app, this would trigger a download
      alert("Data export complete. Download started.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export your data or purge unused data to free up space
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Export All Data</h3>
            <p className="text-sm text-muted-foreground">
              Download a copy of all your data in JSON format. This includes dashboard settings, 
              user preferences, and stored metrics.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleExportData} 
            disabled={dataExportLoading}
          >
            {dataExportLoading ? "Exporting..." : "Export Data"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage your API keys and access tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Primary API Key</h3>
                <p className="text-sm text-muted-foreground">
                  Last used: 2 days ago
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-mono bg-muted px-2 py-1 rounded text-sm">
                  ••••••••••••{Math.random().toString(36).substring(2, 6)}
                </div>
                <Button variant="outline" size="sm">
                  Reveal
                </Button>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline">Create New API Key</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/20">
        <CardHeader className="text-destructive">
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription className="text-destructive/80">
            Destructive actions that cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            <div className="pt-2">
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-destructive focus:ring-destructive"
                  checked={accountDeletionConfirm}
                  onChange={() => setAccountDeletionConfirm(!accountDeletionConfirm)}
                />
                <span>I understand this action is permanent and cannot be recovered</span>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white" 
            disabled={!accountDeletionConfirm}
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
          <CardDescription>
            Configure advanced system settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="cacheLimit" className="text-sm font-medium">
                Cache Storage Limit (MB)
              </label>
              <input
                id="cacheLimit"
                type="number"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                defaultValue="500"
                min="100"
                max="2000"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="refreshInterval" className="text-sm font-medium">
                Data Refresh Interval (seconds)
              </label>
              <input
                id="refreshInterval"
                type="number"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                defaultValue="30"
                min="10"
                max="3600"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="logLevel" className="text-sm font-medium">
                Log Level
              </label>
              <select
                id="logLevel"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                defaultValue="info"
              >
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
                <option value="trace">Trace</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">
                Default Timezone
              </label>
              <select
                id="timezone"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                defaultValue="utc"
              >
                <option value="utc">UTC</option>
                <option value="local">Local Browser Time</option>
                <option value="est">Eastern Standard Time</option>
                <option value="pst">Pacific Standard Time</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
