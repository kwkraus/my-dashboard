"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar 
        mobileOpen={mobileMenuOpen}
        onMobileToggle={handleMobileMenuToggle}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader onMobileMenuClick={handleMobileMenuToggle} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
