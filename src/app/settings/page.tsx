import { Metadata } from "next";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

export const metadata: Metadata = {
  title: "Settings - Dashboard",
  description: "User settings and preferences",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SettingsTabs />
    </div>
  );
}
