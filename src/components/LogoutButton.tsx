"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LogoutButton({ className }: { className?: string }) {
  const supabase = createClient();

  return (
    <Button className={cn(className)} onClick={() => supabase.auth.signOut()}>
      Log Out
    </Button>
  );
}
