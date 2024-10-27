"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  return (
    <div className="container max-w-2xl p-4 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground">
            Customize how the app looks and feels
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="theme">Theme</Label>
          <ThemeToggle />
        </div>
        <Separator />
        
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable notifications</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <Separator />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Generation Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure image generation preferences
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="quality">High quality mode</Label>
          <Switch
            id="quality"
            checked={highQuality}
            onCheckedChange={setHighQuality}
          />
        </div>
      </Card>
    </div>
  );
}