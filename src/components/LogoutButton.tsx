"use client";

import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <a href="/auth/logout" className={cn(className)}>
      Log Out
    </a>
  );
}
