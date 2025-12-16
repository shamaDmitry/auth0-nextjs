"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Button asChild variant={"destructive"} className={className}>
      <Link href="/auth/logout">Log Out</Link>
    </Button>
  );
}
