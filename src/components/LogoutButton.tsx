"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { signout } from "@/actions/login/actions";

type LogoutButtonProps = ComponentProps<typeof Button>;

export default function LogoutButton({
  className,
  ...props
}: LogoutButtonProps) {
  return (
    <form action={signout}>
      <Button className={cn(className)} {...props}>
        Log Out
      </Button>
    </form>
  );
}
