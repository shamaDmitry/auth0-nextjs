"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

type LogoutButtonProps = ComponentProps<typeof Button>;

export default function LogoutButton({
  className,
  ...props
}: LogoutButtonProps) {
  const supabase = createClient();

  return (
    <Button
      className={cn(className)}
      onClick={() => supabase.auth.signOut()}
      {...props}
    >
      Log Out
    </Button>
  );
}
