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
          <div>
            <Button variant="outline" size="sm">
              Upload Picture
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              JPG, GIF or PNG. Max size of 2MB.
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            placeholder="Your name"
            defaultValue="Jane Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            placeholder="Your email"
            defaultValue="jane@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="text-sm font-medium">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
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
