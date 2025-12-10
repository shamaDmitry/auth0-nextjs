"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LogoutButton() {
  return (
    <Button asChild variant={"destructive"}>
      <Link href="/auth/logout">Log Out</Link>
    </Button>
  );
}
